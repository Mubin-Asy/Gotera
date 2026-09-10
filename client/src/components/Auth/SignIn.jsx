/**
 * SignIn.jsx
 * Aligned with Gotera Visual Mockup (Screenshot 2)
 * Controlled form adhering to 'Learning React' (Banks & Porcello)
 * and 'HTML5 Design Patterns'
 */

import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ArrowLeft, Leaf } from 'lucide-react';

export default function SignIn({ onLogin, onSwitchToRegister, onBackToApp }) {
  const [email, setEmail] = useState('meron.kassa@gotera.gov.et');
  const [password, setPassword] = useState('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Please enter your email/username and password');
      return;
    }

    setIsLoading(true);
    try {
      await onLogin({ email, password });
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper" role="main">
      <button
        type="button"
        className="back-to-app-btn"
        onClick={onBackToApp}
        aria-label="Back to System Dashboard"
      >
        <ArrowLeft size={16} />
        <span>Back to System</span>
      </button>

      {/* Left Hero Pane with Agricultural Aesthetic */}
      <section className="auth-hero-pane" aria-label="Gotera Mission">
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
          <h2 className="auth-hero-title">National Food Reserve System</h2>
          <p className="auth-hero-desc">
            Empowering timely emergency response, strategic crop grain storage, and transparent food security distribution across all regional hubs.
          </p>
        </div>

        <div className="auth-hero-footer">
          <Leaf className="auth-hero-leaf-icon" size={22} />
          <span>Together for a food secure nation</span>
        </div>
      </section>

      {/* Right Form Card Pane */}
      <section className="auth-form-pane" aria-label="Sign In Card">
        <div className="auth-card">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div className="brand-emblem" style={{ width: '48px', height: '48px', marginBottom: '0.5rem' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
            <span style={{ fontWeight: '800', fontSize: '1.25rem', letterSpacing: '0.05em', color: '#0d382c' }}>
              GOTERA
            </span>
          </div>

          <div className="auth-card-header" style={{ textAlign: 'center' }}>
            <h2 className="auth-card-title">Welcome Back</h2>
            <p className="auth-card-subtitle">Sign in to your account to continue</p>
          </div>

          {errorMessage && (
            <div style={{ padding: '0.65rem', backgroundColor: '#fde8e8', color: '#e02424', borderRadius: '8px', fontSize: '0.7875rem', marginBottom: '1.25rem' }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="gotera-form" noValidate>
            {/* Email or Username */}
            <div className="form-group">
              <label htmlFor="authEmail" className="form-label" style={{ fontSize: '0.75rem' }}>
                Email or Username
              </label>
              <div className="input-icon-group">
                <User className="field-icon" size={16} />
                <input
                  id="authEmail"
                  type="text"
                  className="auth-input"
                  placeholder="Enter your email or username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password with Eye Toggle */}
            <div className="form-group">
              <label htmlFor="authPassword" className="form-label" style={{ fontSize: '0.75rem' }}>
                Password
              </label>
              <div className="input-icon-group">
                <Lock className="field-icon" size={16} />
                <input
                  id="authPassword"
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="auth-checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="auth-forgot-link" onClick={(e) => { e.preventDefault(); alert('In production, password reset instructions are dispatched via SMS/Email.'); }}>
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Create Account Switcher */}
          <p className="auth-switch-prompt">
            Don't have an account?{' '}
            <button
              type="button"
              className="auth-switch-link"
              onClick={onSwitchToRegister}
            >
              Create Account
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}
