import { createContext } from "react";
import authQuestion from "../api/question";
export const QuestionContext = createContext();

export default function QuestionContextProvider({ children }) {
  const getAllQuestion = async () => {
    const res = await authQuestion.getAllQuestion();
    return res.data;
  };

  const getQuestionByUserId = async (id) => {
    const res = await authQuestion.getQuestionByUserId(id);
    return res.data;
  };

  const getQuestionByQuestionId = async (id) => {
    const res = await authQuestion.getQuestionByQuestionId(id);
    return res.data;
  };

  const getQuestionByTopicId = async (id) => {
    const res = await authQuestion.getQuestionByTopicId(id);
    return res.data;
  };

  const getFavQuestion = async (id) => {
    const res = await authQuestion.getFavQuestion(id);
    return res.data;
  };

  const createQuestion = async (body) => {
    await authQuestion.create(body);
  };

  const editQuestion = async (id, body) => {
    await authQuestion.edit(id, body);
  };

  const value = {
    getAllQuestion,
    getQuestionByUserId,
    getQuestionByQuestionId,
    getQuestionByTopicId,
    getFavQuestion,
    createQuestion,
    editQuestion,
  };
  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}
