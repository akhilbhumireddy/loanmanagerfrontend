import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/main.css";

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    averageLoanAmount: 0,
    approved: 0,
    rejected: 0,
    successRate: 0
  });

  const fetchStats = async () => {
    const params = { role: user.role, userId: user.id };
    const res = await axios.get("https://loanmanagerbackend-10.onrender.com/api/applications/statistics", { params });
    setStats(res.data);
  };

  useEffect(() => { fetchStats(); }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard ({user.role})</h2>
      <div className="stats">
        <div className="stat-box"><h3>Total Applications</h3><p>{stats.totalApplications}</p></div>
        <div className="stat-box"><h3>Average Loan Amount</h3><p>{stats.averageLoanAmount.toFixed(2)}</p></div>
        <div className="stat-box"><h3>Approved</h3><p>{stats.approved}</p></div>
        <div className="stat-box"><h3>Rejected</h3><p>{stats.rejected}</p></div>
        <div className="stat-box"><h3>Success Rate</h3><p>{stats.successRate}%</p></div>
      </div>
    </div>
  );
};

export default Dashboard;
