import React from "react";
import { useFirebase } from "../context/FirebaseContext";

const Dashboard = () => {
  const { user } = useFirebase();

  return (
    <div>
      <h1>Dashboard</h1>
      <h3>User Profile</h3>
      {user && (
        <div>
          <img src={user.photoURL} alt="Profile" width="50" />
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
