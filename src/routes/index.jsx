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
        path: "/users/:userId",
        element: <ProfilePage />,
      },
      {
        path: "/playgame",
        element: <PlayGamePage />,
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
]);
export default function Router() {
  return <RouterProvider router={router} />;
}
