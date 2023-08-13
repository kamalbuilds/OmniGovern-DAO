import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2>Sign in with Worldcoin to Prove you are a Unique User</h2>
      <button 
        onClick={() => loginWithRedirect()}
        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-indigo-800"
      >
        Log In
      </button>
    </div>
  );
};

export default LoginButton;
