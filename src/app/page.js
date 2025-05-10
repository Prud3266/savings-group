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

  // Simulate weekly progress by adding weekly interest to each student's total withdrawal
  const simulateWeeklyProgress = () => {
    const updatedStudents = students.map((student) => {
      const newTotalWithdrawal =
        parseFloat(student.totalWithdrawal) + parseFloat(student.weeklyInterest);
      return {
        ...student,
        totalWithdrawal: newTotalWithdrawal.toFixed(2),
      };
    });
    setStudents(updatedStudents);
  };

  // Handle student withdrawal
  const handleWithdraw = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  // Handle student registration
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !tier) {
      alert('Please fill in all fields.');
      return;
    }

    // Validate the selected tier
    const validTiers = [10000, 20000, 30000];
    if (!validTiers.includes(parseInt(tier))) {
      alert('Invalid tier amount. Please select a valid tier.');
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

  // Calculate total savings and total weekly interest
  const totalSavings = students.reduce((total, student) => total + student.tier, 0);
  const totalInterest = students.reduce(
    (total, student) => total + parseFloat(student.weeklyInterest),
    0
  );

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', background: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Savings Group Registration</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
        <label htmlFor="name" style={{ margin: '10px 0 5px', fontWeight: 'bold' }}>Student Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          style={{ padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' }}
        />

        <label htmlFor="tier" style={{ margin: '10px 0 5px', fontWeight: 'bold' }}>Select Tier:</label>
        <select
          id="tier"
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          required
          style={{ padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          <option value="">--Select Tier--</option>
          <option value="10000">Tier 1 (10,000 Naira - 5% interest)</option>
          <option value="20000">Tier 2 (20,000 Naira - 10% interest)</option>
          <option value="30000">Tier 3 (30,000 Naira - 20% interest)</option>
        </select>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Register</button>
      </form>

      <div>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Registered Students</h2>
        {students.length === 0 ? (
          <p>No students registered yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: '0' }}>
            {students.map((student, index) => (
              <li key={index} style={{ marginBottom: '10px', padding: '10px', background: '#e9ecef', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>
                  <strong>{student.name}</strong> - Tier: {student.tier} Naira, Weekly Interest: {student.weeklyInterest} Naira, Total Withdrawal: {student.totalWithdrawal} Naira
                </span>
                <button onClick={() => handleWithdraw(index)} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Withdraw</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: '20px', padding: '10px', background: '#f1f1f1', borderRadius: '4px', textAlign: 'center' }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Savings Dashboard</h2>
        <p><strong>Total Savings:</strong> {totalSavings} Naira</p>
        <p><strong>Total Weekly Interest:</strong> {totalInterest.toFixed(2)} Naira</p>
        <button onClick={simulateWeeklyProgress} style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Simulate Weekly Progress</button>
      </div>
    </div>
  );
}