import { useContext } from "react";
import { TopicContext } from "../contexts/TopicContext";

export default function useTopic() {
  return useContext(TopicContext);
}
