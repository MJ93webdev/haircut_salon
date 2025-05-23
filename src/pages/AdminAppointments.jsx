import { collection, getDocs, query, Timestamp, where } from 'firebase/firestore';
import AdminAppointmentsList from '../components/AdminAppointmentsList'
import AdminCalendar from '../components/AdminCalendar'
import { useState } from 'react';
import { db } from '../firebase';
import Popover from '../components/Popover';

function AdminAppointments() {

const [showPopover,setShowPopover] = useState(false)
const [appData, setAppData] = useState([]);
const [userData,setUserData] = useState(null);

const handleDateChange=(e)=>{
    getAppData(e);
}

const getAppData = async (e)=>{
    // we take the chosen date, set its time to 00:00:00 
    // and we find any appointments that are between 00:00 - 23:00
    // of that date and return it
    const date = new Date(e);
    date.setHours(0);
    const tsDateStart = Timestamp.fromDate(date);
    date.setHours(23,59);
    const tsDateEnd = Timestamp.fromDate(date);

    const appointmentsCollection = collection(db,"appointments");
    const appQuery = query(appointmentsCollection,where("fromTimeDate",">=",tsDateStart),where("fromTimeDate","<=",tsDateEnd))
    try{
        const fetchData = await getDocs(appQuery);
        let data = [] 
        fetchData.docs.forEach(app => {
            data.push({...app.data(),id: app.id,})
        });
        setAppData(data);
        console.log(appData)
    }catch(error){
        console.log("ERROR!");
        console.log("code: ", error.code);
        console.log("message: ", error.message);
    }
}


  return (
    <div className="bg-base-300">
        {
        showPopover && <Popover userData={userData} setShowPopover={setShowPopover} />} 
        {/* {showPopover && <div className='absolute z-10 bg-base-200 inset-0'></div>
        } */}
        <AdminCalendar handleDateChange = {handleDateChange} />
        <AdminAppointmentsList setUserData={setUserData} appData={appData} setShowPopover={setShowPopover}  />
    </div>
  )
}

export default AdminAppointments