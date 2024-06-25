import axios from "../config/axios";
const authApi = {};

authApi.register = async (body) => axios.post("/auth/register", body);
authApi.login = async (body) => axios.post("/auth/login", body);
authApi.getAuthUser = async () => axios.get("/auth/me");

export default authApi;
