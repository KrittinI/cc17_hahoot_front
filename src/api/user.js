import axios from "../config/axios";
const userApi = {};

userApi.getUser = (userId) => axios.get(`/users/${userId}`);
userApi.update = (body) => axios.patch("/users", body);

export default userApi;
