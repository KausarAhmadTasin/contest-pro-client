import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Read initial theme state from localStorage
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    // Apply the theme to the document
    document.documentElement.className = isDarkMode ? "dark" : "light";
    // Save the theme state to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogOut = () => {
    logOut().then(() => {
      toast.success("Signed Out!");
    });
  };

  // Swap control
  const swap = (
    <>
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={handleThemeToggle}
        />

        {/* sun icon */}
        <svg
          className="swap-on text-gray-200 mr-3 h-5 w-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>

        {/* moon icon */}
        <svg
          className="swap-off text-gray-200 mr-3 h-5 w-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>
    </>
  );

  const navLinksMain = (
    <>
      <ul>
        <Link to="/">
          <li
            className={`hover:bg-[#1f4769] rounded-md py-1 px-2 ${
              location.pathname === "/"
                ? "underline decoration-white decoration-2 outline-offset-4"
                : ""
            }`}
          >
            Home
          </li>
        </Link>
      </ul>
    </>
  );

  return (
    <div
      className={`navbar fixed z-40 flex justify-between bg-[#0c243b] text-white w-full transition-transform duration-300`}
    >
      <div className="">
        <a className="btn btn-ghost text-xl">ContestPro</a>
      </div>
      <div className="flex-gorw">{navLinksMain}</div>
      <div className="flex-none">
        {swap}
        {user?.photoURL && (
          <>
            <Popover className="relative z-50">
              <PopoverButton className="flex mr-4 gap-x-2 items-center text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
                <img
                  className="h-9 w-9 rounded-full"
                  src={user.photoURL}
                  alt=""
                />
              </PopoverButton>
              <PopoverPanel
                anchor="bottom"
                className="flex mt-3 bg-black/80 py-5 px-5 w-1/6 text-center flex-col divide-y divide-white/5 rounded-xl text-sm/6 transition duration-200 ease-in-out"
              >
                <p className="block rounded-lg py-2 px-3 transition font-semibold text-gray-100">
                  {user && user?.displayName}
                </p>
                <Link>
                  <p className="block rounded-lg py-2 px-3 text-gray-200 my-2 transition hover:bg-white/5">
                    Dashboard
                  </p>
                </Link>

                <p
                  onClick={handleLogOut}
                  className="rounded-lg py-2 px-3 transition bg-gray-800 text-rose-500 btn hover:bg-white/5"
                >
                  Logout
                </p>
              </PopoverPanel>
            </Popover>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
