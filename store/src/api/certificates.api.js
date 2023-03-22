import axios from "axios";

export const certificates = async () => await axios.get("http://localhost:2310/certificates") 