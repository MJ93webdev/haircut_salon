import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";
import { useState } from "react";

export default function ChooseTimeDate() {
  const [date, setDate] = useState(null);


  const location = useLocation();
  const navigate = useNavigate();

  // duration of the appointment selected. ( some haircuts take more time than others )

  
  const handleBtnNext = (chosenAppointment)=>{
    navigate("/create-appointment/checkout",{state: {chosenAppointment: chosenAppointment}});
  }



  return(
    <div className="bg-white rounded-xl p-4 m-4">
      <h4 className="text-[#1d232a] font-bold">Datum i vreme</h4>
      <DatePicker appDate={date} setAppDate={setDate} />
      <TimePicker />
    </div>
  );
}