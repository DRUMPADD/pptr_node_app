import React, { useEffect, useRef, useState } from 'react'
import { Chart } from 'chart.js'
import { getCompany_p_perm } from '../../api/companies.api'
export default function Chart_company_p_perm() {
    const myCanvas = useRef(null);
    const [comps, setComps] = useState([])
    var mychart;
    useEffect(() => {
        async function company_p_permission() {
          let labels_ = [], data_ = [], backsRGB = [];
          const red_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
          const green_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
          const blue_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
          await getCompany_p_perm().then(resp => {
            setComps(resp.data)
            resp.data.map(r => {
              labels_.push(r.empresa)
              data_.push(r.cantidad)
            })
          })
          try {
            mychart = new Chart(myCanvas.current.getContext("2d"), {
              type: 'line',
              data: {
                labels: labels_,
                datasets: [
                  {
                    label: 'Empresas',
                    data: data_,
                    backgroundColor: `rgba(${red_}, ${green_}, ${blue_}, 1`,
                    datalabels: {
                      font: {
                        size: 16,
                        family: 'Nunito'
                      }
                    },
                    fill: true,
                    borderColor: `rgba(${red_}, ${green_}, ${blue_}, 1`,
                    tension: 0.9
                  }
                ]
              },
              options: {
                plugins: {
                  title: {
                    display: true,
                    text: 'Empresas ligadas a permisos',
                    font: {
                      size: 22,
                      weight: 'bolder',
                      family: 'Nunito'
                    },
                    color: 'black'
                  },
                  legend: {
                    labels: {
                      font: {
                        size: 14,
                        weight: 'bold'
                      }
                    }
                  },
                  
                },
                scales: {
                  x: {
                      display: false,
                  },
                  x1: {
                      offset: true,
                      gridLines: {
                          display: false
                      }
                  }
                }
              },
            })
          } catch (error) {
            return;
          }
        }
        company_p_permission()
    }, [])
  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: 100 + "%"}}>
      <table className='table-comps' style={{ width: 40 + "%"}}>
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {
            comps.map(comp => (
              <tr key={comp.ID}>
                <td>{comp.empresa}</td>
                <td>{comp.cantidad}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div style={{width: 40 + "%"}}>
        <canvas ref={myCanvas} width={'600'} height={'400'}></canvas>
      </div>
    </div>
  )
}