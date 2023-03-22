import React, { useEffect, useRef, useState } from 'react';
import { count_categories_per_id } from '../../api/categories.api';
import '../css/table.css';
import ChartJS from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';
export default function Chart_categories_p_id() {
    const [categories, setCategories] = useState([]);
    const chartjs = useRef();
    var mychart;
    useEffect(() => {
        async function categories_per_id () {
            let catsID = [], cQuant = [], backsRGB = [];
            await count_categories_per_id().then(resp => {
                if(resp.data) {
                    setCategories(resp.data)
                    resp.data.map( c => {
                        catsID.push(c.ID);
                        cQuant.push(c.cantidad);
                        const red_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                        const green_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                        const blue_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                        backsRGB.push(`rgba(${red_}, ${green_}, ${blue_}, ${parseFloat(Math.random() + .5).toPrecision(2)})`)
                    })
                    return
                }
            });
            try {
                mychart = new ChartJS(chartjs.current.getContext("2d"), {
                    type: 'bar',
                    data: {
                        labels: catsID,
                        datasets: [
                            {
                                data: cQuant,
                                backgroundColor: backsRGB,
                                datalabels: {
                                    color: '#000',
                                    font: {
                                        family: 'Nunito',
                                        size: 24
                                    }
                                },
                            },
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRadio: true,
                        elements: {
                            point: 'dash'
                        },
                        layout: {
                            padding: 10,
                        },
                        interaction: {
                            intersect: true,
                            mode: 'nearest'
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Categorías',
                                padding: {
                                    top: 10,
                                    bottom: 30
                                },
                                font: {
                                    size: 22,
                                    family: 'Nunito',
                                    weight: 600,
                                },
                                color: '#000'
                            },
                            legend: {
                                labels: {
                                    font: {
                                        size: 14,
                                        weight: 700,
                                        family: 'Nunito'
                                    },
                                    textAlign: 'center',
                                    color: '#000'
                                }
                            },
                            datalabels: {
                                display: function(context) {
                                    return context.dataset.data[context.dataIndex] > 15;
                                  },
                            },
                            tooltip: {
                                callbacks: {
                                  title: () => undefined
                                }
                            }
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
                    plugins: [{beforeInit: chart => {
                        let dataset = chart.config.data.datasets[0];
                        chart.config.data.datasets = chart.config.data.labels.map((l, i) => ({
                          label: l,
                          data: [{ x: i + 1, y: dataset.data[i] }],
                          backgroundColor: dataset.backgroundColor[i],
                          categoryPercentage: 1
                        }));
                        chart.config.data.labels = undefined;
                      },  beforeLayout: chart => chart.options.scales.x1.labels = chart.config.data.datasets.filter((ds, i) => !chart.getDatasetMeta(i).hidden).map(ds => ds.label)}, ChartDataLabels],
                })
                return () => mychart.destroy()
            } catch (error) {
                return;
            }
        }
        categories_per_id();
    }, [])
  return (
    <div className='canvas-content'>
        <div style={{ width: 40 + "%"}}>
            <canvas ref={chartjs}></canvas>
        </div>
        <div className='container-table'>
            <table style={{width: 100 + "%"}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Categoría</th>
                        <th>Clase</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map(category => (
                            <tr key={category.ID}>
                                <td>{category.ID}</td>
                                <td>{category.categoria}</td>
                                <td>{category.clase}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}