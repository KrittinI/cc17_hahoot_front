import axios from "../config/axios";
const playApi = {};

playApi.sendmail = async (id) => axios.post("/play-game/sendmail", id);

export default playApi;
