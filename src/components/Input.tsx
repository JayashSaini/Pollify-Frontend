import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inputSize?: "small" | "medium" | "large"; // Restrict inputSize to specific values
};

const Input: React.FC<InputProps> = ({ inputSize = "medium", ...props }) => {
  // Define inputSize-specific classes
  const sizeClasses: Record<"small" | "medium" | "large", string> = {
    small: "py-2 px-3 text-sm",
    medium: "py-3 px-5 text-base",
    large: "py-4 px-6 text-lg",
  };

  const effectiveSize = inputSize || "medium"; // Ensure a fallback to "medium"

  return (
    <input
      {...props}
      className={`block w-full rounded-md outline outline-[1px] outline-slate-400 border-0 text-slate-800 bg-transparent font-light placeholder:text-slate-600 ${
        sizeClasses[effectiveSize as "small" | "medium" | "large"]
      }`}
    />
  );
};

export default Input;
