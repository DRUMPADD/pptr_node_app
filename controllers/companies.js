import connection from './connection.js'

export const get_companies = async (req, res) => {
    try {
        const [result] = await connection.query(`SELECT pptr, empresa_id from app_permiso as ap, app_empresa as ae where ap.empresa_id = ae.id_emp`);
        if(result.length) return res.json(result)
        return res.json([])
    } catch (error) {
        console.log(error);
        return res.json([])
    }
}
export const get_companies_for_every_permission = async (req, res) => {
    try{
        const [result] = await connection.query(`SELECT empresa_id as ID, ae.empresa, count(empresa_id) as cantidad from app_permiso as ap, app_empresa as ae where ap.empresa_id = ae.id_emp group by id_emp`);
        if(result.length) return res.json(result)
        return res.json([])
    } catch (error) {
        console.log(error);
        return res.json([])
    }
}
export const get_companies_for_every_region = async (req, res) => {
    try{
        const [result] = await connection.query(`select region_id, count(empresa) as cantidad, region from app_empresa as ae, app_region as ar where ae.region_id = ar.id_reg group by region_id`);
        if(result.length) return res.json(result)
        return res.json([])
    } catch (error) {
        console.log(error);
        return res.json([])
    }
}
export const get_companies_by_region = async (req, res) => {
    try{
        const [result] = await connection.query(`SELECT id_emp, empresa FROM app_empresa as emp, app_region as r WHERE r.id_reg = emp.region_id and r.id_reg = ?`, req.params.region);
        if(result.length) return res.json(result)
        return res.json([])
    } catch (error) {
        console.log(error);
        return res.json([])
    }
}

export const count_c_region = async (req, res) => {
    try{
        const [result] = await connection.query("CALL EMPRESA_P_REGION()");
        console.log("Result in count_c_region", result)
        if(result[0].length) 
            return res.json(result[0])
        return res.json([])
    } catch (error) {
        console.log("Error:",error);
        return res.json([])
    }
}
export const get_c_permissions = async (req, res) => {
    try{
        const [result] = await connection.query("CALL EMPRESAS_PERMISOS()");
        console.log("Result in get_c_permissions", result)
        if(result[0].length) 
            return res.json(result[0])
        return res.json([])
    } catch (error) {
        console.log(error);
        return res.json([])
    }
}