/**
 * LandingPage.jsx
 * Gotera National Emergency Food Reserve Management System
 * Landing / Home Page matching the official design mockup
 */

import { useState } from 'react';
import {
  Package,
  Building2,
  Truck,
  FileBarChart,
  Wheat,
  Soup,
  Boxes,
  ShieldCheck,
  Building,
  CheckCircle2,
  Phone,
  Mail,
  MapPin
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

  const handleFeatureKeyDown = (e, targetTab) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFeatureClick(targetTab);
    }
  };

  const scrollToSection = (id) => {
    setActiveNav(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      {/* 1. Top Navbar */}
      <header className="landing-navbar" role="banner">
        <div className="landing-brand" onClick={() => scrollToSection('home')}>
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

        {/* Navigation Links: Home, About, Food Items, Contact */}
        {/* Navigation Links: Home, About, Contact */}
        <nav aria-label="Main Navigation">
          <ul className="landing-nav-links">
            <li>
              <button
                type="button"
                className={`landing-nav-link ${activeNav === 'home' ? 'active' : ''}`}
                onClick={() => scrollToSection('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`landing-nav-link ${activeNav === 'about' ? 'active' : ''}`}
                onClick={() => scrollToSection('about')}
              >
                About
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`landing-nav-link ${activeNav === 'contact' ? 'active' : ''}`}
                onClick={() => scrollToSection('contact')}
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
            onKeyDown={(e) => handleFeatureKeyDown(e, 'receiving')}
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
            onKeyDown={(e) => handleFeatureKeyDown(e, 'warehouses')}
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
            onKeyDown={(e) => handleFeatureKeyDown(e, 'distribution')}
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
            onKeyDown={(e) => handleFeatureKeyDown(e, 'reports')}
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

            {/* Metric 4: Other Reserves */}
            <div className="overview-metric-card">
              <div className="overview-icon-circle overview-icon-other" aria-hidden="true">
                <Boxes size={24} />
              </div>
              <div className="overview-metric-info">
                <span className="overview-metric-value">{otherVolume}</span>
                <span className="overview-metric-label">Other Reserves</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. In-Page About Section (Smoothly scrolled to when About is clicked) */}
        <section id="about" className="landing-about-section" aria-label="About Gotera System">
          <div className="about-header">
            <span className="about-badge">About GOTERA</span>
            <h2 className="about-title">National Emergency Food Reserve System</h2>
            <p className="about-description">
              GOTERA is Ethiopia's dedicated national food reserve infrastructure, built to safeguard national food security, coordinate emergency food relief, and ensure strategic agricultural buffer stocks across regional hubs.
            </p>
          </div>

          <div className="about-pillars-grid">
            <div className="about-pillar-card">
              <div className="pillar-icon-box">
                <ShieldCheck size={24} />
              </div>
              <h3 className="pillar-title">Strategic Crop Reserves</h3>
              <p className="pillar-text">
                Continuous monitoring of over 60,000 metric tons of wheat, rice, maize, teff, and emergency pulses stored in state-of-the-art regional grain silos.
              </p>
            </div>

            <div className="about-pillar-card">
              <div className="pillar-icon-box">
                <Building size={24} />
              </div>
              <h3 className="pillar-title">Multi-Hub Network</h3>
              <p className="pillar-text">
                Synchronized warehouse operations spanning Adama, Mekelle, Bahir Dar, Gambella, Dire Dawa, Hawassa, Kombolcha, and Jigjiga.
              </p>
            </div>

            <div className="about-pillar-card">
              <div className="pillar-icon-box">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="pillar-title">Verified Quality Control</h3>
              <p className="pillar-text">
                Rigorous inspection protocols verifying moisture, packaging, and shelf-life readiness prior to intake and humanitarian dispatch.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Integrated Footer & Official Contact Landmark */}
      <footer id="contact" className="landing-footer" aria-label="Gotera Contact & Information">
        <div className="footer-top-container">
          {/* Column 1: Brand & Strategic Mandate */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand-header">
              <div className="landing-brand-logo" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                  <path
                    d="M18 3.5C12.5 10 8 15 8 21a10 10 0 0 0 20 0c0-6-4.5-11-10-17.5z"
                    fill="#10b981"
                  />
                  <circle cx="18" cy="21.5" r="4.5" fill="#34d399" />
                </svg>
              </div>
              <span className="footer-brand-title">GOTERA</span>
            </div>
            <p className="footer-brand-desc">
              Federal Democratic Republic of Ethiopia<br />
              National Emergency Food Reserve Agency — Strategic buffer crop reserves safeguarding food security across regional warehouse depots.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-col footer-col-nav">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-col-list">
              <li>
                <button type="button" className="footer-link-btn" onClick={() => scrollToSection('home')}>
                  Home
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => scrollToSection('about')}>
                  About GOTERA
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => handleFeatureClick('receiving')}>
                  Food Collection
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => handleFeatureClick('warehouses')}>
                  Storage Management
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Headquarters */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-col-title">Contact & Headquarters</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <MapPin className="footer-contact-icon" size={18} />
                <span>
                  National Disaster Risk Management Commission<br />
                  Addis Ababa, Ethiopia
                </span>
              </li>
              <li className="footer-contact-item">
                <Phone className="footer-contact-icon" size={18} />
                <span>
                  Emergency Hotline: <strong>833</strong> (Toll-Free)<br />
                  Direct Office: +251 11 551 7000
                </span>
              </li>
              <li className="footer-contact-item">
                <Mail className="footer-contact-icon" size={18} />
                <span>
                  reserves@gotera.gov.et<br />
                  coordination@gotera.gov.et
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & System Status */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © 2026 GOTERA National Emergency Food Reserve System. All rights reserved.
          </div>
          <div className="footer-status-tag">
            <span className="footer-status-dot"></span>
            Strategic Reserve Network Active • 8 Regional Depots
          </div>
        </div>
      </footer>
    </div>
  );
}
