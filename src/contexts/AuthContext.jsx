import { createContext } from "react";
import authApi from "../api/auth";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "../utils/loacl-storage";
import { useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (getAccessToken()) {
          const resGetAuthUser = await authApi.getAuthUser();
          setAuthUser(resGetAuthUser.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const login = async (body) => {
    const res = await authApi.login(body);
    setAccessToken(res.data.accessToken);

    const resGetAuthUser = await authApi.getAuthUser();
    setAuthUser(resGetAuthUser.data.user);
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  const value = {
    login,
    logout,
    authUser,
    setAuthUser
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
