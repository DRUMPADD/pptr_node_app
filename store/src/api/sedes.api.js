import axios from 'axios';

export const getSedes = async (sede) => await axios.get(`http://localhost:2310/sedes/${sede}`)