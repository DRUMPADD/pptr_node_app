import React from 'react'
import './styles.css'
import Chart_categories_p_id from '../../components/charts/Chart_categories_p_id';
import Chart_classes_p_type from '../../components/charts/Chart_classes_p_type';
import Chart_company_p_region from '../../components/charts/Chart_company_p_region';
import Chart_company_p_perm from '../../components/charts/Chart_company_p_perm';
import Chart_perm_states from '../../components/charts/Chart_perm_states';
function StadisticsPage() {
    return (
        <div className='container content-charts'>
            <h1>Sistema Ejecutivo de Registro de PPTR</h1>
            <h1>Estadísticas</h1>
            <div className='canvas-content'>
                <Chart_perm_states />
                <Chart_classes_p_type />
            </div>
            <Chart_categories_p_id />
            <Chart_company_p_perm />
            <div className='canvas-content'>
                <Chart_company_p_region />
            </div>
        </div>
    )
}

export default StadisticsPage