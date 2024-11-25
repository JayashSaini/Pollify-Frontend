// Import required modules and types from React and react-router-dom libraries
import React, { ReactNode, useEffect } from "react";

// Import authentication context for retrieving user and token information
import { useNavigate } from "react-router";
import { LocalStorage } from "../utils";

// Define a PrivateRoute component that wraps child components to ensure user authentication
const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Destructure token and user details from the authentication context
  const user = LocalStorage.get("user");
  const token = LocalStorage.get("token");

  const navigate = useNavigate();

  // If there's no token or user ID, redirect to the login page
  useEffect(() => {
    if (!(token && user?._id)) {
      navigate("/login");
    }
  }, []);

  // If authenticated, render the child components
  return children;
};

// Export the PrivateRoute component for use in other parts of the application
export default PrivateRoute;
