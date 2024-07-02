import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import questionApi from "../api/question";
import topicApi from "../api/topic";

export const QuestionContext = createContext();

export default function QuestionContextProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState([]);
  const [allTopic, setAllTopic] = useState([]);
  const [file, setFile] = useState(null);
  const [edit, setEdit] = useState(false);

  const getAllTopic = async () => {
    try {
      const fetchTopic = await topicApi.getAllTopic();
      console.log(fetchTopic.data.topics, "i am ironman");
      setAllTopic(fetchTopic.data.topics);
    } catch (err) {
      console.log(err);
    }
  };

  // const fetchQuestion = async () => {
  //   try {
  //     const Allquestion = await questionApi.getAllQuestion();
  //     setQuestion(Allquestion.data.questions);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    getAllTopic();
  }, []);

  const value = { open, setOpen, question, setQuestion, file, setFile, edit, setEdit, allTopic };
  return <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>;
}

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
