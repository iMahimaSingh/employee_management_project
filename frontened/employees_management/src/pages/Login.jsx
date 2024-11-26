import React from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/dealsdray logo.png';

const LoginPage = () => {
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    
    // Simulate a successful login
    const username = e.target.username.value; // Get username from input
    localStorage.setItem('username', username); // Save username to local storage
    navigate('/dashboard'); // Redirect to dashboard
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Logo */}
      <div className="p-4">
        <img
          src={logo} alt="DealsDray Logo"
          className="w-16"
        />
      </div>

      {/* Form */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
            Login
          </h2>
          <form onSubmit={loginHandler}>
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
                name="username" // Add name attribute
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                required
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
                name="password" // Add name attribute
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
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