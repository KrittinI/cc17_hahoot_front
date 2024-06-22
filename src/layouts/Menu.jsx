import { useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";

const menuList = [
  { id: 1, name: "My Profile", to: "/" },
  { id: 2, name: "My Event", to: "/" },
  { id: 3, name: "My Quiz", to: "/" },
  { id: 4, name: "Logout", to: "/" },
];

export default function Menu() {
  const { pathname } = useLocation();
  return (
    <div className="flex">
      {menuList.map((menu) => (
        <MenuItem
          key={menu.id}
          name={menu.name}
          to={menu.to}
          active={pathname === menu.to}
        />
      ))}
    </div>
  );
}
