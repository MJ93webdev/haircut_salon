import React from 'react'

function ServiceCard({icon, duration, price, title}) {
  return (
    <div className="card card-side bg-base-100 shadow-sm p-4 w-fit hover:cursor-pointer">
      <figure>
        <img src={icon} alt="icon" className='h-[55px] w-[55px]'/>
      </figure> 
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>Trajanje: <span className='font-bold'>{duration} min</span> Cena: <span className='bg-green-700 p-1 rounded-md'>{price} rsd</span></p>
      </div>
    </div>
  )
}

export default ServiceCard