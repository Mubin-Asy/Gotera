/**
 * CreateAccount.jsx
 * Aligned with Gotera Visual Mockup (Screenshot 1)
 * Controlled form adhering to 'Learning React' (Banks & Porcello)
 * and 'HTML5 Design Patterns'
 */

import React, { useState } from 'react';
import { User, Mail, Phone, Building2, Briefcase, Lock, ArrowLeft, Leaf } from 'lucide-react';

export default function CreateAccount({ onRegister, onSwitchToLogin, onBackToHome }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    role: 'Warehouse Manager',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    'Warehouse Manager',
    'Relief Coordinator',
    'Logistics Officer',
    'Quality Inspector',
    'Administrator'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password) {
      setErrorMessage('Please fill in all mandatory fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await onRegister(formData);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper" role="main">
      <button
        type="button"
        className="back-to-app-btn"
        onClick={onBackToHome}
        aria-label="Back to Home Page"
      >
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </button>

      {/* Left Hero Pane with Agricultural Aesthetic */}
      <section className="auth-hero-pane" aria-label="Create Account Introduction">
        <div className="auth-hero-top">
          <div className="auth-brand-logo">
            <div className="brand-emblem">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
            <span className="brand-title">GOTERA</span>
          </div>
        </div>

        <div className="auth-hero-content">
          <h2 className="auth-hero-title">Create Your Account</h2>
          <p className="auth-hero-desc">
            Join GOTERA and be part of the national food reserve system. Coordinate relief resources, track grain silos, and safeguard food security nationwide.
          </p>
        </div>

        <div className="auth-hero-footer">
          <Leaf className="auth-hero-leaf-icon" size={22} />
          <span>Together for a food secure nation</span>
        </div>
      </section>

      {/* Right Form Card Pane */}
      <section className="auth-form-pane" aria-label="Account Registration Form">
        <div className="auth-card" style={{ padding: '2rem' }}>
          <div className="auth-card-header">
            <h2 className="auth-card-title">Create Account</h2>
            <p className="auth-card-subtitle">Register your agency credentials to access Gotera</p>
          </div>

          {errorMessage && (
            <div style={{ padding: '0.65rem', backgroundColor: '#fde8e8', color: '#e02424', borderRadius: '8px', fontSize: '0.7875rem', marginBottom: '1rem' }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="gotera-form" noValidate>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="regFullName" className="form-label" style={{ fontSize: '0.75rem' }}>
                Full Name
              </label>
              <div className="input-icon-group">
                <User className="field-icon" size={16} />
                <input
                  id="regFullName"
                  name="fullName"
                  type="text"
                  className="auth-input"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label htmlFor="regEmail" className="form-label" style={{ fontSize: '0.75rem' }}>
                Email Address
              </label>
              <div className="input-icon-group">
                <Mail className="field-icon" size={16} />
                <input
                  id="regEmail"
                  name="email"
                  type="email"
                  className="auth-input"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label htmlFor="regPhone" className="form-label" style={{ fontSize: '0.75rem' }}>
                Phone Number
              </label>
              <div className="input-icon-group">
                <Phone className="field-icon" size={16} />
                <input
                  id="regPhone"
                  name="phone"
                  type="tel"
                  className="auth-input"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Organization */}
            <div className="form-group">
              <label htmlFor="regOrg" className="form-label" style={{ fontSize: '0.75rem' }}>
                Organization
              </label>
              <div className="input-icon-group">
                <Building2 className="field-icon" size={16} />
                <input
                  id="regOrg"
                  name="organization"
                  type="text"
                  className="auth-input"
                  placeholder="Enter your organization"
                  value={formData.organization}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Role Select */}
            <div className="form-group">
              <label htmlFor="regRole" className="form-label" style={{ fontSize: '0.75rem' }}>
                Role
              </label>
              <div className="input-icon-group">
                <Briefcase className="field-icon" size={16} />
                <select
                  id="regRole"
                  name="role"
                  className="auth-input"
                  value={formData.role}
                  onChange={handleChange}
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="regPassword" className="form-label" style={{ fontSize: '0.75rem' }}>
                Password
              </label>
              <div className="input-icon-group">
                <Lock className="field-icon" size={16} />
                <input
                  id="regPassword"
                  name="password"
                  type="password"
                  className="auth-input"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="regConfirmPassword" className="form-label" style={{ fontSize: '0.75rem' }}>
                Confirm Password
              </label>
              <div className="input-icon-group">
                <Lock className="field-icon" size={16} />
                <input
                  id="regConfirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="auth-input"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
              style={{ marginTop: '0.5rem' }}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Switcher to Sign In */}
          <p className="auth-switch-prompt">
            Already have an account?{' '}
            <button
              type="button"
              className="auth-switch-link"
              onClick={onSwitchToLogin}
            >
              Sign In
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}
