import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";



export default function MainContainer() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}
