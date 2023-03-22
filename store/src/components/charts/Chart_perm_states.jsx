import React, { useEffect, useRef } from 'react'
import ChartJS from 'chart.js/auto'
import { getPermissions } from '../../api/permissions.api';
import ChartDataLabels from 'chartjs-plugin-datalabels';
export default function Chart_perm_states() {
    const chart = useRef();
    var canvas;
    useEffect(() => {
        let p_open = 0, p_close = 0, p_cancel = 0, p_finished = 0, backsRGB = [];
        async function permissions() {
            const alpha = parseFloat(Math.random() + .5).toPrecision(2);
            let perms = [];
            await getPermissions().then(res => {
                if(res.data) {
                    perms = res.data;
                }

            })
            perms.forEach(el => {
                const red_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                const green_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                const blue_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                backsRGB.push(`rgba(${red_}, ${green_}, ${blue_}, ${alpha}`);
                el.estado_id === 1 ? p_open += 1 : el.estado_id === 2 ? p_close += 1 : el.estado_id === 3 ? p_cancel += 1 : p_finished += 1
            })
            try {
                canvas = new ChartJS(chart.current.getContext('2d'), {
                    type: 'doughnut',
                    data: {
                        labels: ['Abiertos', 'Cerrados', 'Cancelados', 'Terminados'],
                        datasets: [
                            {
                                data: [p_open, p_close, p_cancel, p_finished],
                                backgroundColor: backsRGB,
                                datalabels: {
                                    color: '#000',
                                    font: {
                                        family: 'Nunito',
                                        size: 20
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
                        circumference: 180,
                        rotation: 270,
                        plugins: {
                            customCanvasBackgroundColor: {
                                color: 'light',
                            },
                            title: {
                                display: true,
                                text: 'Estados de permisos',
                                padding: {
                                    top: 10,
                                    bottom: 30
                                },
                                font: {
                                    size: 28,
                                    family: 'Nunito',
                                    weight: 600
                                },
                                color: "#000"
                            },
                            legend: {
                                labels: {
                                    font: {
                                        size: 16,
                                        weight: 'bold',
                                        family: 'Nunito'
                                    },
                                    textAlign: 'center',
                                }
                            },
                            datalabels: {
                                backgroundColor: function(context) {
                                    return context.dataset.backgroundColor;
                                },
                                borderColor: 'white',
                                borderRadius: 25,
                                borderWidth: 2,
                                
                                labels: {
                                    title: {
                                        font: {
                                            size: 20,
                                            weight: 'bold'
                                        },
                                        color: parseFloat(alpha) > .7 ? '#fff' : '#000'
                                      },
                                },
                                padding: 6,
                                formatter: Math.round,
                                display: function(context) {
                                    var dataset = context.dataset;
                                    var value = dataset.data[context.dataIndex];
                                    return value;
                                },
                            },
                        },
                    },
                    plugins: [ChartDataLabels],
                })
                return () => canvas.destroy();
            } catch (error) {
                return
            }
        }
        permissions()
    }, [])
    return (
        <div style={{width: 30 + "%"}}>
            <canvas ref={chart}></canvas>
        </div>
    )
}