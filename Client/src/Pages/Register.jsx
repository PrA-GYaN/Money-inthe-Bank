import React, { useState } from 'react';
import axios from 'axios';
import '../Css/register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
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
    if (!formData.user_name) newErrors.user_name = 'Username is required';
        if (!formData.email) newErrors.email = 'Email is required';
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
        const response = await axios.post('http://localhost:5000/users/register', formData);

        setSuccessMessage(response.data.message || 'Registration successful!');

        setFormData({
          user_name: '',
          email: '',
          phone: '',
          password: '',
        });
      } catch (error) {
        console.error('Submission error:', error);
        setErrors({ global: error.response?.data.message || 'Registration failed' });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container">
      <h2 className="header">Register</h2>
      <form onSubmit={handleSubmit} className="form">
        {['user_name', 'email', 'phone', 'password'].map((field) => (
          <div className="formGroup" key={field}>
            <label className="label">{field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}:</label>
            <input
              type={field === 'password' ? 'password' : field === 'phone' ? 'tel' : 'text'}
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
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Register;