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

// Favorite
authQuestion.getFavQuestion = async (id) =>
  axios.get("/questions/favorite", id);
authQuestion.createFev = async (id) => axios.post(`/questions/${id}/favorite`);
authQuestion.deleteFev = async (id) =>
  axios.delete(`/questions/${id}/favorite`);

// Comment
authQuestion.comment = async (id) => axios.post(`/questions/${id}/comment`);
authQuestion.deleteComment = async (questionId, commentId) =>
  axios.delete(`/questions/${questionId}/comment/${commentId}`);
authQuestion.editComment = async (questionId, commentId, body) =>
  axios.patch(`/questions/${questionId}/comment/${commentId}`, body);
export default authQuestion;
