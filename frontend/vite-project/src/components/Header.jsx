import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/userContext";
import {bellLogo, profilePhoto, chevronDownLogo, searchIcon, logoutIcon} from '../../icons/icons.jsx';

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { user: currentUser } = useContext(UserContext);

 const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
};

  return (
    <div className="flex justify-between items-center p-14 pb-5 border-b border-gray-200 relative">
      <div>
        <p className="text-black text-5xl font-bold pb-3">Hello, {currentUser?.name}</p>
        <p className="text-gray-500 text-xl">Lets organize your Daily Tasks</p>
      </div>

      <div className="flex items-center gap-2 border border-gray-300 rounded-lg w-96 px-3 py-2 pl-2">
        <span>{searchIcon}</span>
        <input
          type="text"
          placeholder="Search"
          className="flex-grow outline-none"
        />
      </div>

      <div className="flex items-center gap-6 pr-10 relative">
        <span>{bellLogo}</span>
        <span>{profilePhoto}</span>
        <div>
          <p className="font-bold text-xl">{currentUser?.name}</p>
          <p className="text-gray-500">{currentUser?.role}</p>
        </div>
        <span onClick={() => setOpen(!open)}>{chevronDownLogo}</span>

        {open && (
          <div className="z-20 absolute right-10 top-16 bg-white shadow-lg rounded-lg p-2 w-32">
            <button
              onClick={handleLogout}
              className="w-full text-left text-violet-500 hover:bg-gray-100 px-1 py-1 rounded"
            >
                <div className="flex gap-2 justify-center px-4 py-2">
                    <span>{logoutIcon}</span>
                    Logout
                </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
