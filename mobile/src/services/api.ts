import axios from "axios";

const api = axios.create({
    baseURL: "https://restaurant-manager-dun.vercel.app",
})

export { api };