import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { requestHandler } from "../utils";
import { toast } from "sonner";
import { addVoteAPI, getPollByIdAPI } from "../api"; // Replace with your API call
import Loader from "../components/Loader"; // Assuming you have a Loader component
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { Poll } from "../interfaces/poll";

import Button from "../components/Button";

const Vote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [poll, setPoll] = useState<Poll | null>(null);

  const { pollId } = useParams();
  const navigate = useNavigate();

  // Handle form submission (casting the vote)
  const handleSubmit = () => {
    if (!selectedOption) {
      toast.error("Please select an option to vote.");
      return;
    }

    // Call the API to cast the vote
    requestHandler(
      async () => await addVoteAPI(pollId || "", selectedOption),
      setIsLoading,
      () => {
        setSelectedOption(null);
        toast.success("Vote cast successfully!");
      },
      (error) => {
        toast.error(error);
      }
    );
  };

  useEffect(() => {
    // Fetch poll data by ID
    requestHandler(
      async () => await getPollByIdAPI(pollId || ""),
      setIsLoading,
      ({ data }) => {
        setPoll(data);
      },
      (e) => {
        toast.error(e);
        navigate("/dashboard");
      }
    );
  }, [pollId]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 ">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl md:p-6 px-3 py-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          {poll?.title}
        </h2>

        {/* Poll Options */}
        <div className="space-y-4">
          <RadioGroup
            value={selectedOption}
            onChange={setSelectedOption}
            aria-label="Poll options"
          >
            {poll?.options.map((option) => (
              <Field
                key={option._id}
                className="flex items-center gap-4 py-2 px-3  cursor-pointer"
              >
                <Radio
                  value={option._id}
                  className="h-5 w-5 border border-slate-400 rounded-full focus:ring-2 focus:ring-slate-200 data-[checked]:bg-slate-800"
                />
                <Label className="text-slate-900 text-lg">{option.label}</Label>
              </Field>
            ))}
          </RadioGroup>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSubmit}
            size="small"
            disabled={!selectedOption}
          >
            Submit Vote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Vote;
