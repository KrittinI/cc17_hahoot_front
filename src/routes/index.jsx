import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import MainContainer from "../layouts/MainContainer";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import QuizPage from "../pages/Quiz";
import MultiPlayerPage from "../pages/MultiPlayerPage";

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
    ],
  },
  {
    path: "/quiz",
    element: <QuizPage />,
  },
  {
    path: "/multiplayer",
    element: <MultiPlayerPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
