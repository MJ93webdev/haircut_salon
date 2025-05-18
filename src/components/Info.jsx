import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";

function Info() {
  return (
    <div>
      <div className="grid gap-6 text-center md:text-left md:place-content-center md:grid-cols-2 my-10">
        <div className="grid gap-1 md:gap-4 md:justify-self-end content-start">
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold mb-4">RADNO VREME</h2>   
                  <p>Ponedeljak</p>     
                  <p className="text-red-500">slobodan dan</p>
                </div>
                <div>
                  <p>Utorak - petak</p>     
                  <p>11:00-19:00</p>
                </div>
                <div> 

                  <p>Subota - nedelja</p>     
                  <p>10:00 - 18:00</p>
                </div>
        </div>
        <div className="grid gap-1">

                  <h2 className="text-xl md:text-2xl font-semibold mb-4">KONTAKT</h2>
                  <p>Adresa:</p>     
                  <p>Kolonija Šećerane 15A</p>     
                  <p>25220 Crvenka</p>     
                  <p>Srbija</p>
                
                  <p>Telefon:</p>     
                  <p>060/123123-123</p>     

                <div className="my-4">
                  <h2 className="my-4">DRUŠTVENE MREŽE</h2>
                  <div className="flex gap-2 justify-center md:justify-start">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                      <FaFacebook color="#fff" size={25} />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                      <FaInstagram color="#fff" size={25} />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                      <BsTwitterX color="#fff" size={25} />
                    </a>
                  </div>

                </div>
        </div>

      </div>
    </div>
  )
}

export default Info