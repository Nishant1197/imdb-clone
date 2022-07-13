import react from 'react';
import React from 'react';
import Logo from "../../src/Logo.png";
import { Link } from 'react-router-dom'
function Navbar() {
  return (
  <>
<div  className='flex space-x-8 pl-5 py-4 border items-center' >
  <img  className='w-[50px] md:w-[60px]' src={Logo} style={{"height":"4rem","width":"4rem"}}></img>
  <Link to="/" className="font-bold text-blue-400 text-xl md:text-3xl">Movies</Link>
    <Link to="/favourite" className="font-bold text-blue-400 text-xl md:text-3xl">Favorites</Link>
</div>
  </>
  )
}
export default Navbar;