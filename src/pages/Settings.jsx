import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../firebase'

function Settings() {

const [settings, setSettings] = useState({
    shiftStart: 9,
    shiftEnd: 17,
    freeTime: 5,
    maxAppointments: 4
});

const handleSubmit = async ()=>{

    const settingsCollection = collection(db,"settings");

    try{
        await addDoc(settingsCollection,{...settings});

    }catch(error){
        console.log("ERROR!");
        console.log("code: ", error.code);
        console.log("message: ",error.message);
    }
}

  return (
    <div className=''>
        <div className='mt-24 mx-auto grid place-content-center p-4 w-[85%] max-w-[1180px]'>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend">Postavke</legend>
            
              <label className="label">Početak Smene</label>
              <input value={Number(settings.shiftStart)} onChange={(e)=>setSettings((prev)=>({...prev,shiftStart: Number(e.target.value)}))} type="text" className="input" placeholder="9" />
            
              <label className="label">Kraj Smene</label>
              <input value={Number(settings.shiftEnd)} onChange={(e)=>setSettings((prev)=>({...prev,shiftEnd: e.target.value}))} type="text" className="input" placeholder="17" />
              
              <label className="label">Maksimum Termina</label>
              <input value={Number(settings.maxAppointments)} onChange={(e)=>setSettings((prev)=>({...prev,maxAppointments: e.target.value}))} type="text" className="input" placeholder="10" />
              
              <label className="label">Slobodno Vreme</label>
              <input value={Number(settings.freeTime)} onChange={(e)=>setSettings((prev)=>({...prev,freeTime: e.target.value}))} type="text" className="input" placeholder="5" />
            
              <button onClick={handleSubmit} className="btn btn-neutral mt-4">Sačuvaj Promene</button>
            </fieldset>
        </div>
    </div>
  )
}

export default Settings