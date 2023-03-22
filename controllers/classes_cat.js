import connection from './connection.js'

export const count_classes = async (req, res) => {
    try {
        const [result] = await connection.query(`select clase, count(a_c.clase) as clases from app_permiso as a_p, app_categoria as a_c where a_p.work_cat_id = a_c.cat_key group by clase`);
        if(result.length) return res.json(result)
        return res.json([])
    } catch (error) {
        console.log(error);
        return res.json([])
    }
}