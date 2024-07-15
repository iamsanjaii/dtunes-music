import React from "react";

import Player from "./player";
// import Home from "./home";
// import Favourites from "./favourites";
// import { Route, Routes } from "react-router-dom";

const Dashboard = ({ children }) => {
  return (
    <div className="w-[85%] my-2 mx-1 rounded bg-customPink space-y-2">
      {children}
      <div className="fixed bottom-0  w-[85%]">
        <Player />
      </div>
    </div>
  );
};

export default Dashboard;
