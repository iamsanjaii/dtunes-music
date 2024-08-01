import React, { useEffect, useState } from "react";
import defMusic from "../assets/default.png";
import { FaUserFriends, FaSearch } from "react-icons/fa";
import { db } from "../Firebase/firebaseconfig";
import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const Friends = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [friends, setFriends] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  let debounceTimeout;

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const userRef = collection(db, "Users", user.uid, "friends");
        const q = query(userRef, where("status", "==", "pending"));
        const querySnapshot = await getDocs(q);
        const requests = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPendingRequests(requests);
      } catch (error) {
        console.error("Error fetching pending requests:", error);
      }
    };

    if (user) {
      fetchPendingRequests();
    }
  }, [user]);

  const searchFriends = async () => {
    try {
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("name", "==", searchQuery));
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching for friends:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Clear previous debounce timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

 
    debounceTimeout = setTimeout(() => {
      searchFriends();
    }, 300);
  };

  const sendRequest = async (recID, requesterName) => {
    try {
      const recipientRef = collection(db, "Users", recID, "friends");
      await addDoc(recipientRef, {
        status: "pending",
        sender: user.uid,
        senderName: requesterName,
        timestamp: new Date().toISOString(),
      });
      alert("Friend Request Sent!");
    } catch (error) {
      console.error("Error sending friend request:", error.message);
    }
  };

  const acceptFriendRequest = async (requestID) => {
    try {
      const requestRef = doc(db, "Users", user.uid, "friends", requestID);
      await updateDoc(requestRef, {
        status: "accepted",
      });
      alert("Friend request accepted!");
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const rejectFriendRequest = async (requestID) => {
    try {
      const requestRef = doc(db, "Users", user.uid, "friends", requestID);
      await deleteDoc(requestRef);
      alert("Friend request rejected!");
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendRef = collection(db, "Users", user.uid, "friends");
        const q = query(friendRef, where("status", "==", "accepted"));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFriends(results);
      } catch (error) {
        console.error("Error fetching friends:", error.message);
      }
    };
    fetchFriends();
  }, []);

  return (
    <div className="flex p-5 h-[90%] justify-between">
      <div className="h-full flex flex-col space-y-4 p-3 items-center bg-mono rounded-md w-[48%]">
        <h2 className="font-bold text-3xl text-white">Friend Requests</h2>
        <div className="flex px-4 rounded-full items-center border bg-customPink border-customRed border-2  gap-2">
          <FaSearch
            className="text-customRed cursor-pointer"
            onClick={searchFriends}
          />
          <input
            className="px-4 py-1 outline-none text-mono bg-customPink text-center rounded-full"
            type="text"
            placeholder="Search Friends"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="flex flex-col w-[100%] p-3 space-y-2 overflow-y-scroll scrollbar-hide">
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <div
                key={user.id}
                className="flex items-center p-2 rounded-md justify-between bg-opacity-30 backdrop-filter backdrop-blur-lg bg-customRed"
              >
                <div className="flex space-x-3 items-center">
                  <FaUserFriends className="text-white text-3xl" />
                  <h2 className="font-bold text-md text-white">{user.name}</h2>
                </div>
                <div className="flex space-x-3">
                  <button
                    className="text-white bg-[#48A14D] rounded px-3 py-1"
                    onClick={() => sendRequest(user.id, user.name)}
                  >
                    Send Request
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No users found.</p>
          )}
          <div className="mt-4">
            <h2 className="font-bold text-2xl text-white">Pending Requests</h2>
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center p-2 rounded-md justify-between bg-opacity-30 backdrop-filter backdrop-blur-lg bg-customRed"
                >
                  <div className="flex space-x-3 items-center">
                    <FaUserFriends className="text-white text-3xl" />
                    <h2 className="font-bold text-md text-white">
                      {request.senderName}
                    </h2>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      className="text-white bg-[#48A14D] rounded px-3 py-1"
                      onClick={() => acceptFriendRequest(request.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="text-white bg-customRed rounded px-3 py-1"
                      onClick={() => rejectFriendRequest(request.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white">No pending requests.</p>
            )}
          </div>
        </div>
      </div>
      <div className="h-full flex flex-col p-3 items-center bg-mono rounded-md w-[48%] space-y-4">
        <h2 className="font-bold text-3xl text-white">Your Friends</h2>
        <div className="flex flex-col w-full space-y-3 items-center ">
          <div className="flex items-center justify-center w-[100%]">
            {friends.length > 0 ? (
              friends.map((frnd) => (
                <div className="bg-customPink flex w-[100%] justify-between p-3 rounded-md">
                  <div className="flex items-center space-x-4">
                    <FaUserFriends className="text-customRed text-3xl" />
                    <h2 className="font-bold">{frnd.senderName}</h2>
                  </div>
                  <button className="text-white bg-customRed rounded px-2 ">
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center text-xl font-bold">
                <h2 className="text-white">You Dont Have Friends</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
