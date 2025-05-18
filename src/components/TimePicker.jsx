import { collection, getDocs, query, Timestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

function TimePicker({setTime,time,freeAppointments}) {

  const handleSelectTime = (time)=> {
    setTime(freeAppointments.filter(app => app === time))
  }


  return (
    <div>
          <h4 className="text-[#1d232a] font-bold my-6">{time ? "Vaš Termin" : "Slobodni termini"}</h4>
          <div className='flex flex-wrap gap-2 my-8'>
            {
              time ?
              time.map(appointment => (
                  <div key={uuidv4()} className='hover:shadow shadow-[#1d232a] cursor-pointer w-max p-4 border rounded-xl text-black'>
                  from: {appointment.fromTime.getHours()} : {appointment.fromTime.getMinutes()}
                   to: {appointment.toTime.getHours()} : {appointment.toTime.getMinutes()}
                  </div>
              ))
              :
              freeAppointments && freeAppointments.map(appointment => {
                return(
                <div onClick={(e)=>handleSelectTime(appointment)} key={uuidv4()} className='hover:shadow shadow-[#1d232a] cursor-pointer w-max p-4 border rounded-xl text-black'>
                  from: {appointment.fromTime.getHours()} : {appointment.fromTime.getMinutes()}
                   to: {appointment.toTime.getHours()} : {appointment.toTime.getMinutes()}
                  </div>
              )
              })
            }
        </div>
    </div>
  )
}

export default TimePicker