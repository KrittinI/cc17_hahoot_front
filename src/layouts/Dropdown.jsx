import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

// import useAuth from "../hooks/useAuth";

export function Dropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { authUser, logout } = useAuth();

  const handleClickLogout = () => {
    setOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <div
      role="button"
      className="relative px-8 py-2 "
      onClick={() => setOpen((prev) => !prev)}
    >
      <Avatar src={authUser?.profileImage} />
      {open && (
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

// *************************  Profile Dropdown  ***************************

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ProfileDropdown() {
  // const {authUser} = useAuth();
  return (
    <>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {/* <button
                  type="button"
                  className="relative bg-black text-white py-[2px] px-[20px] rounded-md hover:bg-blue active:bg-darkblue "
                >
                  <span className="absolute -inset-1.5" />
                  <span className="text-font-btn" aria-hidden="true">
                    Play 
                  </span>
                </button> */}

        {/* Profile dropdown */}

        {/* <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Avatar />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      {({ focus }) => (
                        <a
                          href="#"
                          className={classNames(
                            focus ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Login
                        </a>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu> */}
        {/* : */}
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <Avatar />
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <MenuItem>
              {({ focus }) => (
                <Link
                  to={""}
                  className={classNames(
                    focus ? "bg-blue text-white" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Your Profile
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <a
                  href="#"
                  className={classNames(
                    focus ? "bg-blue text-white" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Your Event
                </a>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <a
                  href="#"
                  className={classNames(
                    focus ? "bg-blue text-white" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Your Quiz
                </a>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <a
                  href="#"
                  className={classNames(
                    focus ? "bg-blue text-white" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Logout
                </a>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </>
  );
}
