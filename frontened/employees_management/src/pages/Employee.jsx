// src/CreateEmployee.jsx
import React, { useState } from "react";
import Header from "../components/Header.jsx";  

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: []
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        course: checked
          ? [...prev.course, value]
          : prev.course.filter((c) => c !== value),
      }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const { name, email, mobile, designation, gender, course } = formData;
  
    if (
      !name ||
      !email ||
      !mobile ||
      !designation ||
      !gender ||
      course.length === 0 
    ) {
      alert("All fields are required.");
      return false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email address.");
      return false;
    }
  
    // Check if mobile number is exactly 10 digits
    if (!/^\d{10}$/.test(mobile)) {
      alert("Mobile number must be exactly 10 digits.");
      return false;
    }
  
    alert("Form validated successfully.");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5001/api/employees/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to application/json
          },
          body: JSON.stringify(formData), // Send the formData as a JSON string
        });
  
        if (!response.ok) {
          throw new Error("Failed to save employee.");
        }
  
        const data = await response.json();
        console.log("Employee saved:", data);
        alert("Employee created successfully!");
      } catch (error) {
        console.error("Error creating employee:", error);
        alert("Failed to create employee. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen flex flex-col">
    
      <Header />

      {/* Form Section */}
      <main className="flex flex-col items-center p-6">
        
        <form
          className="bg-gray-100 p-6 rounded-lg shadow-md w-3/4"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Mobile No</label>
            <input
              type="text"
              name="mobile"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
            />
          </div>

          {/* Designation */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Designation
            </label>
            <select
              name="designation"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Gender</label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleInputChange}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleInputChange}
                />{" "}
                Female
              </label>
            </div>
          </div>

          {/* Course */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Course</label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="MCA"
                  onChange={handleInputChange}
                />{" "}
                MCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BCA"
                  onChange={handleInputChange}
                />{" "}
                BCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BSC"
                  onChange={handleInputChange}
                />{" "}
                BSC
              </label>
            </div>
          </div>


          {/* Submit */}
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateEmployee;
