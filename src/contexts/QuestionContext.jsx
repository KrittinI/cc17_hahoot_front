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
  const [playQuestion, setPlayQuestion] = useState([]);

  const [quizTopic, setQuizTopic] = useState([]);
  const [seeAll, setSeeAll] = useState(true);
  const [search, setSearch] = useState("");

  const getAllQuestion = async () => {
    const res = await questionApi.getAllQuestion();
    setQuestion(res.data.questions);
    setShowQuestion(res.data.questions);
  };

  const getQuestionByUserId = async (id) => await questionApi.getQuestionByUserId(id);

  const getQuestionByQuestionId = async (id) => {
    const res = await questionApi.getQuestionByQuestionId(id);
    return res.data.question;
  };

  const getQuestionByTopicId = async (topicId) => {
    const res = await questionApi.getQuestionByTopicId(topicId);
    setQuizTopic(res.data.questions);
  };

  const getFavQuestion = async (id) => {
    const res = await questionApi.getFavQuestion(id);
    return res.data.questions;
  };

  const createQuestion = async (body) => {
    await questionApi.createQuestion(body);
  };

  const editQuestion = async (id, body) => {
    await questionApi.editQuestionById(id, body);
  };

  const isSeeAll = () => {
    if (seeAll) {
      if (search) {
        setShowQuestion(question?.filter((el) => el.question.toLowerCase().includes(search)));
      } else {
        setShowQuestion(question);
      }
    } else {
      if (search) {
        setShowQuestion(quizTopic?.filter((el) => el.question.toLowerCase().includes(search)));
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
    showQuestion,
    setShowQuestion,
    getQuestionByTopicId,
    getQuestionByUserId,
    getQuestionByQuestionId,
    setPlayQuestion,
    playQuestion,
    getFavQuestion,
    createQuestion,
    editQuestion,
    isSeeAll,
    quizTopic,
    setSearch,
    setSeeAll,
  };

  return <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>;
}
