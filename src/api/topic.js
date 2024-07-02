import axios from "../config/axios";
const topicApi = {};

topicApi.getAllTopic = () => axios.get("/topics");

export default topicApi;
