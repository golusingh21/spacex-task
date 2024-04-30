import axios from "axios";
const baseUrl = "https://api.spacexdata.com/v3/"

const API = axios.create({
    baseURL: baseUrl,
});

export default API