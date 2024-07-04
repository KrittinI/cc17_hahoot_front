import { createContext } from "react";
import userApi from "../api/user";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const updateProfileUser = async (body) => {
    await userApi.update(body);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userApi.getUser(+userId);
      setProfile(res.data);
    };
    fetchUser()
  }, [userId]);

  const value = { updateProfileUser, profile, setProfile };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
