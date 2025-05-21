import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/images/mirjana.png"
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'

function Navbar() {

const [user, setUser] = useState(null);
const [dropdownVisible,setDropdownVisible] = useState(false);

const dropdownRef = useRef();

useEffect(()=>{
  const unsubscribe = ()=>{
    onAuthStateChanged(auth,user =>{
      if(user){
        setUser(user);
        console.log(user)
      }else{
        console.log("no user logged in...")
      }
    })
  }

  return ()=> unsubscribe();

},[user])

const logout = async ()=>{
  try{
    await signOut(auth);
    setUser(null);
  }catch(error){
    console.log("ERROR!")
    console.log("code: ", error.code)
    console.log("message: ",error.message)
  }
}

  return (
<div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
 <div onClick={()=>setDropdownVisible(prev => !prev)} className="dropdown ml-2 ">
      <Link  to={"/"} tabIndex={0}>
      
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </Link>
{ dropdownVisible &&  <ul 
        ref={dropdownRef}
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 transition duration-300 delay-150 ease-in-out mt-3 w-52 p-2 shadow">
        {!user && <li><Link to={"/login"}>Login</Link></li>}
        {!user && <li><Link to={"/register"}>Register</Link></li>}
        {user && <li onClick={logout}><Link to={"/"}>Logout</Link></li>}
        <li><Link to={"/create-appointment"}>Zakaži Termin</Link></li>
      </ul>}
    </div>
    <Link to={"/"}>
      <img src={logo} alt='Mirjana' className='w-[75px] mx-8' />
    </Link>
  </div>

  {user && user.email === "jovanovicmarko15mj@gmail.com" && <div className="navbar-end">
    <Link to={"/admin_dashboard"} className="btn">Admin Dashboard</Link>
  </div>}
</div>
  )
}

export default Navbar