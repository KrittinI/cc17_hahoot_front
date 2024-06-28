import { createContext } from "react";
import topicApi from "../api/topic";
import { useState } from "react";
import { useEffect } from "react";

export const TopicContext = createContext();

export default function TopicContextProvider({ children }) {
  const [topic, setTopic] = useState([]);
  useEffect(() => {
    const getAllTopic = async () => {
      const res = await topicApi.getAllTopic();
      setTopic(res.data.topics);
    };
    getAllTopic();
  }, []);

  const value = { topic, setTopic };
  return (
    <TopicContext.Provider value={value}>{children}</TopicContext.Provider>
  );
}
