import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase"
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Register() {

  const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: ""
  });

  const [error, setError] = useState("Internal Error!");
  

  const navigate = useNavigate();

  const handleChange = (e)=>{
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const signUp = async ()=>{
    const newUser = await createUserWithEmailAndPassword(auth,formData.email,formData.password);
    const usersCollection = doc(db,"users",newUser.user.uid);
    await setDoc(usersCollection,{
      name: formData.name,
      email: formData.email
    });

  } 

  const handleRegister = ()=>{
    try{
      signUp();
      navigate("/");
    }catch(error){
      console.log("error: ",error.message)
    }
  }

  return (
    <div className='grid place-content-center mb-20'>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Register</legend>

        <label className="label">Name</label>
        <input name="name" onChange={e=>handleChange(e)} value={formData.name} type="name" className="input" placeholder="Name" />
        
        <label className="label">Email</label>
        <input name="email" onChange={e=>handleChange(e)} value={formData.email} type="email" className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input name="password" onChange={e=>handleChange(e)} value={formData.password} type="password" className="input" placeholder="Password" />

        <button onClick={handleRegister} className="btn btn-neutral mt-4">Register</button>
      </fieldset>
    </div>
  )
}

export default Register