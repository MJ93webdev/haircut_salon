import { useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { getDocs, collection, query, where, Timestamp, doc, addDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useLocation, useNavigate } from "react-router-dom";


function DatePicker({date, handleDateSelect, datePickerVisible, setDatePickerVisible}) {

  const dayPickerRef = useRef(null)



  return (
    <div className="min-w-[300px] mx-auto">
      <h4 className="text-[#1d232a] font-bold ml-2 mb-2">Datum i vreme</h4>

      <button onClick={()=>setDatePickerVisible(true)} popoverTarget="rdp-popover" className="input input-border hover:cursor-pointer " style={{ anchorName: "--rdp" }}>
        <IoCalendarNumberOutline size={25} />{date ? date.toLocaleDateString() : "Pick a date"}
      </button>
      {datePickerVisible && <div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" }}>
        <DayPicker ref={dayPickerRef} className="react-day-picker " mode="single" selected={date} onSelect={ e=> handleDateSelect(e)} />
      </div>}



    </div>
  );
}

export default DatePicker