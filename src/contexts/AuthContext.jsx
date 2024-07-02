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
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (getAccessToken()) {
          const resGetAuthUser = await authApi.getAuthUser();
          setAuthUser(resGetAuthUser.data.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsAuthLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (body) => {
    const res = await authApi.login(body);
    if (res.status !== 200) {
      return res.data.message;
    }

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
    setAuthUser,
    isAuthLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
