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

const router = createBrowserRouter([
  // user
  {
    path: "/",
    element: (
      <>
        <MainContainer />
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/users/:userId",
        element: <ProfilePage />,
      },
    ],
  },

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
        element: <LoginPage />,
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
        element: <AllQuizPage />,
      },
      {
        path: "/events",
        element: <AllEventPage />,
      },
      {
        path: "/pincode",
        element: <PinCodePage />
      }
    ],
  },

  // Admin
  {
    path: "/admin",
    element: (
      <>
        <MainContainer />
      </>
    ),
    children: [{ path: "/admin", element: <h1>admin</h1> }],
  },
]);
export default function Router() {
  return <RouterProvider router={router} />;
}


