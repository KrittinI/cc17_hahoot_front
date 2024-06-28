import { createContext } from "react";
export const AdminContext = createContext();

export default function AdminContextProvider({ children }) {
  const value = {};
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
