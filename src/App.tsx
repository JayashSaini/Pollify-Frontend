import { Route, Routes } from "react-router";
import Home from "./pages/home";
import PublicRoute from "./components/PublicRoute";
import Login from "./pages/login";
import Register from "./pages/register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/dashboard";
import "./App.css";
import Poll from "./pages/poll";
import Vote from "./pages/vote";

const App = () => {
  return (
    <Routes>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/vote/:pollId" element={<Vote />} />

      {/* Public login route: Accessible by everyone */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Public register route: Accessible by everyone */}
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/poll/:pollId"
        element={
          <PrivateRoute>
            <Poll />
          </PrivateRoute>
        }
      />

      {/* 404 page */}
      <Route
        path="*"
        element={<h1 className="text-4xl text-center">404 Page not found</h1>}
      />
    </Routes>
  );
};

export default App;
