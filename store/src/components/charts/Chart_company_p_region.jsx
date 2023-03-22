import React, { useEffect, useRef } from 'react'
import { getCompany_p_region } from '../../api/companies.api';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
export default function Chart_company_p_region() {
    const mycanvas = useRef(null);
    var canvas;
    useEffect(() => {
        async function countCompanies () {
            let comps = [], labels_ = [], backsRGB = [];
            await getCompany_p_region().then(resp => {
                if(resp.data) {
                    resp.data.map(r => {
                        labels_.push(r.region);
                        comps.push(r.cantidad);
                        const red_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                        const green_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                        const blue_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                        backsRGB.push(`rgba(${red_}, ${green_}, ${blue_}, ${.7}`);
                    })
                }
            })
            try {
                canvas = new Chart(mycanvas.current.getContext("2d"), {
                    type: 'doughnut',
                    data: {
                        labels: labels_,
                        datasets: [{
                            data: comps,
                            backgroundColor: backsRGB,
                        }]
                    },
                    options: {
                        plugins: {
                            title: {
                                display: true,
                                font: {
                                    size: 20,
                                    family: 'Nunito'
                                },
                                color: '#000000',
                                text: 'Empresas por región'
                            },
                            legend: {
                                labels: {
                                    font: {
                                        size: 12,
                                        weight: 'bold',
                                        family: 'Nunito'
                                    },
                                    boxHeight: 15,
                                    boxWidth: 15,
                                    useBorderRadius: true,
                                    borderRadius: 50,
                                    textAlign: 'center'
                                }
                            },
                            datalabels: {
                                labels: {
                                    title: {
                                        font: {
                                            size: 20,
                                            family: 'Nunito',
                                            weight: 'bold'
                                        },
                                        color: 'rgb(255, 255, 255)',
                                        borderRadius: 50,
                                        backgroundColor: 'black',
                                        borderColor: 'black'
                                    }
                                }
                            }
                        }
                    },
                    plugins: [ChartDataLabels],
                })
                return () => mycanvas.destroy()
            } catch (error) {
                
            }
        }
        countCompanies()
    }, [])
  return (
    <div style={{width: 30 + "%"}}>
        <canvas ref={mycanvas} width={'400'} height={'400'}></canvas>
    </div>
  )
}