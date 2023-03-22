import axios from 'axios';

export const getRegions = async () => await axios.get("http://localhost:2310/regions")
export const getRegion = async (region) => {
    return await axios.get(`http://localhost:2310/region/${region}`)
}