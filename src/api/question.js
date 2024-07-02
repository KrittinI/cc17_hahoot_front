import axios from "../config/axios";
const questionApi = {};
questionApi.getAllQuestion = () => axios.get("/questions");
questionApi.editQuestionById = (questionId, dataChange) => axios.patch(`/questions/${questionId}`, dataChange);
questionApi.createQuestion = (data) => axios.post("/questions", data);
// questionApi.deleteQuestionById = (questionId) => axios.delete(`/questions/${questionId}`);

export default questionApi;
