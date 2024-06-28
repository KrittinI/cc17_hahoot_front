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
        element: <h1>play</h1>,
      },
      {
        path: "/playgame/:eventId",
        element: <PlayGamePage />,
      },
      {
        path: "/pincode",
        element: <h1>pincode</h1>,
      },
      {
        path: "/questions",
        element: <AllQuizPage />,
      },
      {
        path: "/events",
        element: <AllEventPage />,
      },
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
