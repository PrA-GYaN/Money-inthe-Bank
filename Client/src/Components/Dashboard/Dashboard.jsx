// src/Dashboard.js
import React, { useState, useEffect } from "react";
import Wallet from "./Wallet.jsx";
import Transactions from "./Transaction.jsx";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import data from "../../Data/data.json"
import './Dashboard.css';

const Dashboard = () => {
  const [walletData, setWalletData] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Load data from JSON file
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
