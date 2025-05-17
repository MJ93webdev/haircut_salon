import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
<div
  className="hero h-[50vh] h-[50dvh]"
  style={{
    backgroundImage: 'url("../src/assets/images/guilherme-petri-PtOfbGkU3uI-unsplash.jpg")',
  }}
>
  <div className="hero-overlay"></div>
  <div className="place-self-start mt-33 ml-4">
    <div className="max-w-md">
      <p className="mb-5">
        DOBRO DOŠLI!
      </p>
      <h1 className="mb-5 text-5xl font-bold">ZAKAŽITE SVOJ TERMIN</h1>
      <div className='grid gap-4 place-content-start'>
        <Link to={"/create-appointment"} className="btn btn-primary">Zakaži Termin</Link>
        <Link className="btn btn-primary">Moji Termini</Link>
      </div>
    </div>
  </div>
</div>
  )
}

export default Hero