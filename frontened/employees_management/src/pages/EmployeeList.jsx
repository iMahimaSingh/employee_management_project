import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; // Import useHistory for navigation
import Header from "../components/Header.jsx"; 

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory(); // Initialize useHistory for navigation

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employee/list");
        setEmployees(response.data); // Set the employee data from the API
      } catch (error) {
        console.error("Error fetching employees:", error); // Handle API errors
      }
    };

    fetchEmployees();
  }, []); // Empty dependency array to run the effect only once

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.f_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.f_Email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employee/${id}`); // Send DELETE request
      setEmployees(employees.filter((employee) => employee.f_Id !== id)); // Update state
      alert("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee.");
    }
  };

  // Navigate to CreateEmployee component
  const handleCreateEmployee = () => {
    history.push("/create-employee"); // Adjust the path based on your routing setup
  };

  return (
    <div className="p-4">
      <Header /> 

      <main>
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold">Total Count: {filteredEmployees.length}</span>
          <button 
            onClick={handleCreateEmployee} // Add onClick handler
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create Employee
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Enter Search Keyword"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>

        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-blue-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Unique Id</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Mobile No</th>
              <th className="border border-gray-300 px-4 py-2">Designation</th>
              <th className="border border-gray-300 px-4 py-2">Gender</th>
              <th className="border border-gray-300 px-4 py-2">Course</th>
              <th className="border border-gray-300 px-4 py-2">Create Date</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.f_Id} className="text-center">
                <td className=" border border-gray-300 px-4 py-2">{employee.f_Id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={employee.f_Image || "https://via.placeholder.com/50"}
                    alt={employee.f_Name}
                    className="h-8 w-8 mx-auto"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">{employee.f_Name}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.f_Email}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.f_Mobile}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.f_Designation}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.f_gender}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.f_Course}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(employee.f_Createdate).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDelete(employee.f_Id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default EmployeeList;