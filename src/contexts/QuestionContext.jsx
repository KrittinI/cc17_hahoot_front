import { createContext } from "react";
import questionApi from "../api/question";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export const QuestionContext = createContext();

export default function QuestionContextProvider({ children }) {
  const { authUser } = useAuth();
  const [question, setQuestion] = useState([]);
  const [showQuestion, setShowQuestion] = useState([]);

  const getAllQuestion = async () => {
    const res = await questionApi.getAllQuestion();
    setQuestion(res.data.questions);
    setShowQuestion(res.data.questions);
  };

  const getQuestionByUserId = async (id) =>
    await questionApi.getQuestionByUserId(id);

  const getQuestionByQuestionId = async (id) => {
    const res = await questionApi.getQuestionByQuestionId(id);
    return res.data.question;
  };

  const getQuestionByTopicId = async (topicId) =>
    await questionApi.getQuestionByTopicId(topicId);

  const createQuestion = async (body) => {
    await questionApi.createQuestion(body);
  };

  const editQuestion = async (id, body) => {
    await questionApi.editQuestionById(id, body);
  };

  useEffect(() => {
    getAllQuestion();
  }, [authUser]);

  const value = {
    question,
    showQuestion,
    setShowQuestion,
    getQuestionByTopicId,
    getQuestionByUserId,
    getQuestionByQuestionId,
    createQuestion,
    editQuestion,
  };

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}
