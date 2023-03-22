import React, { useEffect, useRef } from 'react'
import ChartJS from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { count_classes_per_type } from '../../api/categories.api';
export default function Chart_classes_p_type() {
    const chartjs = useRef();
    var mychart;
    useEffect(() => {
        async function classes_p_type() {
            let labs = [], classes = [];
            await count_classes_per_type().then(resp => {
                resp.data.map(class_ => {
                    labs.push("Clase " + class_.clase)
                    classes.push(class_.clases)
                })
            });
            try {
                mychart = new ChartJS(chartjs.current.getContext("2d"), {
                    type: 'pie',
                    data: {
                        labels: [labs[0], labs[1]],
                        datasets: [
                            {
                                backgroundColor: ['rgba(203, 102, 134, 0.7)', 'rgba(45, 196, 168, 0.7)'],
                                data: [classes[0], classes[1]],
                                datalabels: {
                                    color: '#000',
                                    font: {
                                        family: 'Nunito',
                                        size: 24
                                    }
                                },
                            }
                        ],
                    },
                    options: {
                        plugins: {
                            title: {
                                display: true,
                                text: 'Clases por tipo',
                                padding: {
                                    top: 10,
                                    bottom: 30
                                },
                                font: {
                                    size: 28,
                                    family: 'Nunito',
                                    weight: 600
                                },
                                color: 'black'
                            },
                            legend: {
                                labels: {
                                    font: {
                                        size: 16,
                                        weight: 'bold',
                                        family: 'Nunito',
                                    },
                                    color: 'black',
                                    textAlign: 'center',
                                }
                            },
                            datalabels: {
                                backgroundColor: function(context) {
                                    return context.dataset.backgroundColor;
                                },
                                // borderColor: 'red',
                                borderRadius: 100,
                                borderWidth: 10,
                                // textStrokeColor: 100,
                                labels: {
                                    title: {
                                        font: {
                                            size: 20,
                                            weight: 'bold'
                                        },
                                        color: '#000'
                                      },
                                },
                                padding: 6,
                                formatter: Math.round,
                                display: function(context) {
                                    var dataset = context.dataset;
                                    var count = dataset.data.length;
                                    var value = dataset.data[context.dataIndex];
                                    return value;
                                },
                            },
                        }
                    },
                    plugins: [ChartDataLabels]
                })

                return () => mychart.destroy()
            } catch (error) {
                return
            }
        }
        classes_p_type()
    }, [])
  return (
    <div style={{width: 30 + "%"}}>
        <canvas ref={chartjs} width="400" height={'400'}></canvas>
    </div>
  )
}