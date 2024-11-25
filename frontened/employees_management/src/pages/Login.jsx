import React from "react";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
 const navigate = useNavigate();
    const loginHandler = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    }
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Logo */}
      <div className="p-4">
        <img
          src="data:image/png;base64,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" 
          alt="Logo"
          className="w-16"
        />
      </div>

      {/* Form */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
            Login
          </h2>
          <form>
            {/* Username Field */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button onClick={loginHandler}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
