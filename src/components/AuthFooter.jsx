import React from 'react'

export default function AuthFooter() {
  return (
    <footer className="auth-footer">
      <div className="auth-footer-cta">
        <h2>Start your search</h2>
        <p>Need some inspiration? See what people are looking for on Lakshya today.</p>
      </div>

      <div className="auth-footer-grid">
        <div className="auth-footer-brand">
          <div className="auth-footer-brand-name">Lak<span>shya</span></div>
        </div>

        <div className="auth-footer-col">
          <h3>Lakshya</h3>
          <a href="#">About / Press</a>
          <a href="#">Awards</a>
          <a href="#">Blog</a>
          <a href="#">Research</a>
          <a href="#">Contact Us</a>
          <a href="#">Guides</a>
        </div>

        <div className="auth-footer-col">
          <h3>Employers</h3>
          <a href="#">Free Employer Account</a>
          <a href="#">Employer Centre</a>
          <a href="#">Employers Blog</a>
        </div>

        <div className="auth-footer-col">
          <h3>Information</h3>
          <a href="#">Help</a>
          <a href="#">Guidelines</a>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy and Ad Choices</a>
          <a href="#">Do Not Sell Or Share My Information</a>
          <a href="#">Cookie Consent Tool</a>
          <a href="#">Security</a>
        </div>

        <div className="auth-footer-col">
          <h3>Work With Us</h3>
          <a href="#">Advertisers</a>
          <a href="#">Careers</a>
        </div>
      </div>

      <div className="auth-footer-bottom">
        <div className="auth-footer-apps">
          <span>Download the App</span>
          <a href="#">Google Play</a>
          <a href="#">App Store</a>
        </div>
        <div className="auth-footer-social">
          <a href="#" aria-label="X">X</a>
          <a href="#" aria-label="LinkedIn">in</a>
          <a href="#" aria-label="YouTube">Yt</a>
          <a href="#" aria-label="Instagram">Ig</a>
          <a href="#" aria-label="TikTok">Tk</a>
        </div>
        <select className="auth-footer-region" defaultValue="India" aria-label="Region">
          <option>India</option>
        </select>
      </div>

      <div className="auth-footer-legal">
        <span>Browse by: Companies, Jobs, Locations, Community, Recent posts</span>
        <span>Copyright © 2026 Lakshya. All rights reserved.</span>
      </div>
    </footer>
  )
}