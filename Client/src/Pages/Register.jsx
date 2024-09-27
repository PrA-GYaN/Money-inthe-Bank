import React, { useState,useEffect } from 'react';
import '../Css/register.css';
import { auth } from '../Utils/firebaseConfig';
import { RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [verificationCode, setVerificationCode] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSendOtp = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, formData.phone);
      setConfirmResult(confirmationResult);
      alert('OTP sent successfully!');
    } catch (error) {
      console.error('Error during signInWithPhoneNumber', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (confirmResult) {
      try {
        await confirmResult.confirm(verificationCode);
        alert('Phone number verified successfully!');
        setFormData({ name: '', email: '', phone: '', password: '' });
        setVerificationCode('');
        setConfirmResult(null);
      } catch (error) {
        console.error('Error verifying OTP', error);
        alert('Invalid OTP. Please try again.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form Data:', formData);
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible', 
      'callback': (response) => {
       
      },
      'expired-callback': () => {
        
        window.recaptchaVerifier.render().then((widgetId) => {
          window.grecaptcha.reset(widgetId);
        });
      }
    }, auth);
  }, []);

  return (
    <div className="container">
      <h2 className="header">Register</h2>
      <form onSubmit={handleSubmit} className="form">
        {['name', 'email', 'phone', 'password'].map((field) => (
          <div className="formGroup" key={field}>
            <label className="label">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="input"
            />
            {errors[field] && <p className="error">{errors[field]}</p>}
          </div>
        ))}
        
        <button type="button" onClick={handleSendOtp} disabled={loading}>
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>

        {confirmResult && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button onClick={handleVerifyOtp}>Verify OTP</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
