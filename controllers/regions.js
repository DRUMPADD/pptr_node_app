import connection from './connection.js'

export const getRegions = async (req, res) => {
    try {
        const [result] = await connection.query('SELECT * FROM app_region');
        if(result.length) return res.json(result);
        return res.json([])
    } catch (error) {
        console.log(error);
        return res.json([])
    }
}