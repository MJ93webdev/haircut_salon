import React from 'react'

function Popover({userData,setShowPopover}) {
  return (
        <div className="absolute z-50 inset-[15%_25%_auto_25%] card bg-base-100 w-96 shadow-sm">
            {console.log(userData)}
        <div className="card-body">
            <h2 className="card-title lg:text-xl">{userData.userName}</h2>
            <p className='lg:text-lg'>Telefon: {userData.userPhone}</p>
            <p className='lg:text-lg'>Usluga: {userData.serviceTitle}</p>
            <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={()=>setShowPopover(false)}>Close</button>
            </div>
        </div>
        </div>
  )
}

export default Popover