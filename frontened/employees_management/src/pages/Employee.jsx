import React, { useState } from "react";
import Header from "../components/Header.jsx";  

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    image: null,
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
    const { name, email, mobile, designation, gender, course, image } = formData;

    if (
      !name ||
      !email ||
      !mobile ||
      !designation ||
      !gender ||
      course.length === 0 ||
      !image
    ) {
      alert("All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email address.");
      return false;
    }

    if (!/^\d+$/.test(mobile)) {
      alert("Mobile number should be numeric.");
      return false;
    }

    const allowedFileTypes = ["image/jpeg", "image/png"];
    if (!allowedFileTypes.includes(image.type)) {
      alert("Only JPG/PNG files are allowed for image upload.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { name, email, mobile, designation, gender, course, image } = formData;

      // Create a FormData object to send the data
      const data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("designation", designation);
      data.append("gender", gender);
      data.append("course", JSON.stringify(course)); // Convert array to string
      data.append("image", image);

      try {
        const response = await fetch('http://localhost:5000/api/employees', {
          method: 'POST',
          body: data,
        });

        if (response.ok) {
          alert("Employee created successfully.");
          // Optionally, reset the form or redirect the user
          setFormData({
            name: "",
            email: "",
            mobile: "",
            designation: "",
            gender: "",
            course: [],
            image: null,
          });
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error creating employee:', error);
        alert('An error occurred while creating the employee.');
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
              value={formData.name}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium"> Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              value={formData.email}
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
              value={formData.mobile}
            />
          </div>

          {/* Designation */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Designation</label>
            <select
              name="designation"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              value={formData.designation}
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
                  checked={formData.gender === "Male"}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleInputChange}
                  checked={formData.gender === "Female"}
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
                  checked={formData.course.includes("MCA")}
                />{" "}
                MCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BCA"
                  onChange={handleInputChange}
                  checked={formData.course.includes("BCA")}
                />{" "}
                BCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BSC"
                  onChange={handleInputChange}
                  checked={formData.course.includes("BSC")}
                />{" "}
                BSC
              </label>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Image Upload</label>
            <input
              type="file"
              name="image"
              accept="image/jpeg, image/png"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
            />
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