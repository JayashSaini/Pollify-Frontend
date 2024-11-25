import React from "react";

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    fullWidth?: boolean;
    severity?: "primary" | "secondary" | "danger";
    size?: "base" | "small";
  }
> = ({ fullWidth, severity = "primary", size = "base", ...props }) => {
  return (
    <>
      <button
        {...props}
        className={`rounded-md inline-flex flex-shrink-0 justify-center items-center text-center  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shadow-sm px-5 py-3  border-[1px] border-slate-900 
          ${fullWidth ? " w-full " : " "}
          ${
            severity === "primary"
              ? " bg-slate-900 text-white"
              : severity === "secondary"
              ? " bg-transparent text-slate-900"
              : "bg-red-500 text-white border-transparent "
          }
            ${size === "small" ? "text-sm" : "text-base"}
        `}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;
