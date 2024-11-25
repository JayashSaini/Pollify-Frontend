import React, { useState } from "react";
import Modal from "../Modal"; // Reusable modal component
import Button from "../Button"; // Reusable button component
import { toast } from "sonner";
import Input from "../Input";

const CreatePollModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pollData: { title: string; options: string[] }) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([""]);

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    } else {
      toast.error("You can add a maximum of 4 options.");
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 1) {
      setOptions(options.filter((_, i) => i !== index));
    } else {
      toast.error("At least one option is required.");
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (options.some((opt) => !opt.trim())) {
      toast.error("All options must be filled.");
      return;
    }
    onSubmit({ title, options });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">Create Poll</h2>
        <div>
          <label
            htmlFor="pollTitle"
            className="block text-sm font-medium text-slate-600 mb-1"
          >
            Title
          </label>
          <Input
            id="pollTitle"
            inputSize={"small"}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter poll title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Options
          </label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2 space-x-3">
              <Input
                type="text"
                inputSize={"small"}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="mt-3 text-blue-500 hover:text-blue-700 text-sm"
          >
            + Add Option
          </button>
        </div>
        <div className="w-full flex justify-end space-x-3">
          <Button severity="secondary" onClick={onClose} size="small">
            Cancel
          </Button>
          <Button onClick={handleSubmit} size="small">
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePollModal;
