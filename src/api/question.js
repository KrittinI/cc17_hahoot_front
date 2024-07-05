import axios from "../config/axios";
const questionApi = {};

questionApi.createQuestion = (data) => axios.post("/questions", data);
questionApi.editQuestionById = (questionId, dataChange) => axios.patch(`/questions/${questionId}`, dataChange);


questionApi.getAllQuestion = async () => axios.get("/questions");
questionApi.getQuestionByQuestionId = async (id) =>
  axios.get(`/questions/${id}`);
questionApi.getQuestionByTopicId = async (topicId) =>
  axios.get(`/questions/topic/${topicId}`);
questionApi.getQuestionByUserId = async (id) =>
  axios.get(`/questions/users/${id}`);

// Favorite
questionApi.getFavQuestion = async (id) =>
  axios.get("/questions/favorite", id);
questionApi.createFav = async (id) => axios.post(`/questions/${id}/favorite`);
questionApi.deleteFav = async (id) =>
  axios.delete(`/questions/${id}/favorite`);

// Comment
questionApi.comment = async (id) => axios.post(`/questions/${id}/comment`);
questionApi.deleteComment = async (questionId, commentId) =>
  axios.delete(`/questions/${questionId}/comment/${commentId}`);
questionApi.editComment = async (questionId, commentId, body) =>
  axios.patch(`/questions/${questionId}/comment/${commentId}`, body);


// questionApi.deleteQuestionById = (questionId) => axios.delete(`/questions/${questionId}`);

export default questionApi;
