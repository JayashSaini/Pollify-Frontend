// Import necessary libraries and types
import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "../utils";

// Define the PublicRoute component which takes in children as its prop
const PublicRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Destructure token and user from the authentication context

  const user = LocalStorage.get("user");
  const token = LocalStorage.get("token");
  const navigate = useNavigate();

  // // If there is a valid token and user ID, navigate the user to the chat page
  useEffect(() => {
    if (token && user?._id) {
      navigate("/dashboard");
    }
  }, []);

  // If no token or user ID exists, render the child components as they are
  return children;
};

// Export the PublicRoute component for use in other parts of the application
export default PublicRoute;
