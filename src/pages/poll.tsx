import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
import Button from "../components/Button"; // Replace with your own Button component
import { LuArrowLeft } from "react-icons/lu";
import { IoCopy } from "react-icons/io5"; // Import the copy icon
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Poll as PollInterface } from "../interfaces/poll";
import { requestHandler } from "../utils";
import { toast } from "sonner";
import { deletePollAPI, getPollByIdAPI } from "../api";
import Loader from "../components/Loader";
import Input from "../components/Input";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const Poll = () => {
  const [poll, setPoll] = useState<PollInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { pollId } = useParams();

  const navigate = useNavigate();

  const totalVotes = poll?.options.reduce(
    (acc, option) => acc + option?.votes,
    0
  );

  const chartData = {
    labels: poll?.options.map((option) => option.label),
    datasets: [
      {
        label: "Votes",
        data: poll?.options.map((option) => option.votes),
        backgroundColor: ["#6366f1", "#60a5fa", "#34d399", "#f43f5e"], // Customize colors
      },
    ],
  };

  const handleDeletePoll = () => {
    requestHandler(
      async () => await deletePollAPI(pollId || ""),
      setIsLoading,
      () => {
        toast.success("Poll deleted successfully");
        navigate("/dashboard");
      },
      (e) => toast.error(e)
    );
  };

  const handleCopyToClipboard = () => {
    const pollLink = `${window.location.origin}/vote/${pollId}`;
    navigator.clipboard.writeText(pollLink).then(() => {
      toast.success("Poll link copied to clipboard!");
    });
  };

  useEffect(() => {
    requestHandler(
      async () => await getPollByIdAPI(pollId || ""),
      setIsLoading,
      ({ data }) => setPoll(data),
      (e) => {
        toast.error(e);
        navigate("/dashboard");
      }
    );
  }, [pollId]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <LuArrowLeft
          className="text-slate-700/70 text-xl mb-3 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />
        {/* Poll Title */}
        <h1 className="text-2xl font-bold text-slate-800 mb-4">
          {poll?.title}
        </h1>

        {/* Options and Votes */}
        <div className="space-y-3">
          {poll?.options.map((option, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-md p-3"
            >
              <span className="text-slate-700">{option.label}</span>
              <span className="text-slate-500">{option?.votes} votes</span>
            </div>
          ))}
        </div>

        {/* Public Link to Vote */}
        <div className="mt-6">
          <label className="text-sm font-semibold text-slate-600">
            Share Poll Link:
          </label>
          <div className="flex items-center space-x-3 mt-1">
            <Input
              type="text"
              readOnly
              inputSize="small"
              value={`${window.location.origin}/vote/${pollId}`}
            />
            <IoCopy
              className="text-xl text-slate-700 cursor-pointer"
              onClick={handleCopyToClipboard}
            />
          </div>
        </div>

        {/* Total Votes */}
        <div className="mt-6 text-base font-medium text-slate-600">
          Total Votes: <span className="text-slate-800">{totalVotes}</span>
        </div>

        {/* Chart */}
        <div className="mt-6">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            onClick={handleDeletePoll}
            severity="danger"
            size="small"
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
          >
            Delete Poll
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Poll;
