import React, { useState } from 'react';
import axios from 'axios';
import './trasa.css';

const TransactionCreate = ({ isOpen, onClose,grp_id}) => {
  const [formData, setFormData] = useState({
    transc_name: '',
    fromUser: '66f8132d42c06bf2f36ae20e', 
    toUser: '', 
    amount: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const { transc_name, fromUser, toUser, amount } = formData;
    const parsedAmount = parseInt(amount, 10); // Parse as integer

    if (!transc_name.trim()) {
      setError("Transaction name is required");
      return;
    }
    if (!toUser.trim()) {
      setError("Recipient is required");
      return;
    }
    if (parsedAmount <= 0) {
      setError("Amount must be greater than zero");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/transaction/create', {
        transc_name,
        fromUser,
        toUser,
        amount: parsedAmount,
      });
      setSuccessMessage("Transaction created successfully!");
      grp_id.transactions.push(response.data._id);
      console.log(response.data._id);
      handleClose();
    } catch (error) {
      console.error('Submission error:', error);
      setError("Failed to create transaction. Please try again.");
    }
  };

  const handleClose = () => {
    setFormData({
      transc_name: '',
      fromUser: '66f8132d42c06bf2f36ae20e',
      toUser: '',
      amount: '',
    });
    setError('');
    setSuccessMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create a New Transaction</h2>
          <button className="close-button" onClick={handleClose} aria-label="Close modal">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="group-detail">
              <label htmlFor="transaction-name">Transaction Name:</label>
              <input
                id="transaction-name"
                name="transc_name"
                type="text"
                className="group-input"
                value={formData.transc_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="account-detail">
              <label htmlFor="to-user">Recipient User ID:</label>
              <input
                id="to-user"
                name="toUser"
                type="text"
                className="group-input"
                value={formData.toUser}
                onChange={handleChange}
                required
              />
            </div>
            <div className="expense-detail">
              <label htmlFor="transaction-amount">Transaction Amount:</label>
              <input
                id="transaction-amount"
                name="amount"
                type="number"
                className="group-input"
                value={formData.amount}
                onChange={handleChange}
                required
              />
              {error && <p className="error-message" aria-live="assertive">{error}</p>}
              {successMessage && <p className="success-message" aria-live="polite">{successMessage}</p>}
            </div>
            <button type="submit" className="submit-button">Create Transaction</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionCreate;
