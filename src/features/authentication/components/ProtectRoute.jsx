import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/Spinner";

export default function ProtectRoute({ children }) {
  const { authUser, isAuthLoading } = useAuth();
  if (!authUser && !isAuthLoading) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {isAuthLoading && <Spinner />}
      {children}
    </>
  );
}
