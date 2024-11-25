import { useNavigate } from "react-router";
import { TypewriterEffect } from "../components/typewriter";
import { useAuth } from "../context/auth.context";
import { useCallback } from "react";

export default function home() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const words = [
    {
      text: "Your",
    },
    {
      text: "Polls,",
    },
    {
      text: "Results,",
    },
    {
      text: "In",
    },
    {
      text: "Real-Time.",
      className: "text-blue-500",
    },
  ];

  const handleCreatePoll = useCallback(() => {
    if (user && token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [user, token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-[40rem] ">
      <p className="text-slate-700 text-base   mb-5">
        The road to freedom starts from here
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <button
          onClick={handleCreatePoll}
          className="w-40 h-10 rounded-xl bg-slate-900 border  border-transparent text-white text-sm"
        >
          Create Poll
        </button>
        <button
          className="w-40 h-10 rounded-xl bg-white text-slate-900  border border-slate-900  text-sm"
          onClick={() => {
            token && user ? navigate("/dashboard") : navigate("/register");
          }}
        >
          {token && user ? "Dashboard" : "Signup"}
        </button>
      </div>
    </div>
  );
}
