import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


function AppointmentFinished() {

const navigate = useNavigate()
const [seconds, setSeconds] = useState(5); // countdown from 5th sec.

useEffect(()=>{

    if(seconds === 0){
        navigate("/");
        return;
    }

    const interval = setInterval(()=>{
        setSeconds(prev => prev - 1);
    }, 1000);
    return ()=> clearInterval(interval); // cleanup on unmount
},[seconds, navigate])


  return (
    <div className="text-center mt-24">
        <h2 className="text-xl md:text-2xl lg:text-3xl mb-2">AppointmentFinished!</h2>
        <p className="md:text-xl lg:text-2xl">Redirect in {seconds}s</p>
    </div>
  )
}

export default AppointmentFinished