import React from 'react'
import { useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';


function Checkout() {

const location = useLocation();
const chosenAppointment = location.state.chosenAppointment || {};
const chosenService = location.state.service || {};

  return (
    <div className='text-center'>
        <h2 className='mt-10 font-bold text-2xl'>Checkout</h2>
        <div className=''>
            {chosenAppointment.map(appointment => (
                <div key={uuidv4()} className='mx-auto'>
                    from:{appointment.fromTime.getHours()}:{appointment.fromTime.getMinutes()}
                    to:{appointment.toTime.getHours()}:{appointment.fromTime.getMinutes()}
                    service: {chosenService.title}
                </div>
            ))}
        </div>
    </div>
  )
}

export default Checkout