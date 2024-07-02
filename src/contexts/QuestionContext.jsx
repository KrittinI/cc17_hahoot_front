import { createContext } from "react";
import authQuestion from "../api/question";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export const QuestionContext = createContext();

export default function QuestionContextProvider({ children }) {
  const [question, setQuestion] = useState([]);
  const [quizTopic, setQuizTopic] = useState([]);
  const [seeAll, setSeeAll] = useState(true);
  const [search, setSearch] = useState("");
  const [showQuestion, setShowQuestion] = useState([]);
  const { authUser } = useAuth();

  const getAllQuestion = async () => {
    const res = await authQuestion.getAllQuestion();
    setQuestion(res.data.questions);
  };

  const getQuestionByUserId = async (id) =>
    await authQuestion.getQuestionByUserId(id);

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

  const isSeeAll = () => {
    if (seeAll) {
      if (search) {
        setShowQuestion(
          question?.filter((el) => el.question.toLowerCase().includes(search))
        );
      } else {
        setShowQuestion(question);
      }
    } else {
      if (search) {
        setShowQuestion(
          quizTopic?.filter((el) => el.question.toLowerCase().includes(search))
        );
      } else {
        setShowQuestion(quizTopic);
      }
    }
  };

  useEffect(() => {
    getAllQuestion();
  }, [authUser]);

  useEffect(() => {
    isSeeAll();
  }, [seeAll, question, quizTopic, search]);

  const value = {
    question,
    quizTopic,
    showQuestion,
    setSearch,
    setSeeAll,
    setShowQuestion,
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
