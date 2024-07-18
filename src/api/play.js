import axios from "../config/axios";
const playApi = {};

playApi.sendmail = async (body) => axios.post("/play-game/sendmail", body);
playApi.sendmailMultiplayer = async (body) =>
  axios.post("/play-game/multiplayer/sendmail", body);
playApi.sendmailMultiplayerClient = async (body) =>
  axios.post("/play-game/multiplayerClient/sendmail", body);

export default playApi;
