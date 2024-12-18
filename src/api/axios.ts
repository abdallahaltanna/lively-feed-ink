import axios from "axios";
import config from "../config";

const { apiBaseUrl } = config;
const instance = axios.create({ baseURL: apiBaseUrl });

export default instance;
