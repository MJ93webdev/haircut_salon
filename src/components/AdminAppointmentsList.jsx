import { useEffect, useState } from "react";

function AdminAppointmentsList({appData, setShowPopover, setUserData}) {


useEffect(()=>{
    const isNextAppointment = ()=>{
        const currentTime = new Date().getTime();
        console.log(currentTime)
    }
    isNextAppointment()
},[appData])

const handleShowUser = (data)=>{
    console.log("hello there!!",data)
    setShowPopover(prev=>!prev);
    setUserData(data)
}

  return (
    <div className="bg-base-100 mt-10 w-[85%] max-w-[1024px] min-h-[300px] mx-auto rounded-xl">

    {appData.length > 0 ? <div className="overflow-x-auto">
    <table className="table table-zebra">
        {/* head */}
        <thead>
        <tr>
            <th>Ime</th>
            <th>Početak</th>
            <th>Kraj</th>
            <th>Frizura</th>
        </tr>
        </thead>
        <tbody>
            {appData.map(app =>(
            <tr key={app.id}>
                <th>
                    <button onClick={()=>handleShowUser(app)} className="hover:cursor-pointer">{app.userName || "N/A"}</button>
                </th>
                <td>{app.fromTimeDate.toDate().getHours()}:{app.fromTimeDate.toDate().getMinutes()}</td>
                <td>{app.toTimeDate.toDate().getHours()}:{app.toTimeDate.toDate().getMinutes()}</td>
                <td>{app.serviceTitle}</td>
            </tr>
            ))

            }
        </tbody>
    </table>
    </div>
    : <div className="grid place-content-center pt-20 font-semibold text-xl">Nema Termina ...</div>
}

    </div>
  )
}

export default AdminAppointmentsList