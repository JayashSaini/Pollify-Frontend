// Importing necessary components and hooks
import { useState } from "react";
import Button from "../components/Button.js";
import Input from "../components/Input";
import { useAuth } from "../context/auth.context.js";

// Component for the Login page
const Login = () => {
  // State to manage input data (email and password)
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // Accessing the login function from the AuthContext
  const { login } = useAuth();

  // Function to update state when input data changes
  const handleDataChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        [name]: e.target.value,
      });
    };

  // Function to handle the login process
  const handleLogin = async () => await login(data);

  return (
    <div className="flex justify-center items-center flex-col p-4 sm:h-screen h-[90vh] w-screen">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleLogin();
        }}
        className="sm:w-1/2 w-full sm:p-8 p-4 flex justify-center items-center gap-3 flex-col bg-transparent my-16"
      >
        <h1 className="text-2xl m-2 text-slate-900">Login</h1>
        {/* Input for entering the email */}
        <Input
          type="email"
          placeholder="Enter the email..."
          value={data.email}
          onChange={handleDataChange("email")}
          required={true}
        />
        {/* Input for entering the password */}
        <Input
          placeholder="Enter the password..."
          type="password"
          value={data.password}
          onChange={handleDataChange("password")}
          required={true}
        />
        {/* Button to initiate the login process */}
        <Button fullWidth>Login</Button>
        {/* Link to the registration page */}
        <small className="text-slate-700 text-sm">
          Don&apos;t have an account?{" "}
          <a className="text-blue-400 hover:underline" href="/register">
            Register
          </a>
        </small>
      </form>
    </div>
  );
};

export default Login;
