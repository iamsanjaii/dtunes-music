import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase/firebaseconfig";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: name,
        });
      }
      alert("User Registered Successfully");
      console.log("User Registered Successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-customPink p-4">
      <div className="flex flex-col md:flex-row items-center justify-between bg-white w-full max-w-4xl h-auto md:h-[500px] rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col justify-center bg-custom-gradient items-center w-full md:w-[45%] px-4 py-10 md:py-0 h-full space-y-4 text-center">
          <h1 className="text-3xl font-bold text-white">Hello, Friend!</h1>
          <p className="text-lg text-white px-4">
            Already have an account? Click here to login
          </p>
          <Link
            to="/"
            className="text-white text-lg px-6 py-1 border-2 border-white rounded-md"
          >
            Login
          </Link>
        </div>
        <div className="flex flex-col items-center space-y-4 justify-center w-full md:w-[55%] p-6 md:p-10">
          <img
            src="src/assets/logo.png"
            alt=""
            className="w-24 h-24 md:w-28 md:h-28"
          />
          <h1 className="font-bold text-3xl text-black">Create Account</h1>
          <form
            onSubmit={handleRegister}
            className="flex flex-col space-y-3 w-full md:w-[70%]"
          >
            <input
              placeholder="Enter your Name"
              type="text"
              className="px-4 py-2 border border-customRed rounded outline-none"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Enter your Email"
              type="email"
              className="px-4 py-2 border border-customRed rounded outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Enter your Password"
              type="password"
              className="px-4 py-2 border border-customRed rounded outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="mx-10 py-1 bg-customRed text-white text-xl rounded-md">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
