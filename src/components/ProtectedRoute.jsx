import React from "react";
import { Navigate } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useFirebase();

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
