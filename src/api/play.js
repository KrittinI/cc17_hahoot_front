import axios from "../config/axios";
const playApi = {};

playApi.sendmail = async (body) => axios.post("/play-game/sendmail", body);

export default playApi;
