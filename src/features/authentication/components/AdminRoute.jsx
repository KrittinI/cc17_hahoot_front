import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/Spinner";

export default function AdminRoute({ children }) {
  const { authUser, isAuthLoading } = useAuth();

  if (!authUser?.isAdmin && !isAuthLoading) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {isAuthLoading && <Spinner />}
      {children}
    </>
  );
}
