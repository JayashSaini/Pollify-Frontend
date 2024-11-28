// Import necessary modules and utilities
import axios from "axios";
import { LocalStorage } from "../utils";

// Create an Axios instance for API requests
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URI}/api/v1`,
  withCredentials: true,
  timeout: 120000,
});

// Add an interceptor to set authorization header with user token before requests
apiClient.interceptors.request.use(
  function (config) {
    // Retrieve user token from local storage
    const token = LocalStorage.get("token");
    // Set authorization header with bearer token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// API functions for User actions
const loginUser = (data: { email: string; password: string }) => {
  return apiClient.post("/users/login", data);
};

const registerUser = (data: {
  email: string;
  password: string;
  username: string;
}) => {
  return apiClient.post("/users/register", data);
};

const logoutUser = () => {
  return apiClient.post("/users/logout");
};

// API functions for Poll actions
const getMyPollsAPI = () => {
  return apiClient.get("/polls/my/polls");
};

const createPollAPI = (data: { title: string; options: string[] }) => {
  return apiClient.post("/polls", data);
};

const getPollByIdAPI = (pollId: string) => {
  return apiClient.get(`/polls/${pollId}`);
};

const deletePollAPI = (pollId: string) => {
  return apiClient.delete(`/polls/${pollId}`);
};

const addVoteAPI = (pollId: string, optionId: string) => {
  return apiClient.post(`/polls/vote/${pollId}`, { optionId });
};

const healthCheckAPI = () => {
  return apiClient.get("/healthcheck");
};

// Export all the API functions
export {
  loginUser,
  logoutUser,
  registerUser,
  getMyPollsAPI,
  createPollAPI,
  getPollByIdAPI,
  deletePollAPI,
  addVoteAPI,
  healthCheckAPI,
};
