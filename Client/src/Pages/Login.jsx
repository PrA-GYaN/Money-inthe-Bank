import React, { useState } from 'react';
import axios from 'axios';
import '../Css/login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setSuccessMessage('');
      try {
        const response = await axios.post('http://localhost:5000/users/login', formData);

        setSuccessMessage(response.data.message || 'Login successful!');
        setFormData({
          phone: '',
          password: '',
        });
      } catch (error) {
        console.error('Submission error:', error);
        setErrors({ global: error.response?.data.message || 'Login failed' });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container">
      <h2 className="header">Login</h2>
      <form onSubmit={handleSubmit} className="form">
        {['phone', 'password'].map((field) => (
          <div className="formGroup" key={field}>
            <label className="label">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type={field === 'password' ? 'password' : 'tel'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="input"
              aria-invalid={!!errors[field]}
              aria-describedby={`${field}Error`}
            />
            {errors[field] && (
              <p id={`${field}Error`} className="error">{errors[field]}</p>
            )}
          </div>
        ))}
        {errors.global && <p className="error">{errors.global}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button type="submit" className="submitButton" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;