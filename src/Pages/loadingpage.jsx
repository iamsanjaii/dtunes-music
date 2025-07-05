import React from "react";
const Loadingpage = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <img src="/logo.png" height="200px" width="200px" alt="" />
        <h2 className="font-bold text-customRed text-2xl">Please Wait</h2>
      </div>
    </div>
  );
};

export default Loadingpage;
