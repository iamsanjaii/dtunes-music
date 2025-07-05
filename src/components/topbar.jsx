import React from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { Link } from "react-router-dom";
const Topbar = ({ userDetails, logout }) => {
  return (
    <div className="flex bg-customPink items-center  justify-between  px-4 py-2">
      <div className=" flex items-center space-x-2">
        <img src="/logo.png" alt="" height="30px" width="30px" />
        <h1 className="font-bold text-customRed">Dtunes</h1>
      </div>
      <div className="flex  px-4 rounded-full items-center border border-customRed border-2  gap-2">
        <FaSearch className="text-customRed" />
        <input
          className="px-4 py-1 outline-none text-mono bg-customPink text-center rounded-full"
          type="text"
          placeholder="Search Music"
        />
      </div>
      <div className="flex items-center space-x-3">
        <IoNotifications className="text-customRed text-2xl mx-2" />
        <Link to="/admin">
          <FaUserGraduate className="text-customRed text-xl mx-2 cursor-pointer" />
        </Link>
        <div className="w-[30px] h-[30px] bg-white rounded-full border border-customRed border-[2px]">
          <img src="/avatar.svg" alt="" height="30px" width="30px" />
        </div>
        <h2 className="font-bold text-xl mx-2">{userDetails.name}</h2>
        <FaSignOutAlt
          className="text-customRed text-2xl mx-2 cursor-pointer"
          onClick={logout}
        />
      </div>
    </div>
  );
};

export default Topbar;
