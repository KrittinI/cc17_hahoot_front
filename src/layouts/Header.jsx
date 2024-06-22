import { Link } from "react-router-dom";
import Menu from "./Menu";
import Dropdown from "./Dropdown";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-2 shadow bg-purple-300 sticky top-0 z-50">
      <div className="hover:bg-blue-50 rounded-lg px-4 py-2">
        <Link to="/">
          <h1 className="text-3xl font-serif font-bold">Let&apos;s Join</h1>
        </Link>
      </div>
      <div className="flex items-center">
        <Menu />
        {/* <Dropdown /> */}
      </div>
    </div>
  );
}
