import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import Employee from "./pages/Employee";
import EmployeeEdit from "./pages/EmployeeEdit";

const App = () => { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/employee-edit" element={<EmployeeEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
