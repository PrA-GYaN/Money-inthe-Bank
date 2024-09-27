import './Dashboard.css';

const Header = ({ company, walletMain }) => {
  return (
    <div className="header">
      <h1>{company}</h1>
      <div className="wallet-main">My Wallet: ${walletMain}</div>
    </div>
  );
};

export default Header;
