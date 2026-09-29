/**
 * LandingPage.jsx
 * Gotera National Emergency Food Reserve Management System
 * Landing / Home Page matching the official design mockup
 */

import React, { useState } from 'react';
import {
  Package,
  Building2,
  Truck,
  FileBarChart,
  Wheat,
  Soup,
  Boxes,
  Sparkles,
  ArrowRight,
  Info,
  Phone,
  Mail,
  ShieldCheck,
  X
} from 'lucide-react';
import heroImage from '../../assets/grain_warehouse_hero.jpg';

export default function LandingPage({
  currentUser,
  onNavigateToAuth,
  onNavigateToDashboard,
  onSelectTab,
  onLogout,
  stats
}) {
  const [activeNav, setActiveNav] = useState('home');
  const [showInfoModal, setShowInfoModal] = useState(null); // 'about' | 'contact' | null

  // Metric values (defaults match official screenshot)
  const wheatVolume = stats?.reservesByCrop?.wheat
    ? `${Number(stats.reservesByCrop.wheat).toLocaleString()} t`
    : '25,430 t';

  const riceVolume = stats?.reservesByCrop?.rice
    ? `${Number(stats.reservesByCrop.rice).toLocaleString()} t`
    : '18,200 t';

  const maizeVolume = stats?.reservesByCrop?.maize
    ? `${Number(stats.reservesByCrop.maize).toLocaleString()} t`
    : '12,800 t';

  const otherVolume = stats?.reservesByCrop?.other
    ? `${Number(stats.reservesByCrop.other).toLocaleString()} t`
    : '3,240 t';

  const handleFeatureClick = (targetTab) => {
    if (currentUser) {
      onSelectTab(targetTab);
    } else {
      onNavigateToAuth('login');
    }
  };

  return (
    <div className="landing-page">
      {/* 1. Top Navbar */}
      <header className="landing-navbar" role="banner">
        <div className="landing-brand" onClick={() => setActiveNav('home')}>
          <div className="landing-brand-logo">
            {/* Gotera Droplet Emblem */}
            <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
              <defs>
                <linearGradient id="brandDrop" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
              </defs>
              <path
                d="M18 3.5C12.5 10 8 15 8 21a10 10 0 0 0 20 0c0-6-4.5-11-10-17.5z"
                fill="url(#brandDrop)"
              />
              <circle cx="18" cy="21.5" r="5" fill="#34d399" opacity="0.9" />
              <path
                d="M18 18c-2 2-2 4 0 6"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="landing-brand-title">GOTERA</span>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className="landing-nav-links">
            <li>
              <button
                type="button"
                className={`landing-nav-link ${activeNav === 'home' ? 'active' : ''}`}
                onClick={() => setActiveNav('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`landing-nav-link ${activeNav === 'about' ? 'active' : ''}`}
                onClick={() => setShowInfoModal('about')}
              >
                About
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`landing-nav-link ${activeNav === 'food' ? 'active' : ''}`}
                onClick={() => handleFeatureClick('inventory')}
              >
                Food Items
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`landing-nav-link ${activeNav === 'warehouses' ? 'active' : ''}`}
                onClick={() => handleFeatureClick('warehouses')}
              >
                Warehouses
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`landing-nav-link ${activeNav === 'reports' ? 'active' : ''}`}
                onClick={() => handleFeatureClick('reports')}
              >
                Reports
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`landing-nav-link ${activeNav === 'contact' ? 'active' : ''}`}
                onClick={() => setShowInfoModal('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>

        {/* Authentication Actions */}
        <div className="landing-auth-actions">
          {currentUser ? (
            <>
              <button
                type="button"
                className="landing-btn-solid"
                onClick={onNavigateToDashboard}
              >
                Enter System ({currentUser.fullName.split(' ')[0]})
              </button>
              <button
                type="button"
                className="landing-btn-outline"
                onClick={onLogout}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="landing-btn-outline"
                onClick={() => onNavigateToAuth('login')}
              >
                Sign In
              </button>
              <button
                type="button"
                className="landing-btn-solid"
                onClick={() => onNavigateToAuth('register')}
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </header>

      {/* 2. Main Page Container */}
      <main className="landing-main">
        {/* Hero Section Banner */}
        <section className="landing-hero-card" aria-label="Gotera Emergency Food Reserve Overview">
          <div className="landing-hero-content">
            <div className="hero-logo-row">
              <div className="hero-drop-emblem" aria-hidden="true">
                <svg width="56" height="56" viewBox="0 0 36 36" fill="none">
                  <path
                    d="M18 3.5C12.5 10 8 15 8 21a10 10 0 0 0 20 0c0-6-4.5-11-10-17.5z"
                    fill="#10b981"
                  />
                  <circle cx="18" cy="21.5" r="5.5" fill="#34d399" />
                </svg>
              </div>
              <h1 className="hero-title">GOTERA</h1>
            </div>

            <p className="hero-subtitle">
              National Emergency Food Reserve Management System
            </p>

            <button
              type="button"
              className="hero-signin-btn"
              onClick={() => {
                if (currentUser) {
                  onNavigateToDashboard();
                } else {
                  onNavigateToAuth('login');
                }
              }}
            >
              {currentUser ? 'Go to Dashboard' : 'Sign In'}
            </button>
          </div>

          <div className="landing-hero-visual">
            <img
              src={heroImage}
              alt="National Food Reserve Warehouse with grain sacks and golden wheat harvests"
              className="landing-hero-img"
            />
            {/* SVG Organic Wave Divider */}
            <svg
              className="hero-curve-mask"
              viewBox="0 0 100 400"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0,0 C65,120 75,280 0,400 L0,0 Z"
                fill="#0e7b5f"
              />
            </svg>
          </div>
        </section>

        {/* 3. Quick Feature Cards (4 Cards) */}
        <section className="landing-features-grid" aria-label="System Capabilities">
          {/* Card 1: Food Collection */}
          <div
            className="feature-card"
            onClick={() => handleFeatureClick('receiving')}
            role="button"
            tabIndex={0}
            aria-label="Food Collection - Record incoming food supplies"
          >
            <div className="feature-icon-badge">
              <Package size={26} strokeWidth={2.2} />
            </div>
            <h2 className="feature-card-title">Food Collection</h2>
            <p className="feature-card-desc">Record incoming food supplies</p>
          </div>

          {/* Card 2: Storage Management */}
          <div
            className="feature-card"
            onClick={() => handleFeatureClick('warehouses')}
            role="button"
            tabIndex={0}
            aria-label="Storage Management - Manage warehouse stock"
          >
            <div className="feature-icon-badge">
              <Building2 size={26} strokeWidth={2.2} />
            </div>
            <h2 className="feature-card-title">Storage Management</h2>
            <p className="feature-card-desc">Manage warehouse stock</p>
          </div>

          {/* Card 3: Distribution */}
          <div
            className="feature-card"
            onClick={() => handleFeatureClick('distribution')}
            role="button"
            tabIndex={0}
            aria-label="Distribution - Track outgoing supplies"
          >
            <div className="feature-icon-badge">
              <Truck size={26} strokeWidth={2.2} />
            </div>
            <h2 className="feature-card-title">Distribution</h2>
            <p className="feature-card-desc">Track outgoing supplies</p>
          </div>

          {/* Card 4: Reports */}
          <div
            className="feature-card"
            onClick={() => handleFeatureClick('reports')}
            role="button"
            tabIndex={0}
            aria-label="Reports - View inventory and distribution data"
          >
            <div className="feature-icon-badge">
              <FileBarChart size={26} strokeWidth={2.2} />
            </div>
            <h2 className="feature-card-title">Reports</h2>
            <p className="feature-card-desc">View inventory and distribution data</p>
          </div>
        </section>

        {/* 4. Food Reserve Overview Section */}
        <section className="reserve-overview-section" aria-label="Food Reserve Overview Statistics">
          <h2 className="overview-heading">Food Reserve Overview</h2>

          <div className="overview-cards-grid">
            {/* Metric 1: Wheat */}
            <div className="overview-metric-card">
              <div className="overview-icon-circle overview-icon-wheat" aria-hidden="true">
                <Wheat size={24} />
              </div>
              <div className="overview-metric-info">
                <span className="overview-metric-value">{wheatVolume}</span>
                <span className="overview-metric-label">Wheat</span>
              </div>
            </div>

            {/* Metric 2: Rice */}
            <div className="overview-metric-card">
              <div className="overview-icon-circle overview-icon-rice" aria-hidden="true">
                <Soup size={24} />
              </div>
              <div className="overview-metric-info">
                <span className="overview-metric-value">{riceVolume}</span>
                <span className="overview-metric-label">Rice</span>
              </div>
            </div>

            {/* Metric 3: Maize */}
            <div className="overview-metric-card">
              <div className="overview-icon-circle overview-icon-maize" aria-hidden="true">
                {/* Corn / Maize icon representation */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a5 5 0 0 0-5 5v8a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
                  <path d="M7 10h10" />
                  <path d="M7 14h10" />
                  <path d="M12 2v20" />
                </svg>
              </div>
              <div className="overview-metric-info">
                <span className="overview-metric-value">{maizeVolume}</span>
                <span className="overview-metric-label">Maize</span>
              </div>
            </div>

            {/* Metric 4: Other Food Items */}
            <div className="overview-metric-card">
              <div className="overview-icon-circle overview-icon-other" aria-hidden="true">
                <Boxes size={24} />
              </div>
              <div className="overview-metric-info">
                <span className="overview-metric-value">{otherVolume}</span>
                <span className="overview-metric-label">Other Food Items</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Footer */}
      <footer className="landing-footer">
        <div className="footer-left">
          <div className="landing-brand-logo" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 36 36" fill="none">
              <path
                d="M18 3.5C12.5 10 8 15 8 21a10 10 0 0 0 20 0c0-6-4.5-11-10-17.5z"
                fill="#10b981"
              />
              <circle cx="18" cy="21.5" r="4.5" fill="#34d399" />
            </svg>
          </div>
          <span className="footer-brand-title">GOTERA</span>
        </div>

        <div className="footer-right">
          <div className="footer-links">
            <button type="button" className="footer-link" onClick={() => setActiveNav('home')}>
              Home
            </button>
            <button type="button" className="footer-link" onClick={() => setShowInfoModal('about')}>
              About
            </button>
            <button type="button" className="footer-link" onClick={() => setShowInfoModal('contact')}>
              Contact
            </button>
          </div>

          <div className="footer-divider" aria-hidden="true"></div>

          <div className="footer-copyright">
            © 2025 GOTERA. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Optional About Modal */}
      {showInfoModal === 'about' && (
        <div className="modal-backdrop" onClick={() => setShowInfoModal(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            <div className="modal-header">
              <h2 className="modal-title">About GOTERA Food Reserve System</h2>
              <button
                type="button"
                className="btn-icon"
                onClick={() => setShowInfoModal(null)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong>GOTERA</strong> is Ethiopia's National Emergency Food Reserve Management Platform, engineered to guarantee transparent monitoring of strategic grain reserves, rapid disaster relief distribution, and silo capacity optimization.
              </p>
              <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '12px', border: '1px solid #bbf7d0', marginBottom: '1rem' }}>
                <h4 style={{ color: '#047857', marginBottom: '0.35rem', fontWeight: '700' }}>Strategic Mandate</h4>
                <ul style={{ paddingLeft: '1.25rem', color: '#166534' }}>
                  <li>Maintain 60,000+ metric tons of strategic cereal reserves.</li>
                  <li>Real-time inventory synchronization across 8 major regional hubs.</li>
                  <li>Automated quality inspection clearance and tracking.</li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => setShowInfoModal(null)}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Optional Contact Modal */}
      {showInfoModal === 'contact' && (
        <div className="modal-backdrop" onClick={() => setShowInfoModal(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <h2 className="modal-title">National Food Reserve Contact</h2>
              <button
                type="button"
                className="btn-icon"
                onClick={() => setShowInfoModal(null)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>
              <p style={{ marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                For technical support, emergency requisitions, or donor coordination, reach out to the National Agency headquarters:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Building2 size={18} color="#059669" />
                  <span>National Disaster Risk Management Commission, Addis Ababa, Ethiopia</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Phone size={18} color="#059669" />
                  <span>+251 11 551 7000 / Toll Free: 833</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail size={18} color="#059669" />
                  <span>reserves@gotera.gov.et</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => setShowInfoModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
