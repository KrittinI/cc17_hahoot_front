import axios from "../config/axios";
const topicApi = {};

topicApi.getAllTopic = async () => axios.get("/topics");

export default topicApi;
