import React from 'react';
import './group.css'; 

const Gdetails = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Group Details</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="group-detail">
            <label>Group Name:</label>
            <input type="text" defaultValue="mustang" className="group-input" />
            <button className="edit-button">&#9998;</button> {/* Edit icon */}
          </div>
          <div className="expense-detail">
            <p>Total expenses: ₹ 5000</p>
          </div>
          <div className="user-list">
            <h4>All Users:</h4>
            <div className="user-item">
              <div className="user-avatar">
                <span>P</span>
              </div>
              <div className="user-info">
                <p>pragyan</p>
                <p>pragyan1516@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gdetails;
