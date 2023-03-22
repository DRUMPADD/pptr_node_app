import conn from './connection.js'

export const get_permissions = async (req, res) => {
    try {
        const [result] = await conn.query("SELECT * FROM app_permiso");
        if(result.length) return res.json(result);
        return res.json([])
    } catch (error) {
        console.log(error)
        return res.json([])
    }
}
export const search_permission = async (req, res) => {
    try {
        const [result] = await conn.query("SELECT id_perm, pptr FROM app_permiso WHERE pptr LIKE ?", '%' + req.params.perm + '%');
        if(result.length) return res.json(result);
        return res.json([])
    } catch (error) {
        console.log(error)
        return res.json([])
    }
}
export const get_permission_by_pptr = async (req, res) => {
    try {
        const [result] = await conn.query("SELECT id_perm, date_request, date_begin_work, date_end_work, pptr, empresa_id, ae.empresa, work, work_site, c.categoria, work_desc, t3.trabajador as coordinador, t.trabajador as resp_area, t2.trabajador as resp_sitio, e.estado FROM app_permiso, app_empresa as ae, app_estado as e, app_trabajador as t, app_trabajador as t2, app_trabajador as t3, app_categoria as c where pptr = ? and e.id_e = estado_id and t.id_coor = resp_area_id and t2.id_coor = resp_sitio_id and t3.id_coor = coordinador_id and app_permiso.work_cat_id = c.cat_key and ae.id_emp = app_permiso.empresa_id", req.params.perm);
        
        const permiso = await conn.query("SELECT perm_cert, p.id_perm, p.pptr, c.cert_key, c.certificado from app_permisos_certificado as pc, app_certificado as c, app_permiso as p where pc.certificado_id = c.cert_key and pc.permiso_id = p.id_perm and p.pptr = ?", req.params.perm);
        const certs = permiso[0].length ? permiso[0] : [];
        if(result.length) return res.json({result, certs});
        return res.json([])
    } catch (error) {
        console.log(error)
        return res.json([])
    }
}