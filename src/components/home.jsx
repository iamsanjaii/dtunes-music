import { useEffect, useState } from "react";

import { FaGreaterThan, FaLessThan, FaPlay } from "react-icons/fa";
import { collection, getDocs, doc } from "firebase/firestore";
import { txtDB } from "../Firebase/firebaseconfig";
import { db } from "../Firebase/firebaseconfig";
import { getAuth } from "firebase/auth";

// Update: Use public asset paths instead of imports
const anirudh = "/artists/Anirudh.jpeg";
const travis = "/artists/fein.jpeg";
const yuvan = "/artists/yuvan.jpeg";
const edsheeran = "/artists/Edsheeran.jpeg";
const dualipa = "/artists/levitating.jpeg";
const workut = "/artists/workout.jpeg";

const Home = () => {
  const [songDetails, setSongDetails] = useState([]);
  const [fav, setFav] = useState([]);
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songsinfo = collection(txtDB, "songInfo");
        const songsData = await getDocs(songsinfo);
        const allData = songsData.docs.map((val) => ({
          ...val.data(),
          id: val.id,
        }));
        setSongDetails(allData);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, []);

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
    <div>
      <div className="flex flex-col p-4">
        <p className="text-sm">This Week</p>
        <h2 className="font-bold text-2xl text-customRed">Last Played</h2>
        <div className="flex flex-row mt-2 space-x-4 overflow-x-scroll scrollbar-hide">
          {songDetails.map((song) => (
            <div key={song.id} className="flex-shrink-0 min-w-[120px] flex flex-col items-start  rounded bg-mono p-2">
              <img
                className="rounded"
                src={song.songCover}
                height="80px"
                width="110px"
                alt=""
              />
              <h2 className="text-white font-bold">{song.title}</h2>
              <p className="text-white text-sm">{song.author}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex px-4 py-2 space-x-10  ">
        <div className="flex flex-col w-[30%] space-y-2">
          <div>
            <p>Based on your Play Count</p>
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-2xl text-customRed">
                Your Top Artists
              </h1>
              <p>See all</p>
            </div>
            <div className="flex items-center mt-2 space-x-2 overflow-x-scroll text-sm cursor-pointer scrollbar-hide">
              <div className="flex min-w-[85px] text-white bg-mono p-1 rounded shadow-md flex-col">
                <img
                  className="rounded h-[70px] w-[80px]"
                  src={anirudh}
                  alt=""
                />
                <h2 className="font-semibold text-center">Anirudh</h2>
              </div>
              <div className="flex min-w-[85px] text-white bg-mono p-1 shadow-md rounded flex-col">
                <img
                  className="rounded h-[70px] w-[80px]"
                  src={travis}
                  alt=""
                />
                <h2 className="font-semibold text-center">Travis Scott</h2>
              </div>
              <div className="flex min-w-[85px] text-white bg-mono p-1 rounded shadow-md flex-col">
                <img
                  className="rounded h-[70px] w-[80px]"
                  src={dualipa}
                  alt=""
                />
                <h2 className="font-semibold  text-center">Dua lipa</h2>
              </div>
              <div className="flex min-w-[85px] text-white bg-mono p-1 rounded shadow-md flex-col">
                <img className="rounded h-[70px] w-[80px]" src={yuvan} alt="" />
                <h2 className="font-semibold text-center">Yuvan</h2>
              </div>
              <div className="flex min-w-[85px] text-white bg-mono p-1 rounded shadow-md flex-col">
                <img
                  className="rounded h-[70px] w-[80px]"
                  src={edsheeran}
                  alt=""
                />
                <h2 className="font-semibold text-center">Ed Sheeran</h2>
              </div>
            </div>
          </div>
          <div className="bg-mono p-2 rounded text-white space-y-1">
            <div className="flex items-center justify-between ">
              <h2 className="font-bold ">Moods</h2>
              <p>Checkout more moods</p>
            </div>
            <div className="flex items-center justify-between">
              <img
                className=" h-[70px] w-[120px] rounded"
                src={workut}
                alt=""
              />
              <div className="flex flex-col items-center justify-end">
                <div className="flex items-center justify-end">
                  <h2 className="text-white font-bold">Levitating</h2>
                </div>
                <div className="flex items-center justify-end">
                  <h2 className="text-white  font-bold">Believer</h2>
                </div>
                <div className="flex items-center justify-end">
                  <h2 className="text-white  font-bold">Believer</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-4 py-2 mt-4 space-y-1 w-[70%]">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl text-customRed">
              Favourite Albums
            </h1>
            <div className="flex space-x-3 cursor-pointer">
              <FaLessThan className="items-center text-customRed" />
              <FaGreaterThan className="items-center text-customRed" />
            </div>
          </div>
          <div className="flex items-center space-x-2 overflow-x-scroll scrollbar-hide w-[800px]">
            {fav.map((song) => (
              <div key={song.id || song.songCover} className="bg-mono p-3 rounded min-w-[210px] cursor-pointer">
                <img
                  className="rounded h-full w-[200px]"
                  src={song.songCover}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
