import './Dashboard.css'

const Transactions = ({ transactions }) => {
  return (
    <div className="transactions">
      <h3>Transaction History</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.type} - ${transaction.amount} 
            <span className={transaction.status === "Completed" ? "completed" : "pending"}>
              {transaction.status}
            </span>
            <div className="date">{transaction.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
