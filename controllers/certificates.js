import conn from './connection.js'

export const get_certificates = async (req, res) => {
    try {
        const [result] = await conn.query(`SELECT * FROM app_certificado`);
        if(result.length) return res.json(result);
        return res.json(result)
    } catch (error) {
        console.log(error);
        return res.json([])
    }
}