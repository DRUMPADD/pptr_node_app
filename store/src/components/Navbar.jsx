import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {React, useState, useRef} from 'react'
import {Link} from 'react-router-dom'


function Navbar() {
  const myRef = useRef(null)
  const [hide, setHide] = useState(true);
  const handleClick = e => {
    setHide(!hide)
    if(hide) {
      myRef.current.style.rotate = "180deg";
      return
    } else {
      myRef.current.style.rotate = "0deg";
    }
  }
  return (
    <nav className='navbar'>
      <div className='head-navbar'>
        <p>Menú</p>
        <div className='cont-btnArrow'>
          <button type='button' id='btnArrow' ref={myRef} onClick={handleClick}>
            <FontAwesomeIcon icon={faArrowLeft} className='icons' width={"20"} />
          </button>
        </div>
      </div>
      <ul className={'nav-links' + (window.innerWidth > 800 && hide ? " hidden" : "")}>
        <li className='nav-link'>
          <Link to='/' className='link'>Registrar permiso</Link>
        </li>
        <li className='nav-link'>
          <Link to='/buscar_permiso' className='link'>Buscar permiso</Link>
        </li>
        <li className='nav-link'>
          <Link to='/indicadores' className='link'>Indicadores permisos</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar