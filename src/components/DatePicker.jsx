import { useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { getDocs, collection, query, where, Timestamp, doc, addDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


function DatePicker({appDate,setAppDate}) {
  const [pickerVisible, setPickerVisible] = useState(false);

  const dayPickerRef = useRef(null)

  const handleDateSelect = (e)=>{
    setDate(e)
    createAppTime(e);
    setPickerVisible(false)
  }

  return (
    <>
      <button onClick={()=>setPickerVisible(true)} popoverTarget="rdp-popover" className="input input-border hover:cursor-pointer " style={{ anchorName: "--rdp" }}>
        <IoCalendarNumberOutline size={25} />{date ? date.toLocaleDateString() : "Pick a date"}
      </button>
      {pickerVisible && <div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" }}>
        <DayPicker ref={dayPickerRef} className="react-day-picker " mode="single" selected={date} onSelect={ e=> handleDateSelect(e)} />
      </div>}

      <h4 className="text-[#1d232a] font-bold my-6">{chosenAppointment ? "Vaš Termin" : "Slobodni termini"}</h4>
          <div className='flex flex-wrap gap-2 my-8'>
            {
              chosenAppointment ?
              chosenAppointment.map(appointment => (
                  <div key={uuidv4()} className='hover:shadow shadow-[#1d232a] cursor-pointer w-max p-4 border rounded-xl text-black'>
                  from: {appointment.fromTime.getHours()} : {appointment.fromTime.getMinutes()}
                   to: {appointment.toTime.getHours()} : {appointment.toTime.getMinutes()}
                  </div>
              ))
              :
              freeAppointments.map(appointment => {

                return(
                <div onClick={(e)=>handleSelectTime(appointment)} key={uuidv4()} className='hover:shadow shadow-[#1d232a] cursor-pointer w-max p-4 border rounded-xl text-black'>
                  from: {appointment.fromTime.getHours()} : {appointment.fromTime.getMinutes()}
                   to: {appointment.toTime.getHours()} : {appointment.toTime.getMinutes()}
                  </div>
              )
              })
            }
        </div>
            {chosenAppointment && <div className="flex gap-2">
               <button onClick={()=>setChosenAppointment(null)} className="cursor-pointer bg-red-400 p-2 px-4 rounded-md w-full font-semibold">cancel</button>  
               <button onClick={()=>handleBtnNext(chosenAppointment)} className="cursor-pointer bg-green-400 p-2 px-4 rounded-md w-full font-semibold">next</button>  
            </div>}
    </>
  );
}

export default DatePicker