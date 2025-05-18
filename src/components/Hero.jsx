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
  <div className="md:place-self-center md:text-center mt-33 md:mt-10">
    <div className="max-w-md mx-auto">
      <p className="mb-1 text-xl md:text-3xl">
        DOBRO DOŠLI!
      </p>
      <h1 className="mb-5 text-3xl md:text-5xl font-bold">ZAKAŽITE SVOJ TERMIN</h1>
      <div className='grid gap-4 place-content-start md:place-content-center md:grid-flow-col'>
        <Link to={"/create-appointment"} className="btn btn-primary">Zakaži Termin</Link>
        <Link className="btn btn-primary">Moji Termini</Link>
      </div>
    </div>
  </div>
</div>
  )
}

export default Hero