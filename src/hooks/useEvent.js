import { useContext } from "react";
import { EventContext } from "../contexts/EventContext";

export default function useEvent() {
  return useContext(EventContext);
}
