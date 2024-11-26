import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header.jsx"; 
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/employees/list");
        console.log("Fetched employees:", response.data); // Log the data
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error.response ? error.response.data : error.message);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredEmployees = employees.filter((employee) => {
    const nameMatches = employee.name && employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatches = employee.email && employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatches || emailMatches;
  });

  const handleDelete = async (id) => {
    try {
      // Make API call to delete the employee
      await axios.delete(`http://localhost:5001/api/employees/delete/${id}`);
      // Update local state to remove the deleted employee
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="p-4">
      <Header /> 

      <main>
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold">Total Count: {filteredEmployees.length}</span>
          <button 
            onClick={() => navigate('/employees')}
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
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{employee._id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={"https://via.placeholder.com/50"} // Adjust this if you have an image property
                      alt={employee.name}
                      className="h-8 w-8 mx-auto"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{employee.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{employee.mobile}</td>
                    <td className="border border-gray-300 px-4 py-2">{employee.designation}</td>
                    <td className="border border-gray-300 px-4 py-2">{employee.gender}</td>
                    <td className="border border-gray-300 px-4 py-2">{employee.course.join(", ")}</td>
                    <td className="border border-gray-300 px-4 py-2">{new Date(employee.createdAt).toLocaleDateString()}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleDelete(employee._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center border border-gray-300 px-4 py-2">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>
    );
  };
  
  export default EmployeeList;