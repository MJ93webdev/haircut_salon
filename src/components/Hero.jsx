import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'

function Hero() {
  return (
<motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
  className="hero h-[50vh] h-[50dvh]"
  style={{
    backgroundImage: 'url("/hero.jpg")'
  }}
>
  <div className="hero-overlay"></div>
  <div className="md:place-self-center md:text-center mt-33 md:mt-10">
    <div className="max-w-md mx-auto">
      <p className="mb-4 text-xl md:text-3xl">
        DOBRO DOŠLI!
      </p>
      <h1 className="mb-7 text-3xl md:text-5xl font-bold">ZAKAŽITE SVOJ TERMIN</h1>
      <div className='grid gap-4 place-content-start md:place-content-center md:grid-flow-col'>
        <Link to={"/create-appointment"} className="btn btn-primary">Zakaži Termin</Link>
        <Link className="btn btn-primary">Moji Termini</Link>
      </div>
    </div>
  </div>
</motion.div>
  )
}

export default Hero