import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseconfig";
import { AiFillDelete } from "react-icons/ai";
import defMusic from "../assets/default.png";

const Favourites = () => {
  const [fav, setFav] = useState([]);
  const [totalsongs, setTotalsongs] = useState(null);

  const deleteFav = async (songId) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return alert("No user is logged in.");

    try {
      const songRef = doc(db, "Users", user.uid, "likedsongs", songId);
      await deleteDoc(songRef);
      setFav((prevFav) => prevFav.filter((song) => song.id !== songId));
      alert("Song Removed Successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchFavsongs = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(db, "Users", user.uid);
          const favRef = collection(userRef, "likedsongs");
          const querySnapshot = await getDocs(favRef);

          if (!querySnapshot.empty) {
            const unique = Array.from(
              new Map(
                querySnapshot.docs.map((doc) => [doc.id, doc.data()])
              ).values()
            );
            setFav(unique);
            setTotalsongs(querySnapshot.size);
          } else {
            console.log("No Data found");
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchFavsongs();
  });
  return (
    <div className="flex p-5 h-[90%] justify-between">
      <div className="h-full  flex flex-col space-y-4 p-3 items-center bg-mono rounded-md w-[48%]">
        <h2 className="font-bold text-3xl text-white">Favourites</h2>
        <div className="flex flex-col w-[100%] p-3 space-y-2 overflow-y-scroll scrollbar-hide">
          {fav.map((song) => (
            <div
              key={song.id}
              className="flex items-center p-2 rounded-md justify-between bg-opacity-30 backdrop-filter backdrop-blur-lg bg-customRed"
            >
              <div className="flex space-x-2">
                {song.songCover ? (
                  <img
                    src={song.songCover}
                    height="50px"
                    width="50px"
                    alt=""
                    className="rounded"
                  />
                ) : (
                  <img
                    src="src/assets/default.png"
                    height="50px"
                    width="50px"
                    alt=""
                    className="rounded"
                  />
                )}
                <div className="flex flex-col justify-start text-white ">
                  <h2 className="font-bold">{song.title}</h2>
                  <p className="text-sm">{song.author}</p>
                </div>
              </div>
              <div className="flex space-x-3 items-center">
                <AiFillDelete
                  className="text-2xl text-white cursor-pointer"
                  onClick={() => deleteFav(song.songId)}
                />
                <FaPlay className="text-xl text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-full flex flex-col p-3 items-center bg-mono rounded-md w-[48%] space-y-4">
        <h2 className="font-bold text-3xl text-white">Your Playlist</h2>
        <div className="flex flex-col w-full space-y-3 items-center">
          <div className="w-full h-[40px] bg-white rounded-md flex items-center px-3 justify-evenly">
            <h2>Playlist</h2>
            <h2>Total Songs:</h2>
            <p>Duration:</p>
          </div>
          <div className="flex items-center space-x-10 text-white ">
            <div className="flex items-center space-x-3">
              <img
                src={defMusic}
                height="40px"
                width="40px"
                className="rounded-md"
              />
              <h2 className="font-bold">Fav Songs</h2>
            </div>
            <h2>{totalsongs} Songs</h2>
            <h2>NA</h2>
          </div>
          <button className="w-[40%] h-[40px] font-md text-lg text-white bg-customRed rounded-full">
            Create a playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
