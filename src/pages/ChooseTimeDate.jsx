import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";
import { useState } from "react";
import { createAppTime } from "../utils/functions";

export default function ChooseTimeDate() {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [datePickerVisible,setDatePickerVisible] = useState(true);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [freeAppointments, setFreeAppointments] = useState([]);

  const location = useLocation();
  const appDuration = location.state.service.duration || {};

  const navigate = useNavigate();


  const handleDateSelect = async (date)=>{
    setDate(date)
    try{
      const data = await createAppTime(date,9*60,17*60,15,5);
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
  }

  const handleBtnNext = (chosenAppointment)=>{
    navigate("/create-appointment/checkout",{state: {chosenAppointment: chosenAppointment}});
  }

  return(
    <div className="bg-white rounded-xl p-4 m-4 grid place-content-center content-start">
      <DatePicker handleDateSelect={handleDateSelect}
                  date={date}
                  datePickerVisible={datePickerVisible}
                  setDatePickerVisible={setDatePickerVisible}
        />
      {timePickerVisible && <TimePicker date={date}
                  appDuration={appDuration}
                  freeAppointments={freeAppointments} 
                  setTime={setTime}
                  time={time}
                  />
}
      {time && 
        <div className="flex gap-2">
           <button onClick={handleBtnCancel} className="cursor-pointer bg-red-400 p-2 px-4 rounded-md w-full font-semibold">cancel</button>  
           <button onClick={()=>handleBtnNext(date)} className="cursor-pointer bg-green-400 p-2 px-4 rounded-md w-full font-semibold">next</button>  
        </div>
      }
    </div>
  );
}