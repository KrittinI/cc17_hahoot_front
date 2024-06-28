import { useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";

export default function useAuth() {
  return useContext(AdminContext);
}
