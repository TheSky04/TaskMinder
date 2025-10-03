import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/authService";
import { useEffect } from "react";

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

 const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
};

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await api.get("/auth/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        console.log("User Data:", response.data);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  const bellLogo = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth="1.5" stroke="currentColor" className="size-10">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 
        8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 
        8.967 0 0 1-2.312 6.022c1.733.64 
        3.56 1.085 5.455 1.31m5.714 0a24.255 
        24.255 0 0 1-5.714 0m5.714 
        0a3 3 0 1 1-5.714 0" />
    </svg>
  );

  const profilePhoto = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth="1.5" stroke="currentColor" className="size-10">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0 0 12 
        15.75a7.488 7.488 0 0 0-5.982 
        2.975m11.963 0a9 9 0 1 0-11.963 
        0m11.963 0A8.966 8.966 0 0 1 12 
        21a8.966 8.966 0 0 1-5.982-2.275M15 
        9.75a3 3 0 1 1-6 0 3 3 
        0 0 1 6 0Z" />
    </svg>
  );

  const chevronDownLogo = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );

  const searchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth="1.5" stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 
        0A7.5 7.5 0 1 0 5.196 5.196a7.5 
        7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );

  const logoutIcon = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
    </svg>
    );

  return (
    <div className="flex justify-between items-center p-14 pb-5 border-b border-gray-200 relative">
      {/* Sol kısım */}
      <div>
        <p className="text-black text-5xl font-bold pb-3">Hello, {user?.name}</p>
        <p className="text-gray-500 text-xl">Lets organize your Daily Tasks</p>
      </div>

      {/* Arama */}
      <div className="flex items-center gap-2 border border-gray-300 rounded-lg w-96 px-3 py-2 pl-2">
        <span>{searchIcon}</span>
        <input
          type="text"
          placeholder="Search"
          className="flex-grow outline-none"
        />
      </div>

      {/* Sağ kısım */}
      <div className="flex items-center gap-6 pr-10 relative">
        <span>{bellLogo}</span>
        <span>{profilePhoto}</span>
        <div>
          <p className="font-bold text-xl">{user?.name}</p>
          <p className="text-gray-500">{user?.role}</p>
        </div>
        <span onClick={() => setOpen(!open)}>{chevronDownLogo}</span>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-10 top-16 bg-white shadow-lg rounded-lg p-2 w-32">
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
