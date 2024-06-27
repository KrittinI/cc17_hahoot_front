import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect } from "react";

export function Dropdown() {
  const [openD, setOpenD] = useState(false);
  const navigate = useNavigate();

  const { authUser, logout } = useAuth();

  const handleClickLogout = () => {
    setOpenD(false);
    logout();
    navigate("/login");
  };

  return (
    <div
      role="button"
      className="relative px-8 py-2 "
      onClick={() => setOpenD((prev) => !prev)}
    >
      <Avatar src={authUser?.profileImage} />
      {openD && (
        <div className="absolute bg-white right-8 translate-y-2 p-2 w-24 rounded-xl shadow flex flex-col justify-center items-center gap-2">
          {authUser ? (
            <>
              <Link
                to={`/users/${authUser.id}`}
                className="w-full text-center rounded-lg hover:bg-blue-50"
              >
                Profile
              </Link>
              <div
                className="w-full text-center rounded-lg hover:bg-blue-50"
                onClick={handleClickLogout}
              >
                Log out
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="w-full text-center rounded-lg hover:bg-blue-50"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const notLoginMap = [
  { title: "Register", to: "/register", name: "register" },
  { title: "Log in", to: "/login", name: "login" },
]

const adminMap = [
  { title: "Admin", to: "/admin", name: "admin" },
  { title: "Admin Quiz", to: "/your-quiz", name: "admin-quiz" },
  { title: "Admin Event", to: "/your-event", name: "admin-event" },
  { title: "Log out", to: "/login", name: "logout" },
]

// *************************  Profile Dropdown  ***************************

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ProfileDropdown() {
  const { authUser, logout } = useAuth();
  const [menuMap, setMenuMap] = useState([])
  const navigate = useNavigate();

  const userMap = [
    { title: "Your Profile", to: `/users/${authUser?.id}`, name: "your-profile" },
    { title: "Your Quiz", to: "/your-quiz", name: "your-quiz" },
    { title: "Your Event", to: "/your-event", name: "your-event" },
    { title: "Log out", to: "/login", name: "logout" },
  ]

  useEffect(() => {
    if (!authUser) {
      setMenuMap(notLoginMap)
    } else {
      if (authUser?.isAdmin) {
        setMenuMap(adminMap)
      } else {
        setMenuMap(userMap)
      }
    }
  }, [authUser])

  const handleClickMenu = (menu) => {
    if (menu.name === "logout") {
      console.log("logout");
      logout();
      navigate(menu.to);
    }
    if (menu.title === "your-profile") {
      navigate(menu.to + `/${authUser?.id}`)
    }
    navigate(menu.to)
  };

  return (
    <>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <Avatar src={authUser?.gooleImage || authUser?.profileImage} />
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            {
              menuMap.map((item, index) => (
                <div key={index}>
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        onClick={() => handleClickMenu(item)}
                        className={classNames(
                          focus ? "bg-blue text-white w-full text-left" : "",
                          "block px-4 py-2 text-sm text-gray-700 w-full text-left rounded-lg"
                        )}
                      >
                        {item.title}
                      </button>
                    )}
                  </MenuItem>
                </div>
              ))
            }
          </MenuItems>
        </Menu>
      </div>
    </>
  );
}
