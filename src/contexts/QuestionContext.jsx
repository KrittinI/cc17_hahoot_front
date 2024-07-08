import { createContext } from "react";
import questionApi from "../api/question";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export const QuestionContext = createContext();

export default function QuestionContextProvider({ children }) {
  const { authUser } = useAuth();
  const [showQuestion, setShowQuestion] = useState([]);
  const [playQuestion, setPlayQuestion] = useState([]);

  const getAllQuestion = async () => {
    const res = await questionApi.getAllQuestion();
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

  useEffect(() => {
    getAllQuestion();
  }, [authUser]);

  const value = {
    showQuestion,
    setShowQuestion,
    getQuestionByTopicId,
    getQuestionByUserId,
    getQuestionByQuestionId,
    setPlayQuestion,
    playQuestion,
    setQuestion
  };

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}
