// src/Dashboard.js
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Wallet from "./Wallet.jsx";
import Transactions from "./Transaction.jsx";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import Modal from "./Modal.jsx"; // Import the Modal component
import data from "../../Data/data.json";
import './Dashboard.css';

const Dashboard = () => {
  const [walletData, setWalletData] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ group_name: '' });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.group_name.trim()) {
      newErrors.group_name = 'Group Name is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); 

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      setErrors(validationErrors);
      return;
    }

    try {
      console.log("Submitting formData:", formData);
      const response = await axios.post('http://localhost:5000/api/group', formData);
      if (response.data && response.data.message) {
        setSuccessMessage(response.data.message);
      } else {
        setErrors({ global: 'Unexpected response format' });
      }
      setFormData({ group_name: '' }); // Reset the correct field
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
      setIsModalOpen(false); // Close the modal after submission
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ global: error.response?.data.message || 'Submission failed' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setWalletData(data.user);
    setTransactions(data.transactions);
  }, []);

  return (
    <div className="dashboard">
      <Header company={walletData.company} walletMain={walletData.walletMain} />
      <div className="dashboard-content">
        <Sidebar />
        <div className="main-content">
          <Wallet wallet={walletData.wallet} />
          <Transactions transactions={transactions} />
          <div className="clk-btn" onClick={() => setIsModalOpen(true)}>+</div> {/* Button to open modal */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <form onSubmit={handleSubmit}>
              <label>Group Name</label>
              <input
                type="text"
                name="group_name"
                value={formData.group_name}
                onChange={handleChange}
                placeholder="Enter Group Name..."
              />
              {errors.group_name && <p className="error-message">{errors.group_name}</p>}
              <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              {successMessage && <p className="success-message">{successMessage}</p>}
              {errors.global && <p className="error-message">{errors.global}</p>}
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
