import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/icons/logo.png"
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AnimatePresence, motion } from 'motion/react'
import { AuthContext } from '../context/AuthContext'

function Navbar() {

const { currentUser } = useContext(AuthContext);

const [user, setUser] = useState(null);
const [dropdownVisible,setDropdownVisible] = useState(false);

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
<div className="navbar bg-base-100 shadow-sm max-w-[90%] mx-auto relative">
  <div className="navbar-start">
 <div onClick={()=>setDropdownVisible(prev => !prev)} className="ml-2">
      <Link  to={"/"} tabIndex={0}>
       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </Link>
      <AnimatePresence initial={false}>
      { dropdownVisible &&  <motion.ul 
            initial={{ opacity: 0, left: -150 }}
            animate={{ opacity: 1, left: 0 }}
            exit={{ opacity: 0, top: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        tabIndex={0}
        className="grid gap-4 absolute top-full bg-base-100 rounded-box z-50 mt-3 w-52 p-6 shadow">
        {!currentUser && <li><Link className='hover:text-accent' to={"/login"}>Login</Link></li>}
        {!currentUser && <li><Link className='hover:text-accent' to={"/register"}>Register</Link></li>}
        <li><Link to={"/create-appointment"} className='hover:text-accent'>Zakaži Termin</Link></li>
        {currentUser && <li onClick={logout}><Link to={"/"} className='hover:text-accent'>Logout</Link></li>}
      </motion.ul>}
      </AnimatePresence>
    </div>
    <Link to={"/"}>
      <img src={logo} alt='Mirjana' className='w-[75px] mx-8' />
    </Link>
  </div>

  {currentUser && currentUser.email === "jovanovicmarko15mj@gmail.com" && <div className="navbar-end">
    <Link to={"/admin_dashboard"} className="btn">Admin Dashboard</Link>
  </div>}
</div>
  )
}

export default Navbar