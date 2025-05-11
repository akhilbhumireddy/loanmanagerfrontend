import React, { useState } from "react";
import axios from "axios";
import "../styles/main.css";

const ApplicationForm = ({ user, onSuccess }) => {
  const [form, setForm] = useState({
    fullName: "",
    loanAmount: "",
    loanTenure: "",
    employmentStatus: "",
    employmentAddress: "",
    reason: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("https://loanmanagerbackend-10.onrender.com/api/applications", { ...form, userId: user.id });
      onSuccess();
      setForm({
        fullName: "",
        loanAmount: "",
        loanTenure: "",
        employmentStatus: "",
        employmentAddress: "",
        reason: ""
      });
    } catch (err) {
      alert("Submission failed!");
    }
  };

  return (
    <form className="loan-form" onSubmit={handleSubmit}>
      <h2>Apply for a Loan</h2>
      <input name="fullName" placeholder="Full name" value={form.fullName} onChange={handleChange} required />
      <input name="loanAmount" type="number" placeholder="How much do you need?" value={form.loanAmount} onChange={handleChange} required />
      <input name="loanTenure" type="number" placeholder="Loan tenure (months)" value={form.loanTenure} onChange={handleChange} required />
      <input name="employmentStatus" placeholder="Employment status" value={form.employmentStatus} onChange={handleChange} required />
      <input name="employmentAddress" placeholder="Employment address" value={form.employmentAddress} onChange={handleChange} required />
      <textarea name="reason" placeholder="Reason for loan" value={form.reason} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplicationForm;
