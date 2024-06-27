import axios from "../config/axios";
const authQuestion = {};

authQuestion.create = async (body) => axios.post("/questions", body);
authQuestion.edit = async (id, body) => axios.patch(`/questions/${id}`, body);

authQuestion.getAllQuestion = async () => axios.get("/questions");
authQuestion.getQuestionByQuestionId = async (id) =>
  axios.get(`/questions/${id}`);
authQuestion.getQuestionByTopicId = async (topicId) =>
  axios.get(`/questions/topic/${topicId}`);
authQuestion.getQuestionByUserId = async (id) =>
  axios.get(`/questions/users/${id}`);

authQuestion.getFavQuestion = async (id) =>
  axios.get("/questions/favorite", id);

export default authQuestion;
