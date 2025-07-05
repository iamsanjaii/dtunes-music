import React, { useState } from "react";
import { songDB, txtDB } from "../Firebase/firebaseconfig";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [songURL, setSongURL] = useState("");
  const [songCover, setsongCover] = useState("");
  const [language, setLanguage] = useState("");

  const handleSongUpload = async (e) => {
    const songFile = e.target.files[0];
    const songRef = ref(songDB, `Songs/${v4()}`);

    try {
      const snapshot = await uploadBytes(songRef, songFile);
      const url = await getDownloadURL(snapshot.ref);
      setSongURL(url);

      console.log(url);
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };
  const handleCoverUpload = async (e) => {
    const songCover = e.target.files[0];
    const coverRef = ref(songDB, `Covers/${v4()}`);

    try {
      const snapshot = await uploadBytes(coverRef, songCover);
      const url = await getDownloadURL(snapshot.ref);
      setsongCover(url);

      console.log(url);
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!songURL) {
      alert("Please upload a song first.");
      return;
    }

    try {
      const songInfoRef = collection(txtDB, "songInfo");
      await addDoc(songInfoRef, {
        title,
        author,
        songURL,
        language,
        songCover,
      });
      alert("Data Added Successfully");
      setTitle("");
      setAuthor("");
      setLanguage("");
      setSongURL("");
      setsongCover("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="h-screen bg-[#fffaf7] flex flex-col items-center justify-center space-y-4">
      <h2 className="font-bold text-3xl text-customRed">Admin Panel</h2>
      <div className="flex flex-col justify-evenly items-center rounded-md bg-custom-gradient h-[50%] w-[40%] shadow-lg">
        <h2 className="text-xl text-white font-bold">Upload Songs Here</h2>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            <div className="h-[50px] w-[50px] flex border border-white border-[2px] shadow-lg rounded-md items-center justify-center">
              {songCover ? (
                <img
                  src={songCover}
                  height="50px"
                  width="50px"
                  className="rounded-md object-cover"
                />
              ) : (
                <img src="/default.png" height="50px" width="50px" />
              )}
            </div>
            <div className="flex items-center">
              <label className="flex items-center px-2 py-1 bg-mono text-white rounded cursor-pointer hover:bg-blue-700">
                Album Cover
                <input
                  type="file"
                  className="hidden"
                  onChange={handleCoverUpload}
                />
              </label>
              <span className="ml-3 text-white">
                {songCover ? "File uploaded successfully" : "No file chosen"}
              </span>
            </div>
          </div>
          <input
            placeholder="Song Title"
            type="text"
            className="w-[300px] rounded-sm p-1 outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Artist Name"
            type="text"
            className="w-[300px] rounded-sm p-1 outline-none"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            placeholder="Language"
            type="text"
            className="w-[300px] rounded-sm p-1 outline-none"
            onChange={(e) => setLanguage(e.target.value)}
          />
          <div className="flex items-center">
            <label className="flex items-center px-2 py-1 bg-mono text-white rounded cursor-pointer hover:bg-blue-700">
              Choose Audio
              <input
                type="file"
                className="hidden"
                onChange={handleSongUpload}
              />
            </label>
            <span className="ml-3 text-white">
              {songURL ? "File uploaded successfully" : "No file chosen"}
            </span>
          </div>

          <button
            type="submit"
            className="text-white border border-white w-[40%] rounded-sm shadow-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
