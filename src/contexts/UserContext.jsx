import { createContext } from "react";
import userApi from "../api/user";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import useQuestion from "../hooks/useQuestion";
import useEvent from "../hooks/useEvent";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const { userId } = useParams();
  const { getQuestionByUserId } = useQuestion();
  const { getEventByUserId } = useEvent();
  const [profile, setProfile] = useState(null);
  const [question, setQuestion] = useState([]);
  const [event, setEvent] = useState([]);

  const updateProfileUser = async (body) => {
    await userApi.update(body);
  };

  const fetchUser = async () => {
    const res = await userApi.getUser(+userId);
    setProfile(res.data);
  };

  const fetchAllQuestion = async () => {
    const res = await getQuestionByUserId(+userId);
    setQuestion(res);
  };

  const fetchAllEvent = async () => {
    const res = await getEventByUserId(+userId);
    setEvent(res);
  };

  useEffect(() => {
    fetchUser();
    fetchAllEvent();
    fetchAllQuestion();
  }, []);

  const value = { updateProfileUser, profile, question, event };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
