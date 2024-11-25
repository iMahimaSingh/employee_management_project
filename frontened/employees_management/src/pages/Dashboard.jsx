import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Welcome to the Admin Panel</h1>
        
        {loading && <p>Loading employees...</p>}
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="mt-4 w-full max-w-md">
          {employees.length > 0 ? (
            <ul className="list-disc pl-5">
              {employees.map((employee) => (
                <li key={employee._id} className="mb-2">
                  {employee.name} - {employee.designation}
                </li>
              ))}
            </ul>
          ) : (
            <p>No employees found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;