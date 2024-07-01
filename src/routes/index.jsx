import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import MainContainer from "../layouts/MainContainer";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import PlayGamePage from "../pages/PlaygamePage";
import AllQuizPage from "../pages/AllQuizPage";
import AllEventPage from "../pages/AllEventPage";
import PlayPage from "../pages/PlayPage";
import PinCodePage from "../pages/PinCodePage";
import RedirectLogin from "../features/authentication/components/RedirecLogin";
import ProtectRoute from "../features/authentication/components/ProtectRoute";
import AdminRoute from "../features/authentication/components/AdminRoute";
import QuestionPage from "../pages/QuestionPage";
import EventPage from "../pages/EventPage";

const router = createBrowserRouter([
  // visitor + User
  {
    path: "/",
    element: (
      <>
        <MainContainer />
      </>
    ),
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: (
          <RedirectLogin>
            <LoginPage />
          </RedirectLogin>
        ),
      },
      {
        path: "/play/:eventId",
        element: <PlayPage />,
      },
      {
        path: "/playgame/:eventId",
        element: <PlayGamePage />,
      },
      {
        path: "/pincode",
        element: <PinCodePage />,
      },
      {
        path: "/questions",
        element: (
          <ProtectRoute>
            <AllQuizPage />,
          </ProtectRoute>
        ),
      },
      {
        path: "/questions/:questionId",
        element: (
          <ProtectRoute>
            <QuestionPage />,
          </ProtectRoute>
        ),
      },
      {
        path: "/events",
        element: (
          <ProtectRoute>
            <AllEventPage />,
          </ProtectRoute>
        ),
      },
      {
        path: "/events/:eventId",
        element: (
          <ProtectRoute>
            <EventPage />,
          </ProtectRoute>
        ),
      },
      {
        path: "/pincode",
        element: <PinCodePage />,
      },
      {
        path: "/users/:userId",
        element: (
          <ProtectRoute>
            <ProfilePage />,
          </ProtectRoute>
        ),
      },
    ],
  },

  // Admin
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <MainContainer />
      </AdminRoute>
    ),
    children: [{ path: "/admin", element: <h1>admin</h1> }],
  },
]);
export default function Router() {
  return <RouterProvider router={router} />;
}
