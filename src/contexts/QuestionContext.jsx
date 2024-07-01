import { createContext } from "react";
import authQuestion from "../api/question";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
export const QuestionContext = createContext();

export default function QuestionContextProvider({ children }) {
  const [question, setQuestion] = useState([]);
  const [quizTopic, setQuizTopic] = useState([]);
  const { authUser } = useAuth();

  const getAllQuestion = async () => {
    const res = await authQuestion.getAllQuestion();
    setQuestion(res.data.questions);
  };

  const getQuestionByUserId = async (id) => {
    const res = await authQuestion.getQuestionByUserId(id);
    return res.data.questions;
  };

  const getQuestionByQuestionId = async (id) => {
    const res = await authQuestion.getQuestionByQuestionId(id);
    return res.data.question;
  };

  const getQuestionByTopicId = async (topicId) => {
    const res = await authQuestion.getQuestionByTopicId(topicId);
    setQuizTopic(res.data.questions);
  };

  const getFavQuestion = async (id) => {
    const res = await authQuestion.getFavQuestion(id);
    return res.data.questions;
  };

  const createQuestion = async (body) => {
    await authQuestion.create(body);
  };

  const editQuestion = async (id, body) => {
    await authQuestion.edit(id, body);
  };

  useEffect(() => {
    getAllQuestion();
  }, [authUser]);

  const value = {
    question,
    quizTopic,
    getQuestionByTopicId,
    getQuestionByUserId,
    getQuestionByQuestionId,
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
