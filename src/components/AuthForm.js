import React, { useState } from "react";
import axios from "axios";

const AuthForm = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", role: "user" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post("https://loanmanagerbackend-10.onrender.com/api/users/login", { email: form.email });
        onAuth(res.data);
      } else {
        const res = await axios.post("https://loanmanagerbackend-10.onrender.com/api/users/register", form);
        onAuth(res.data);
      }
    } catch (err) {
      alert("Auth failed!");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {!isLogin && (
        <>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="verifier">Verifier</option>
            <option value="admin">Admin</option>
          </select>
        </>
      )}
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <button type="submit">{isLogin ? "Login" : "Register"}</button>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span className="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register" : "Login"}
        </span>
      </p>
    </form>
  );
};

export default AuthForm;
