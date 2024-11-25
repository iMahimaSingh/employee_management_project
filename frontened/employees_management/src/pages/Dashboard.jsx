import React from "react";
import Header from "../components/Header.jsx";
 

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      
      <Header />

    <main className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Welcome Admin Panel</h1>
      </main>
    </div>
  );
};

export default Dashboard;
