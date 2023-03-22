import connection from './connection.js'

export const count_categories = async (req, res) => {
    try {
        const [result] = await connection.query(`SELECT count(work_cat_id) as cantidad, work_cat_id as ID, a_c.categoria, a_c.clase FROM app_permiso as a_p, app_categoria as a_c where a_p.work_cat_id = a_c.cat_key group by cat_key`);
        if(result.length) return res.json(result);
        return res.json([])
    } catch (error) {
        console.log(error);
        return res.json([])
    }
}

export const get_categories = async (req, res) => {
    try {
        const [result] = await connection.query("SELECT cat_key, categoria, clase FROM app_categoria WHERE clase = ?", req.params.clase);
        console.log(result);
        if(result.length) return res.json(result)
        return res.json([])
    } catch (error) {
        console.log(error);
        return res.json([])
    }
}

// ?? STORED PROCEDURES

export const count_categories_per_id = async (req, res) => {
    try {
        const [result] = await connection.query(`CALL CONT_CAT_P_ID()`);
        if(result[0].length) return res.json(result[0]);
        return res.json([])
    } catch (error) {
        console.log(error);
        return res.json([])
    }
}
export const count_classes_per_type = async (req, res) => {
    try {
        const [result] = await connection.query(`CALL CONT_CLASES_P_TIPO()`);
        if(result[0].length) return res.json(result[0]);
        return res.json([])
    } catch (error) {
        console.log(error);
        return res.json([])
    }
}