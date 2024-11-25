import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx"; 

const EmployeeEdit = ({ employeeId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    file: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load data for edit
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        const employee = await response.json();
        setFormData({
          name: employee.name,
          email: employee.email,
          mobile: employee.mobile,
          designation: employee.designation,
          gender: employee.gender,
          course: employee.course,
          file: null,
        });
      } catch (error) {
        console.error(error);
        alert('Error fetching employee data');
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

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
      setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    if (!emailRegex.test(formData.email))
      tempErrors.email = "Enter a valid email address.";
    if (!mobileRegex.test(formData.mobile))
      tempErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (!formData.designation) tempErrors.designation = "Designation is required.";
    if (!formData.gender) tempErrors.gender = "Gender is required.";
    if (!formData.course.length)
      tempErrors.course = "At least one course must be selected.";
    if (
      formData.file &&
      !["image/jpeg", "image/png"].includes(formData.file.type)
    )
      tempErrors.file = "Only JPG or PNG files are allowed.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const { name, email, mobile, designation, gender, course, file } = formData;

      // Create a FormData object to send the data
      const data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("designation", designation);
      data.append("gender", gender);
      data.append("course", JSON.stringify(course)); // Convert array to string
      if (file) {
        data.append("image", file); // Only append if file is present
      }

      try {
        const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
          method: 'PUT',
          body: data,
        });

        if (response.ok) {
          alert("Employee updated successfully!");
          // Optionally, redirect or reset the form
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error updating employee:', error);
        alert('An error occurred while updating the employee.');
      }
    }
  };

  return (
    <div className="p-4">
      <Header />

      {/* Form Section */}
      <form className="max-w-xl mx-auto mt-8 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border px-2 py-1 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border px-2 py-1 rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block font-bold">Mobile No</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="w-full border px-2 py-1 rounded"
          />
          {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
        </div>

        <div>
          <label className="block font-bold">Designation</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.designation && <p className="text-red-500">{errors.designation}</p>}
        </div>

        <div>
          <label className="block font-bold">Gender</label>
          <div className="space-x-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="M"
                checked={formData.gender === "M"}
                onChange={handleInputChange}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="F"
                checked={formData.gender === "F"}
                onChange={handleInputChange}
              />{" "}
              Female
            </label>
          </div>
          {errors.gender && <p className="text-red-500">{errors.gender}</p>}
        </div>

        <div>
          <label className="block font-bold">Course</label>
          <div className="space-x-4">
            <label>
              <input
                type="checkbox"
                name="course"
                value="MCA"
                checked={formData.course.includes("MCA")}
                onChange={handleInputChange}
              />{" "}
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                name="course"
                value="BCA"
                checked={formData.course.includes("BCA")}
                onChange={handleInputChange}
              />{" "}
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                name="course"
                value="BSC"
                checked={formData.course.includes("BSC")}
                onChange={handleInputChange}
              />{" "}
              BSC
            </label>
          </div>
          {errors.course && <p className="text-red-500">{errors.course}</p>}
        </div>

        <div>
          <label className="block font-bold">Img Upload</label>
          <input
            type="file"
            name="file"
            accept=".jpg,.png"
            onChange={handleInputChange}
            className="w-full border px-2 py-1 rounded"
          />
          {errors.file && <p className="text-red-500">{errors.file}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EmployeeEdit;