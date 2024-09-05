"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "/lib/firebase/config"; // Adjust path based on your structure

const CurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This will set up a listener that listens for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); // User is signed in, set the user
      } else {
        setCurrentUser(null); // No user is signed in
      }
      setLoading(false); // Stop the loading indicator
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {currentUser ? (
        <div>
          <h2>Welcome, {currentUser.displayName || currentUser.email}!</h2>
          <p>Email: {currentUser.email}</p>
        </div>
      ) : (
        <p>No user is signed in.</p>
      )}
    </div>
  );
};

export default CurrentUser;
