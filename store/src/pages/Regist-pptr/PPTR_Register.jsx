import React, { useEffect, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import './register.css'
import { getRegions, getRegion } from '../../api/regions.api'
import { register } from '../../api/permissions.api'
import { getCompanies } from '../../api/companies.api'
import { getWorkers } from '../../api/employees.api'
import { getCategories } from '../../api/categories.api'
import Swal from 'sweetalert2'
import Form from '../../components/Form'
function Products() {
  const [regions, setRegions] = useState([])
  const [workers, setWorkers] = useState([])
  // const [sedes, setSedes] = useState([])
  const [cats, setCats] = useState([])
  const [companies, setCompanies] = useState([])
  const [inputSearch, setinputSearch] = useState("")
  const [form, setForm] = useState({
      region: "",
      fecha_sol: "",
      fecha_ini: "",
      fecha_cie: "",
      empresa: "",
      sup_comp: "",
      clase_perm: null,
      folio_pptr: "",
      tr: "",
      sit_tr: "",
      cat_tr: "",
      desc_tr: "",
      enc_sit: "",
      enc_area: "",
      coor: "",
      certifs: [],
      inst: ""
  })

  function validate() {
    return form.region !== "" && form.fecha_sol !== "" && form.fecha_ini !== "" && form.fecha_cie !== "" && form.empresa !== "" && form.sup_comp !== "" && form.clase_perm !== "" && form.folio_pptr !== "" && form.enc_sit !== "" && form.enc_area !== "" && form.coor !== ""
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(validate()) {
      try {
          const response = await register(form)
          const d = await response.json();
          if(d.status === "success") {
            setForm({
              region: "",
              fecha_sol: "",
              fecha_ini: "",
              fecha_cie: "",
              empresa: "",
              sup_comp: "",
              clase_perm: null,
              folio_pptr: "",
              tr: "",
              sit_tr: "",
              cat_tr: "",
              desc_tr: "",
              enc_sit: "",
              enc_area: "",
              coor: "",
              certifs: [],
              inst: ""
            })
            setCompanies([])
            // setSedes([])
            setRegions([])
            setWorkers([])
  
            await Swal.fire({
              title: d.msg,
              icon: d.status
            })

            location.reload();
          } else {
            Swal.fire({
              title: "Error en el sistema",
              icon: d.status
            })
          }
      } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error al intentar enviar los datos",
            icon: "error"
          })
      }
    } else {
      Swal.fire({
        title: 'Datos incompletos',
        icon: 'warning',
        text: 'Debe llenar todos los datos requeridos',
      })
    }
  }

  const showRegions = async() => {
    const res = await getRegions().then(response => {return response.data.regions})
    const ar = new Array(res)
  }
  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

    if(e.target.name === "clase_perm") {
      showCategories(e.target.value)
    }
  }

  const handle_change_dates = e => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
      console.log([e.target.value][0])
  }

  const searchRegion = async(val) => {
    let str = String(val)
    setinputSearch(str)
    if(str.trim() !== "") {
      await getRegion(str).then(res => {
        setRegions(res.data)
      })
    }
  }
  
  const showCategories = async(val) => {
    const class_ = String(val)
    if(class_) {
      await getCategories(class_).then(response => {
        if(response.data) {
          return setCats(response.data)
        }
        setCats([])
      });
    }
  }

  const clickRegion = (e) => {
    const reg = String(e.target.innerText).split(" - ")
    setinputSearch(reg[0])
    form.region = reg[1]
    setRegions([])
    // showSedes(reg[1])
    showCompanies(reg[1])
    showWorkers(reg[1])
  }

  useEffect(() => {
    showRegions()
  }, [])


  const showCompanies = async (val) => {
    const r = String(val)
    if(r !== ""){
        await getCompanies(r).then(res => {
          if(res.data)
            return setCompanies(res.data)
          setCompanies([])
        })
    }
  }

  // const showSedes = async (val) => {
  //   const r = String(val)
  //   if(r !== ""){
  //       await getSedes(r).then(res => {
  //         if(res.data)
  //           return setSedes(res.data.sedes)
  //         setSedes([])
  //       })
  //   }
  // }

  const showWorkers = async (val) => {
    const r = String(val)
    if(r !== ""){
        await getWorkers(r).then(res => {
          if(res.data)
            return setWorkers(res.data)
          setWorkers([])
        })
    }
  }

  return (
    <div className='container'>
      <h1>Sistema Ejecutivo de Registro de PPTR</h1>
      <h1>Registrar permiso</h1>
      <div className='search-box'>
        <div className='results' style={{position: 'relative'}}>
          <input type="search" value={inputSearch} className='inp-s' onChange={(e) => searchRegion(e.target.value)} placeholder={"Buscar estado"} />
          <FontAwesomeIcon icon={faSearch} style={{position: 'absolute', right: -41 + "px", backgroundColor: "#202020", color: "#fff", padding: 12.8 + "px", borderBottomRightRadius: 5 + "px", borderTopRightRadius: 5 + "px"}} />
        </div>
        <div className={'states-box'} hidden={regions.length === 0} style={{position: "relative", zIndex: 1}}>
          <div className={'box'} style={{position: "absolute"}}>
            { regions.length ?
              regions.filter(el => {
                  return inputSearch && el.region.toLowerCase().includes(inputSearch.toLowerCase()) && el.region.toLowerCase() !== inputSearch.toLowerCase()
                }
              ).map(reg => (
                <p onClick={clickRegion} key={reg.region}>{reg.region} - {reg.id_reg}</p>
              ))
              : null
            }
          </div>
        </div>
      </div>
      <Form form={form} handleChangeDates={handle_change_dates} handleChange={handleChange} worker={workers} company={companies} handleSubmit={handleSubmit} cats={cats} />
    </div>
  )
}

export default Products