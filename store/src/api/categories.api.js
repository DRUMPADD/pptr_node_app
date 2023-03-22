import axios from 'axios';

export const count_categories_per_id = async () => await axios.get(`http://localhost:2310/categories_p_id`);
export const count_classes_per_type = async () => await axios.get(`http://localhost:2310/classes_p_type`);

export const getCategories = async (cl) => await axios.get(`http://localhost:2310/categories/${cl}`);