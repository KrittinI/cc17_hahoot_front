import { createContext } from "react";
import userApi from "../api/user";
export const UserContext = createContext();
export default function UserContextProvider({ children }) {
  const getUser = async (userId) => {
    const getUserByUserId = await userApi.getUser(userId);
    return getUserByUserId.data;
  };

  const updateProfileUser = async (body) => {
    await userApi.update(body);
  };

  const value = { getUser, updateProfileUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
