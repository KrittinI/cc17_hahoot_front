import { useContext } from "react";
import { TopicContext } from "../contexts/TopicContext";

export default function useUser() {
  return useContext(TopicContext);
}
