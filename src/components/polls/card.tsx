import React from "react";
import { useNavigate } from "react-router";
import { Poll } from "../../interfaces/poll";

const card: React.FC<{
  poll: Poll;
}> = ({ poll }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-md border-[1px] border-slate-400/70 rounded-xl md:p-6 p-4  w-full mx-auto hover:shadow-xl transition-shadow duration-300 ">
      {/* Poll Question */}
      <h2 className="text-xl font-semibold mb-2 text-gray-800 truncate">
        {poll.title}
      </h2>

      {/* Poll Options (Optional) */}
      {poll.options.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 mb-2">Options:</p>
          <ul className="list-none space-y-1">
            {poll.options.slice(0, 3).map((option, index) => (
              <li
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm truncate"
              >
                {option.label}
              </li>
            ))}
          </ul>
          {poll.options.length > 3 && (
            <p className="text-sm text-gray-400 mt-2">...and more</p>
          )}
        </div>
      )}

      {/* Go to Poll Button */}
      <button
        onClick={() => {
          navigate("/dashboard/poll/" + poll._id);
        }}
        className="w-full bg-slate-900 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Go to Poll
      </button>
    </div>
  );
};

export default card;
