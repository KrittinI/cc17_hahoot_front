import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import MainContainer from "../layouts/MainContainer";
import RegisterPage from "../pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <MainContainer />
      </>
    ),
    children: [
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
