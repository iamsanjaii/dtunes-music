import React from "react";
import { RiHome3Fill } from "react-icons/ri";
import { FaFire, FaHeart, FaPodcast, FaUserFriends } from "react-icons/fa";

import { MdTimelapse } from "react-icons/md";

import { PiPlaylistBold } from "react-icons/pi";
import { IoIosSettings } from "react-icons/io";
import { IoLibrary } from "react-icons/io5";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="w-[15%] h-full p-2 flex-col gap-2 text-[#ef623d] hidden lg:flex">
      <div className="bg-[#fff2f0] p-4 h-[100%] rounded flex flex-col  justify-start">
        <div className="Discover">
          <h1 className="font-bold">Discover</h1>
          <div className="py-2">
            <Link to="home">
              <div className="flex items-center gap-3 my-1">
                <RiHome3Fill />
                <p>Home</p>
              </div>
            </Link>

            <div className="flex items-center gap-3 my-1 cursor-pointer">
              <FaPodcast />
              <p>Podcast</p>
            </div>
            <Link to="friends">
              <div className="flex items-center gap-3 my-1 cursor-pointer">
                <FaUserFriends />
                <p>Friends</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="Playlist mt-5">
          <h1 className="font-bold">Playlist</h1>
          <div className="py-2">
            <div className="flex items-center gap-3 my-1">
              <IoLibrary />
              <p>Library</p>
            </div>
            <Link to="fav">
              <div className="flex items-center gap-3 my-1 cursor-pointer">
                <FaHeart />
                <p>Favourite</p>
              </div>
            </Link>
            <div className="flex items-center gap-3 my-1">
              <PiPlaylistBold />
              <p>Create New</p>
            </div>
          </div>
        </div>
        <div className="Playlist mt-5">
          <div className="flex items-center gap-3 my-1">
            <FaFire />
            <p>Trending</p>
          </div>
          <div className="flex items-center gap-3 my-1">
            <MdTimelapse />
            <p>Recently Played</p>
          </div>
          <div className="flex items-center gap-3 my-1">
            <IoIosSettings />
            <p>Setting</p>
          </div>
        </div>
        <div className="Playlist mt-5">
          <p className="font-normal">
            Check out what your Friends are Listening to
          </p>
          <button className="font-bold bg-customRed text-white mt-4 px-4 py-2 rounded-full">
            Friends Playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
