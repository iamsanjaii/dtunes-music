import React from "react";
import { auth } from "../Firebase/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("User Logged in Successfully");
      console.log("User logged in Successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-customPink p-4">
      <div className="flex flex-col md:flex-row items-center justify-between bg-white w-full max-w-4xl h-auto md:h-[500px] rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col items-center space-y-4 justify-center w-full md:w-[55%] p-6 md:p-10">
          <img
            src="src/assets/logo.png"
            alt=""
            className="w-24 h-24 md:w-28 md:h-28"
          />
          <h1 className="font-bold text-3xl text-black">Sign In</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-3 w-full md:w-[70%]"
          >
            <input
              placeholder="Email"
              type="email"
              className="px-4 py-2 border border-customRed rounded outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              className="px-4 py-2 border border-customRed rounded outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <h3 className="text-gray-500">Forgot your Password?</h3>
            <button className="px-10 py-1 bg-customRed text-white text-xl rounded-md">
              Login
            </button>
          </form>
        </div>
        <div className="flex flex-col justify-center bg-custom-gradient items-center w-full md:w-[45%] px-4 py-10 md:py-0 h-full space-y-4 text-center">
          <h1 className="text-3xl font-bold text-white">Hello, Friend!</h1>
          <p className="text-lg text-white px-4">
            Register with your personal details to use all of our site's
            features
          </p>
          <Link
            to="/register"
            className="text-white text-lg px-4 py-1 border-2 border-white rounded-md"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
