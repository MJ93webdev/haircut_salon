import {BrowserRouter, Routes, Route} from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import CreateAppointment from "./pages/CreateAppointment"
import ChooseDate from "./pages/ChooseTimeDate"
import Checkout from "./pages/Checkout"
import AppointmentFinished from "./pages/AppointmentFinished"
import AdminDashboard from "./pages/AdminDashboard"
import Settings from "./pages/Settings"
import AdminAppointments from "./pages/AdminAppointments"

function App() {
  return (

  <AuthProvider>
    <BrowserRouter>
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-[#1d232a]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-appointment" element={<CreateAppointment />} />
        <Route path="/create-appointment/choose-time-date" element={<ChooseDate />} />
        <Route path="/create-appointment/checkout" element={<Checkout />} />
        <Route path="/create-appointment/finished" element={<AppointmentFinished />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/admin_dashboard/settings" element={<Settings />} />
        <Route path="/admin_dashboard/appointments" element={<AdminAppointments />} />
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  </AuthProvider>
  )
}

export default App