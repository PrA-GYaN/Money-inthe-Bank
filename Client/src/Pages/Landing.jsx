import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/landing.css';
import phone from '../../public/images/phone.png';

const Landing = () => {
  return (
    <div className="landing">
      <header className="landing-header">
        <nav className="landing-nav">
          <div className='left-section'>
            <ul>
              <li><Link to="#">Home</Link></li>
              <li><Link to="#">Services</Link></li>
              <li><Link to="#">Help</Link></li>
              <li><Link to="#">Contact</Link></li>
            </ul>
            <div className="brand">MiTB</div>
          </div>

          <div className="auth-buttons">
            <Link to="/login">
              <button className="sign-in">Sign in</button>
            </Link>
            <Link to="/register">
              <button className="sign-up">Sign Up</button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="landing-main">
        <div className="main-text">
          <p className="platform">E-money platform to make</p>
          <div className='slogan'>Split Bill Not<br/>Friendship</div>
        </div>
        <div className="main-img">
            <div className="green-shape"></div>
            <img src={phone} className='image'></img>
        </div>
      </main>

      <div className="landing-buttons">
        <Link to="#">
          <button className="quick-payment">Quick Payment</button>
        </Link>
        <Link to="#">
          <button className="user-activity">User Activity</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
