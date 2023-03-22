import axios from 'axios';

export const getWorkers = async (wker) => await axios.get(`http://localhost:2310/employees/${wker}`);