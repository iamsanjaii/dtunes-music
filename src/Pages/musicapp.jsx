import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import Dashboard from "../components/dashboard";
import { auth, db } from "../Firebase/firebaseconfig";
import { doc, getDoc } from "firebase/firestore";
import Loadingpage from "./loadingpage";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../components/home";
import Favourites from "../components/favourites";
import Friends from "./friends";

const Musicapp = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            console.log(userDetails);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      } else {
        console.log("No user is signed in.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/";
      console.log("User Logged out Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return <Loadingpage />;
  }

  return (
    <div className="h-screen bg-[#fffaf7]">
      {userDetails ? (
        <div className="h-screen bg-[#fffaf7]">
          <Topbar userDetails={userDetails} logout={logout} />
          <div className="h-[92%] flex flex-row w-screen">
            <Sidebar />
            <Dashboard>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="fav" element={<Favourites />} />
                <Route path="friends" element={<Friends />} />
              </Routes>
            </Dashboard>
          </div>
        </div>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default Musicapp;
