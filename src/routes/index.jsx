import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([])

export default function Router() {
    return (
        <RouterProvider router={router} />
    )
}