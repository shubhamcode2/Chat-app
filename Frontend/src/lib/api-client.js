// Desc: API client for making requests to the backend wrapped in axios

import axios from "axios";
import { HOST } from "@/utils/constants";

const apiClient = axios.create({
    baseURL: HOST,
})

export default apiClient;