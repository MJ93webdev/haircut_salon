import { useEffect } from "react"

function TimePicker({setTime,time,freeAppointments}) {


  useEffect(()=>console.log("fap: ",freeAppointments),[])

  const handleSelectTime = (selectedTime)=> {
    const t = freeAppointments.find(app =>
  (makeTime(app.fromTime,app.toTime) === selectedTime))
    setTime(t)
  }

const makeTime = (fromTime,toTime)=>{
  const key = fromTime.getHours().toString() +
  fromTime.getMinutes().toString() + 
  toTime.getHours().toString() +
  toTime.getMinutes().toString()

  return(key);
}

return(
  freeAppointments ? <div>
    <h4 className="text-[#1d232a] font-bold my-6">Slobodni termini</h4>
    <select className="select" defaultValue={"select time"} onChange={(e)=>handleSelectTime(e.target.value)}>
      {
        freeAppointments.map(app=>(
          <option value={makeTime(app.fromTime, app.toTime)}
          key={makeTime(app.fromTime,app.toTime)}
          >{app.fromTime.getHours()}:{app.fromTime.getMinutes()}-{app.toTime.getHours()}:{app.toTime.getMinutes()}</option>
        ))
      }
    </select>
  </div>
  : <h4 className="text-[#1d232a] font-bold my-6">No free appointments...</h4>
)

}

export default TimePicker