'use client';

import { useState } from 'react';

export default function Home() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [tier, setTier] = useState('');

  const tierInterestRates = {
    10000: 0.05,
    20000: 0.10,
    30000: 0.20,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !tier) {
      alert('Please fill in all fields.');
      return;
    }

    const weeklyInterest = tier * tierInterestRates[tier];
    const totalWithdrawal = parseFloat(tier) + weeklyInterest;

    const newStudent = {
      name,
      tier: parseInt(tier),
      weeklyInterest: weeklyInterest.toFixed(2),
      totalWithdrawal: totalWithdrawal.toFixed(2),
    };

    setStudents([...students, newStudent]);
    setName('');
    setTier('');
  };

  const totalSavings = students.reduce((total, student) => total + student.tier, 0);
  const totalInterest = students.reduce(
    (total, student) => total + parseFloat(student.weeklyInterest),
    0
  );

  return (
    <div>
      <h1>Savings Group Registration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Student Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="tier">Select Tier:</label>
        <select
          id="tier"
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          required
        >
          <option value="">--Select Tier--</option>
          <option value="10000">Tier 1 (10,000 Naira - 5% interest)</option>
          <option value="20000">Tier 2 (20,000 Naira - 10% interest)</option>
          <option value="30000">Tier 3 (30,000 Naira - 20% interest)</option>
        </select>

        <button type="submit">Register</button>
      </form>

      <div>
        <h2>Registered Students</h2>
        {students.length === 0 ? (
          <p>No students registered yet.</p>
        ) : (
          <ul>
            {students.map((student, index) => (
              <li key={index}>
                <strong>{student.name}</strong> - Tier: {student.tier} Naira, Weekly Interest: {student.weeklyInterest} Naira, Total Withdrawal: {student.totalWithdrawal} Naira
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2>Savings Dashboard</h2>
        <p><strong>Total Savings:</strong> {totalSavings} Naira</p>
        <p><strong>Total Weekly Interest:</strong> {totalInterest.toFixed(2)} Naira</p>
      </div>
    </div>
  );
}