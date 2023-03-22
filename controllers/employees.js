import connection from './connection.js'

export const get_employees_by_region = async (req, res) => {
    try {
        const [result] = await connection.query(`SELECT id_coor, trabajador FROM app_trabajador as t, app_region as r WHERE r.id_reg = t.region_id and r.id_reg = ?`, req.params.region);
        // console.log(result)
        if(result.length) return res.json(result);
        return res.json([])
    } catch (error) {
        console.log(error);
        return res.json([])
    }
}
export const get_all_employees = async (req, res) => {
    try {
        const [result] = await connection.query(`select pptr, coordinador_id, a_t.trabajador, resp_area_id, a_t2.trabajador, resp_sitio_id, a_t3.trabajador from 
        app_permiso as a_p, app_trabajador as a_t, app_trabajador as a_t2, app_trabajador as a_t3 
        where coordinador_id = a_t.id_coor and resp_area_id = a_t2.id_coor and resp_sitio_id = a_t3.id_coor`)
        if(result.length) return res.json(result);
        return res.json([])
    } catch (error) {
        console.log(error);
        return res.json([])
    }
}
export const get_coordinators = async (req, res) => {
    try {
        const [result] = await connection.query(`select coordinador_id, count(coordinador_id), a_t.trabajador from 
        app_permiso as a_p, app_trabajador as a_t where coordinador_id = a_t.id_coor group by coordinador_id`)
        if(result.length) return res.json(result);
        return res.json([])
    } catch (error) {
        console.log(error);
        return res.json([])
    }
}
export const get_employees_by_area = async (req, res) => {
    try{    
        const [result] = await connection.query(`select resp_area_id, count(resp_area_id), a_t.trabajador from 
        app_permiso as a_p, app_trabajador as a_t where resp_area_id = a_t.id_coor group by resp_area_id`)
        if(result.length) return res.json(result);
        return res.json([])
    } catch (error) {
        console.log(error);
        return res.json([])
    }
}
export const get_employees_by_site = async (req, res) => {
    try {
        const [result] = await connection.query(`select resp_sitio_id, count(resp_sitio_id), a_t.trabajador from 
        app_permiso as a_p, app_trabajador as a_t where resp_sitio_id = a_t.id_coor group by resp_sitio_id`)
        if(result.length) return res.json(result);
        return res.json([])
    } catch (error) {
        console.log(error);
        return res.json([])
    }
}