import React, { useEffect, useState } from "react";
import axios from "axios";

const ApplicationList = ({ user, refresh }) => {
  const [apps, setApps] = useState([]);

  const fetchApps = async () => {
    const params = { role: user.role, userId: user.id };
    const res = await axios.get("https://loanmanagerbackend-10.onrender.com/api/applications", { params });
    setApps(res.data);
  };

  useEffect(() => { fetchApps(); }, [refresh]);

  const handleStatus = async (id, status) => {
    await axios.patch(`https://loanmanagerbackend-10.onrender.com/api/applications/${id}/status`, { status });
    fetchApps();
  };

  return (
    <div className="app-list">
      <h2>Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            {(user.role === "verifier" || user.role === "admin") && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {apps.map(app => (
            <tr key={app.id}>
              <td>{app.fullName}</td>
              <td>{app.loanAmount}</td>
              <td>{app.status}</td>
              <td>{new Date(app.createdAt).toLocaleString()}</td>
              {(user.role === "verifier" || user.role === "admin") && (
                <td>
                  {app.status === "pending" && (
                    <>
                      <button onClick={() => handleStatus(app.id, "approved")}>Approve</button>
                      <button onClick={() => handleStatus(app.id, "rejected")}>Reject</button>
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationList;
