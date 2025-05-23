import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

function Checkout() {

const navigate = useNavigate();
const location = useLocation();
const data = location.state.data || {};

const [user, setUser] = useState(null);



useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth, user=>{
    if(user){
      const getUserData = async ()=>{
      const userRef = doc(db,"users",user.uid);
      const data = await getDoc(userRef);
      setUser({id:data.id ,...data.data()});
    }
      getUserData();
    }else{
      console.log("no user signed in!")
    }
  });
  return() => unsubscribe()
},[])

const handleSubmit = async ()=>{
  const appCollection = collection(db,"appointments");
  await addDoc(appCollection,{
    userId: user.id,
    userName: user.name,
    userPhone: user.phone,
    userEmail: user.email,
    serviceTitle: data.service.title,
    fromTimeDate: data.fromTimeDate,
    toTimeDate: data.toTimeDate,
    completed: false
  })
  navigate("/create-appointment/finished");
}

const handleBack = ()=>{
  navigate("/create-appointment");
}


  return (
    <div className='text-center'>
      {console.log(data)}
        <h2 className='mt-10 font-bold text-2xl'>Provera</h2>
        <div className=''>
                <div key={uuidv4()} className='grid mx-auto'>
                  <p>Ime: {user ? user.name : "N/A"}</p>
                      <p>Usluga: {data.service.title}</p>
                      <p>Cena: {data.service.price} rsd</p>
                    <div>
                      <p>Početak:{data.fromTimeDate.getHours()}:{data.fromTimeDate.getMinutes()}</p>
                      <p>Kraj:{data.toTimeDate.getHours()}:{data.toTimeDate.getMinutes()}</p>
                    </div>
                </div>
          <div className='my-6 flex gap-4 justify-center'>
            <button onClick={handleBack} className='btn btn-error'>Nazad</button>
            <button onClick={handleSubmit} className='btn btn-info'>Zakaži</button>
          </div>
        </div>
    </div>
  )
}

export default Checkout