import './Dashboard.css'

const Wallet = ({ wallet }) => {
  return (
    <div className="wallet">
      <h2>John Doe</h2>
      <p>My Wallet: ${wallet}</p>
    </div>
  );
};

export default Wallet;