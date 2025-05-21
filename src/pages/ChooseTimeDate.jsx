import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";
import { useEffect, useState } from "react";
import { createAppTime } from "../utils/functions";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function ChooseTimeDate() {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [datePickerVisible,setDatePickerVisible] = useState(true);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [freeAppointments, setFreeAppointments] = useState([]);
  const [settings, setSettings] = useState({
    shiftStart: 9,
    shiftEnd: 17,
    freeTime: 5,
    maxAppointments: 4
  })

  const location = useLocation();
  const service = location.state.service || {};

useEffect(()=>{
  
  const getSettings = async ()=>{
    try{
      const settingsCollection = collection(db,"settings");
      const settingsData = await getDocs(settingsCollection);
      setSettings(settingsData.docs[0].data());
    }catch(error){
       console.log("ERROR!");
       console.log("code: ", error.code);
       console.log("message: ",error.message);
   }
  }
  getSettings();
  
})

  const shiftStart = settings.shiftStart * 60;
  const shiftEnd = settings.shiftEnd * 60;
  const serviceDuration = service.duration;
  //free time between each appointment
  const freeTime = settings.freeTime;
  const maxAppointments = settings.maxAppointments;

  const navigate = useNavigate();


  const handleDateSelect = async (date)=>{
    setDate(date)
    try{
      const data = await createAppTime(date,shiftStart,shiftEnd,serviceDuration,freeTime,maxAppointments);
      setFreeAppointments(data)
    }catch(error){
      console.log(error)
    }
    setDatePickerVisible(false)
    setTime(null);
    setTimePickerVisible(true);
  }

  const handleBtnCancel = ()=>{
    setDate(null);
    setTime(null);
    setFreeAppointments([])
  }

  const handleBtnNext = ()=>{
    console.log(time)
    const appData = {
      fromTimeDate: time.fromTime,
      toTimeDate: time.toTime,
      service: service
    }
    navigate("/create-appointment/checkout",
      {state: {data: appData}});
      // {state: {date: date , time: time, service: service}});
  }

  return(
    <div className="bg-white rounded-xl p-4 m-4 grid place-content-center content-start">
      <DatePicker handleDateSelect={handleDateSelect}
                  date={date}
                  datePickerVisible={datePickerVisible}
                  setDatePickerVisible={setDatePickerVisible}
        />
      {timePickerVisible && <TimePicker date={date}
                  appDuration={service.duration}
                  freeAppointments={freeAppointments} 
                  setTime={setTime}
                  time={time}
                  />
}
      {time && 
        <div className="flex gap-4 justify-center mt-8">
           <button onClick={handleBtnCancel} className="btn btn-error">cancel</button>  
           <button onClick={()=>handleBtnNext(date)} className="btn btn-accent">next</button>  
        </div>
      }
    </div>
  );
}