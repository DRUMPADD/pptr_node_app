import axios from 'axios';

export const getCompanies = async (comp) => await axios.get(`http://localhost:2310/companies/${comp}`);
export const getCompany_p_region = async () => await axios.get(`http://localhost:2310/company/c_company_region`)
export const getCompany_p_perm = async () => await axios.get(`http://localhost:2310/company/c_company_permissions`)