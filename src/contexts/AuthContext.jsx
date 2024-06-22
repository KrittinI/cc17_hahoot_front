import { createContext } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const value = {};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
