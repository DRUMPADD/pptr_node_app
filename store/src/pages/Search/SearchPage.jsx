import React, { useEffect, useRef, useState } from 'react'
import './search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faArrowRotateLeft} from '@fortawesome/free-solid-svg-icons'
import { getPermission, searchPermission } from '../../api/permissions.api';
import Swal from 'sweetalert2';

function SearchPage() {
  const [search, setSearch] = useState("");
  const [perm, setPerm] = useState([]);
  const [perms, setPerms] = useState([]);
  const [active, setActive] = useState(true);
  const [activeBox, setActiveBox] = useState(false);
  const [activeInp, setActiveInp] = useState(false);
  const [certs, setCerts] = useState([]);
  const [form_update, setForm_update] = useState({
    date_request: "",
    date_begin: "",
    date_end: "",
    pptr: "",
    empresa: "",
    work: "",
    work_site: "",
    categoria: "",
    work_desc: "",
    coordinador: "",
    resp_area: "",
    resp_sitio: "",
    activo: "",
  });

  const containerInfo = useRef();
  const certificatesInfo = useRef();
  const btnReset = useRef();

  const btnUpdate = useRef();
  const handleChange = async(e) => {
    const value = String(e.target.value)
    setSearch(value.trim()) 
    if(search.trim() !== "") {
      await searchPermission(value).then(response => { return setPerms(response.data) })
    }
  }

  const handleChangeForm = e => {
    console.log(e.target.value)
    setForm_update({
      ...form_update,
      [e.target.name]: e.target.value
    })
  }

  const btnUpdateForm = () => {
    btnUpdate.current.classList.toggle("cancel");

    setActive(!active)
    setActiveInp(!activeInp)
  }
  const resetInfo = () => {
    setActive(false);
    setActiveInp(false);
    setActiveBox(false)
    if(btnUpdate.current.classList.contains("cancel")) {
      btnUpdate.current.classList.remove("cancel");
    }
  }

  const boxContent = () => {
    if(perm.length) {
      const date_req = new Date(perm[0].date_request).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric'});
      const date_begin = new Date(perm[0].date_begin_work).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric'});
      const date_end = new Date(perm[0].date_end_work).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric'});
      return (
        <div key={perm[0].id_perm} className={'container-permission'+ (activeBox ? " active": "")} ref={containerInfo}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 + "px"}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <p className='content-p'>
                Fecha de solicitud:<span className={active ? "active": ""}>{new Date(perm[0].date_request).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric'})}</span>
                <input type="date" name="date_request" className={'searchBox input' + (activeInp ? " active-inp" : "")} defaultValue={date_req.split("/")[2] + "-" + date_req.split("/")[1] + "-" + date_req.split("/")[0]} onChange={handleChangeForm} />
              </p>
            </div>
            <div>
              <p className='content-p'>
                Fecha de inicio:<span className={active ? "active": ""}>{new Date(perm[0].date_begin_work).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric'})}</span>
                <input type="date" name="date_begin" className={'searchBox input' + (activeInp ? " active-inp" : "")} defaultValue={date_begin.split("/")[2] + "-" + date_begin.split("/")[1] + "-" + date_begin.split("/")[0]} onChange={handleChangeForm} />
              </p>
            </div>
            <div>
              <p className='content-p'>
                Fecha de cierre:<span className={active ? "active": ""}>{new Date(perm[0].date_end_work).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric'})}</span>
                <input type="date" name="date_end" className={'searchBox input' + (activeInp ? " active-inp" : "")} defaultValue={date_end.split("/")[2] + "-" + date_end.split("/")[1] + "-" + date_end.split("/")[0]} onChange={handleChangeForm} />
              </p>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 + "px", margin: 30 + "px"}}>
            <p className='content-p'>
              Folio PPTR: <span className={active ? "active": ""}>{perm[0].pptr}</span>
              <input type="text" name="pptr" className={'searchBox input' + (activeInp ? " active-inp" : "")} defaultValue={perm[0].pptr} onChange={handleChangeForm} />
            </p>
            <p className='content-p'>
              Empresa: <span className={active ? "active": ""}>{perm[0].empresa}</span>
              <input type="text" name="empresa" className={'searchBox input' + (activeInp ? " active-inp" : "")} defaultValue={perm[0].empresa} onChange={handleChangeForm} />
            </p>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column", gap: 20 + "px", margin: 30 + "px " + 10 + "px"}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 + "px", margin: 30 + "px " + 10 + "px", width: 100 + "%"}}>
              <p className='content-p'>
                Trabajo: 
                <span className={active ? "active": ""}>{perm[0].work}</span>
                <input type="text" name="work" className={'searchBox input' + (activeInp ? " active-inp" : "")} defaultValue={perm[0].work} onChange={handleChangeForm} />
              </p>
              <p className='content-p'>
                Sitio de trabajo: 
                <span className={active ? "active": ""}>{perm[0].work_site}</span>
                <input type="text" name="work_site" className={'searchBox input' + (activeInp ? " active-inp" : "")} defaultValue={perm[0].work_site} onChange={handleChangeForm} />
              </p>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 + "px", margin: 10 + "px"}}>
              <p className='content-p'>
                Categoría de trabajo: <span className={active ? "active": ""}>{perm[0].categoria}</span>
                <input type="text" name="categoria" className={'searchBox input' + (activeInp ? " active-inp" : "")} defaultValue={perm[0].categoria} onChange={handleChangeForm} />
              </p>
              <p className='content-p'>
                Descripción de trabajo: <span className={active ? "active": ""}>{perm[0].work_desc}</span>
                <input type="text" name="work_desc" className={'searchBox input' + (activeInp ? " active-inp" : "")} defaultValue={perm[0].work_desc} onChange={handleChangeForm} />
              </p>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 + "px", margin: 30 + "px", flexWrap: 'wrap'}}>
            <p className='content-p'>
              Coordinador: <span className={active ? "active": ""}>{perm[0].coordinador}</span>
              <input type="text" name="coordinador" className={'searchBox input' + (activeInp ? " active-inp" : "")} defaultValue={perm[0].coordinador} onChange={handleChangeForm} />
            </p>
            <p className='content-p'>
              Responsable de área: <span className={active ? "active": ""}>{perm[0].resp_area}</span>
              <input type="text" name="resp_area" className={'searchBox input' + (activeInp ? " active-inp" : "")} defaultValue={perm[0].resp_area} onChange={handleChangeForm} />
            </p>
            <p className='content-p'>
              Responsable de sitio: <span className={active ? "active": ""}>{perm[0].resp_sitio}</span>
              <input type="text" name="resp_sitio" className={'searchBox input' + (activeInp ? " active-inp" : "")} defaultValue={perm[0].resp_sitio} onChange={handleChangeForm} />
            </p>
            <p className='content-p'>
              Estado: <span className={active ? "active": ""}>{perm[0].estado}</span>
              <input type="text" name="estado" className={'searchBox input' + (activeInp ? " active-inp" : "")} defaultValue={perm[0].estado} onChange={handleChangeForm} />
            </p>
          </div>
          <div>
            <div>
              <button type='button' ref={btnUpdate} onClick={btnUpdateForm} className='btnUpdate'>{!active ? "Cancelar" : "Actualizar"}</button>
            </div>
          </div>
        </div>
      )
    } 
  }

  const certs_content = () => {
    if(certs.length) {
      return (
        <div className={'container-certificates'+ (activeBox ? " active": "")} ref={certificatesInfo}>
          <p style={{fontSize: 1.5 + "em", fontWeight: 800}}>Certificados</p>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 + "px"}}>
            {
              certs.map(certificate => (
                <div key={certificate.cert_key}>
                  <p>{certificate.certificado}</p>
                </div>
              ))
            }
          </div>
        </div>
      )
    }
  }

  const handleClick = async () => {
    if(search.trim() !== "") {
      const resp = await getPermission(search).then(response => {return response.data})
      setPerm(resp.result)
      setCerts(resp.certs)
      setActive(true)
      setActiveInp(false)
      if(!perms.length) {
        return Swal.fire({
          icon: 'error',
          title: 'No encontrado',
          text: 'El permiso no existe'
        })
      } else {
        setActiveBox(true)
      }
    }

  }
  const selectPPTR = async (searchPPTR) => {
    setSearch(searchPPTR)
  }

  return (
    <div className='container'>
      <h1>Sistema Ejecutivo de Registro de PPTR</h1>
      <h1>Buscar permiso</h1>
      <form className='search-form'>
        <div className='search-box' style={{position: 'relative'}}>
          <input type={'text'} className='inp-search' placeholder='Registro' value={search} onChange={handleChange} />
          <button type='button' onClick={handleClick}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <div style={{position: 'absolute', backgroundColor: 'gray', width: 70 + "%", left: 24 + "px", top: 60 + "px", borderRadius: 10 + "px", overflowX: "hidden"}}>
            { perms.length ?
              perms.filter(pptr => {
                return String(search) && String(pptr.pptr).toLowerCase().includes(search.toLowerCase()) && String(pptr.pptr).toLowerCase() !== String(search).toLowerCase()
              }).map((pptr) => (
                <p key={pptr.pptr} onClick={() => selectPPTR(pptr.pptr)} className='option-pptr'>{pptr.pptr}</p>
              )) : null
            }
          </div>
          <div>
            <button type='button' className='btnReset' disabled={!activeBox} onClick={resetInfo}><FontAwesomeIcon icon={faArrowRotateLeft} /></button>
          </div>
        </div>
      </form>
      {boxContent()}
      {certs_content()}
    </div>
  )
}

export default SearchPage