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
import EventPage from "../pages/EventPage";
import CreateQuestionPage from "../pages/CreateQuestionPage";
import QuestionPage from "../pages/QuestionPage";
import MyAllEventPage from "../pages/MyAllEventPage";
import MyAllQuizPage from "../pages/MyAllQuizPage";
import MyFavoritePage from "../pages/MyFavoritePage";

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
        path: "/questions/create-question",
        element: <CreateQuestionPage />,
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
        path: "/events/create-event",
        element: (
          <ProtectRoute>
            <h1>Create Event Page</h1>
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
      {
        path: "/events/:userId",
        element: (
          <ProtectRoute>
            <MyAllEventPage />,
          </ProtectRoute>
        ),
      },
      {
        path: "/questions/:userId",
        element: (
          <ProtectRoute>
            <MyAllQuizPage />
          </ProtectRoute>
        ),
      },
      {
        path: "/myfavorite/:userId",
        element: (
          <ProtectRoute>
            <MyFavoritePage />
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
