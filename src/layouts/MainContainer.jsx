import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function MainContainer() {
  return (
    <div className="h-[calc(100vh-10rem)]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
