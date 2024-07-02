import { createContext } from "react";
import topicApi from "../api/topic";
import { useState } from "react";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

export const TopicContext = createContext();

export default function TopicContextProvider({ children }) {
  const [topic, setTopic] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    const getAllTopic = async () => {
      const res = await topicApi.getAllTopic();
      setTopic(res.data.topics);
    };
    getAllTopic();
  }, [authUser]);

  const value = { topic, setTopic };
  return (
    <TopicContext.Provider value={value}>{children}</TopicContext.Provider>
  );
}
