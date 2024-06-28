import { useContext } from "react";
import { QuestionContext } from "../contexts/QuestionContext";
export default function useQuestion() {
  return useContext(QuestionContext);
}
