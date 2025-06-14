import { useContext, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase"
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ErrorAlert from "../components/ErrorAlert"

function Login() {

const { currentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
      email: "",
      password: ""
  });

  const [error, setError] = useState(null);
  

  const navigate = useNavigate();

  const handleChange = (e)=>{
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleLogin = async ()=>{
    try{
      await signInWithEmailAndPassword(auth,formData.email,formData.password);
      navigate("/");
    }catch(error){
      console.log("ERROR!")
      console.log("code: ",error.message)
      console.log("message : ",error.message)
      setError(error);
    }
  }

  return (

    <div className='grid place-content-center mb-20'>
    
    {error && <ErrorAlert error={error} /> }
    
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input name="email" onChange={e=>handleChange(e)} value={formData.email} type="email" className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input name="password" onChange={e=>handleChange(e)} value={formData.password} type="password" className="input" placeholder="Password" />

        <button onClick={handleLogin} className="btn btn-neutral mt-4">Login</button>
      </fieldset>
  </div>
  )
}

export default Login