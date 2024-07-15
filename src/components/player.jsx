import React, { useState, useRef, useEffect } from "react";
import { RiPlayListLine } from "react-icons/ri";
import { FaHeart, FaPause, FaPlay } from "react-icons/fa";
import { GiPreviousButton, GiNextButton } from "react-icons/gi";
import { HiSpeakerWave } from "react-icons/hi2";
import { TiArrowLoop } from "react-icons/ti";
import { FaShuffle, FaRegHeart } from "react-icons/fa6";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { txtDB, db } from "../Firebase/firebaseconfig";
import { getAuth } from "firebase/auth";

const Player = () => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState({});
  const [liked, setLiked] = useState(null);
  const audioElem = useRef();
  const clickRef = useRef();

  const formatTimer = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    const fetchSongs = async () => {
      const songInfo = collection(txtDB, "songInfo");
      const dataDb = await getDocs(songInfo);
      const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
      setSongs(allData);
      if (allData.length > 0) {
        setCurrentSong(allData[0]);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    const fetchLikedStatus = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          const likedSongsRef = collection(db, "Users", user.uid, "likedsongs");
          const q = query(likedSongsRef, where("songId", "==", currentSong.id));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            setLiked(true);
            console.log("This song is liked");
          } else {
            setLiked(false);
            console.log("This song is not liked");
          }
        } catch (error) {
          console.error("Error fetching liked status:", error.message);
        }
      }
    };

    if (currentSong.id) {
      fetchLikedStatus();
    }
  }, [currentSong]);

  const LikedUnliked = async (e) => {
    e.preventDefault();
    const newliked = !liked;
    setLiked(newliked);

    if (newliked) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const userlikedsongs = collection(db, "Users", uid, "likedsongs");
          await addDoc(userlikedsongs, {
            ...currentSong,
            songId: currentSong.id,
          });
          alert("Added to Liked songs");
        } else {
          alert("User in not Signed in");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const PlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const handleEnded = () => {
      clickNext();
    };

    const audioElement = audioElem.current;
    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;
    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      length: duration,
    });
  };

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divProgress = (offset / width) * 100;
    audioElem.current.currentTime = (divProgress / 100) * currentSong.length;
  };

  const clickPrev = () => {
    const index = songs.findIndex((x) => x.title === currentSong.title);
    if (index === 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    audioElem.current.currentTime = 0;
    setIsPlaying(true);
    resetProgress();
  };

  const clickNext = () => {
    const index = songs.findIndex((x) => x.title === currentSong.title);
    if (index === songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    audioElem.current.currentTime = 0;
    resetProgress();

    if (audioElem.current.readyState >= 3) {
      audioElem.current.play();
    } else {
      audioElem.current.addEventListener(
        "canplay",
        () => {
          audioElem.current.play();
        },
        { once: true }
      );
    }
  };

  const resetProgress = () => {
    setCurrentSong((prevState) => ({
      ...prevState,
      progress: 0,
    }));
  };

  return (
    <div>
      <audio
        src={currentSong?.songURL}
        ref={audioElem}
        onTimeUpdate={onPlaying}
      />
      <div className="flex p-4 bottom-0 left-0 w-full items-center shadow-xl justify-between backdrop-blur-md">
        <div className="flex space-x-2 items-center">
          <img
            className="rounded shadow-lg"
            src={
              currentSong.songCover
                ? currentSong.songCover
                : "src/assets/default.png"
            }
            height="50px"
            width="50px"
            alt=""
          />
          <div className="flex flex-col justify-end items-start">
            <h2 className="font-bold">{currentSong.title}</h2>
            <p className="text-sm">{currentSong.author}</p>
          </div>
          <div className="flex flex-col space-y-2">
            {liked !== null && liked ? (
              <FaHeart
                className="text-customRed text-xl cursor-pointer"
                onClick={LikedUnliked}
              />
            ) : (
              <FaRegHeart
                className="text-customRed text-xl cursor-pointer"
                onClick={LikedUnliked}
              />
            )}
            <RiPlayListLine className="text-customRed text-xl cursor-pointer" />
          </div>
        </div>
        <div className="Playbuttons flex flex-col space-x-2 items-center justify-between">
          <div className="flex items-center space-x-5">
            <GiPreviousButton
              className="text-2xl text-customRed cursor-pointer"
              onClick={clickPrev}
            />
            {isPlaying ? (
              <FaPause
                className="text-3xl text-customRed cursor-pointer"
                onClick={PlayPause}
              />
            ) : (
              <FaPlay
                className="text-3xl text-customRed cursor-pointer"
                onClick={PlayPause}
              />
            )}
            <GiNextButton
              className="text-2xl text-customRed cursor-pointer"
              onClick={clickNext}
            />
          </div>
          <div className="flex w-[400px] space-x-2">
            <div
              className="min-w-[100%] bg-gray-200 h-[5px] rounded-full cursor-pointer my-4"
              onClick={checkWidth}
              ref={clickRef}
            >
              <div
                className="bg-customRed h-full rounded-full"
                style={{ width: `${currentSong.progress + "%"}` }}
              ></div>
            </div>
            <p className="text-sm">
              {currentSong.progress
                ? formatTimer((currentSong.progress / 100) * currentSong.length)
                : "0:00"}
              /{currentSong.length ? formatTimer(currentSong.length) : "0:00"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <HiSpeakerWave className="text-2xl text-customRed" />
          <FaShuffle className="text-xl text-customRed" />
          <TiArrowLoop className="text-3xl text-customRed" />
        </div>
      </div>
    </div>
  );
};

export default Player;
