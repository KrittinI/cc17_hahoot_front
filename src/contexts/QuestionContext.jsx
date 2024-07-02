import { createContext } from "react";
import questionApi from "../api/question";
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
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [allTopic, setAllTopic] = useState([]);
  const [file, setFile] = useState(null);
  const [edit, setEdit] = useState(false);

  const getAllQuestion = async () => {
    const res = await questionApi.getAllQuestion();
    setQuestion(res.data.questions);
  };

  const getQuestionByUserId = async (id) =>
    await questionApi.getQuestionByUserId(id);

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
    await questionApi.create(body);
  };

  const editQuestion = async (id, body) => {
    await questionApi.edit(id, body);
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
    open, setOpen, questions, setQuestions, file, setFile, edit, setEdit, allTopic
  };


  const getAllTopic = async () => {
    try {
      const fetchTopic = await topicApi.getAllTopic();
      console.log(fetchTopic.data.topics, "i am ironman");
      setAllTopic(fetchTopic.data.topics);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTopic();
  }, []);

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}

import topicApi from "../api/topic";



// const mockQuestion = [
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
// ];
