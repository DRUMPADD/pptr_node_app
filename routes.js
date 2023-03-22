import {Router} from 'express'
import {getRegions} from './controllers/regions.js'
import connection from './controllers/connection.js'
import {count_categories, count_categories_per_id, count_classes_per_type, get_categories} from './controllers/categories.js'
import {get_all_employees, get_coordinators, get_employees_by_area, get_employees_by_region, get_employees_by_site} from './controllers/employees.js'
import { count_c_region, get_companies_by_region, get_c_permissions } from './controllers/companies.js'
import { get_certificates } from './controllers/certificates.js'
import { get_permissions, get_permission_by_pptr, search_permission } from './controllers/permissions.js'
const router = Router()

router.get("/", getRegions)
router.get("/regions", getRegions)
router.get("/region/:region", async (req, res) => {
     const [result] = await connection.query(`SELECT id_reg, region FROM app_region WHERE region LIKE ?`, '%' + req.params.region + '%')
     console.log("Param:",req.params.region);
     console.log("Región:",result);

     return res.json(result)
})
router.get("/categories", count_categories)
router.get("/categories_p_id", count_categories_per_id)
router.get("/classes_p_type", count_classes_per_type)
router.get("/categories/:clase", get_categories)


router.get("/companies/:region", get_companies_by_region)
router.get("/company/c_company_region", count_c_region)
router.get("/company/c_company_permissions", get_c_permissions)

// router.get("/permissions/:perm", get_companies_by_region)
// router.get("/permission/:perm", get_companies_by_region)


router.get("/get_all_employees", get_all_employees)
router.get("/coordinators", get_coordinators)
router.get("/employees/:region", get_employees_by_region)
router.get("/employees_by_area", get_employees_by_area)
router.get("/employees_by_site", get_employees_by_site)

router.get("/certificates", get_certificates)

router.get("/permissions", get_permissions)
router.get("/permissions/:perm", search_permission)
router.get("/permission/:perm", get_permission_by_pptr)
// router.get("/sedes/:region", get_employees_by_site)

export default router