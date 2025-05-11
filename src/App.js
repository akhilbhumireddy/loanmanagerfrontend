import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import ApplicationForm from "./components/ApplicationForm";
import Dashboard from "./components/Dashboard";
import ApplicationList from "./components/ApplicationList";
import "./styles/main.css";

function App() {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  if (!user) return <AuthForm onAuth={setUser} />;

  return (
    <div className="container">
      <button className="logout" onClick={() => setUser(null)}>Logout</button>
      <Dashboard user={user} />
      {user.role === "user" && <ApplicationForm user={user} onSuccess={() => setRefresh(!refresh)} />}
      <ApplicationList user={user} refresh={refresh} />
    </div>
  );
}

export default App;
