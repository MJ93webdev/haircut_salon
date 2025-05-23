import { IoMdSettings } from "react-icons/io";
import { FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className='grid justify-center content-start'>
      <div className='text-center font-bold grid grid-cols-2 grid-rows-2 gap-10 p-10 border border-white rounded-2xl mt-24'>
        <div className="grid place-content-center"><Link className="" to={"/admin_dashboard/appointments"}><FaUsers className="mx-auto" color="#fff" size={75} />Appointments</Link></div>
        <div className="grid place-content-center"><Link className="" to={"/admin_dashboard/settings"}><IoMdSettings className="mx-auto" color="#fff" size={75} />Settings</Link></div>
    
      </div>
    </div>
  )
}

export default AdminDashboard