import { createContext } from "react";
import userApi from "../api/user";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {

  const { userId } = useParams()
  const [profile, setProfile] = useState(null)

  const getUser = async (userId) => {
    const getUserByUserId = await userApi.getUser(userId);
    return getUserByUserId.data;
  };

  const updateProfileUser = async (body) => {
    await userApi.update(body);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser(+userId)
      setProfile(res)
    }
    fetchUser()
  }, [userId])



  const value = { getUser, updateProfileUser, profile, setProfile };

  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>;
}
