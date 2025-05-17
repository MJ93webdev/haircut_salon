import CardSide from "../components/ServiceCard"
import { useEffect, useState } from "react"
import { services } from "../data/services"
import { Link } from "react-router-dom";

function CreateAppointment() {

  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(()=>{
    setFilteredServices(services);
  },[])



  const handleFilter = (e)=>{
    let filtered = services.filter(service => service.group.toLowerCase().includes(e.toLowerCase()))
    setFilteredServices(filtered);
  }


  return (
    <div>
        <form className="flex flex-wrap gap-2 m-2">
            <input onClick={(e)=>handleFilter(e.target.ariaLabel)} name="filter" defaultChecked className="btn" type="radio" aria-label="Sve"/>
            <input onClick={(e)=>handleFilter(e.target.ariaLabel)} name="filter" className="btn" type="radio" aria-label="Muški frizer"/>
            <input onClick={(e)=>handleFilter(e.target.ariaLabel)} name="filter" className="btn" type="radio" aria-label="Žene (Šišanje na suvo)"/>
            <input onClick={(e)=>handleFilter(e.target.ariaLabel)} name="filter" className="btn" type="radio" aria-label="Žene (Šišanje + Feniranje)"/>
        </form>

        <div className="grid gap-2">
          {
            filteredServices.map(service => {
            return (<Link key={service.id} state={{service: service}} to="/create-appointment/choose-date">
            <CardSide 
               icon={service.icon} duration={service.duration}
                price={service.price} title={service.title} />
              </Link>)
            })
          }
        </div>
    </div>
  )
}

export default CreateAppointment