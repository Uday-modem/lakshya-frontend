import React from 'react'

const FOOTER_COLUMNS = [
  {
    heading: 'Lakshya',
    links: [
      { label: 'About / Press', href: '#' },
      { label: 'Awards', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Research', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Guides', href: '#' },
    ],
  },
  {
    heading: 'Employers',
    links: [
      { label: 'Free Employer Account', href: '#' },
      { label: 'Employer Centre', href: '#' },
      { label: 'Employers Blog', href: '#' },
    ],
  },
  {
    heading: 'Information',
    links: [
      { label: 'Help', href: '#' },
      { label: 'Guidelines', href: '#' },
      { label: 'Terms of Use', href: '#' },
      { label: 'Privacy and Ad Choices', href: '#' },
      { label: 'Do Not Sell Or Share My Information', href: '#' },
      { label: 'Cookie Consent Tool', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
  {
    heading: 'Work With Us',
    links: [
      { label: 'Advertisers', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
]

const SOCIAL_LINKS = [
  { label: 'X', href: '#' },
  { label: 'in', href: '#' },
  { label: 'Yt', href: '#' },
  { label: 'Ig', href: '#' },
  { label: 'Tk', href: '#' },
]

const BROWSE_BY = ['Companies', 'Jobs', 'Locations', 'Community', 'Recent posts']

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-prompt">
        <h3>Start your search</h3>
        <p>Need some inspiration? See what people are looking for on Lakshya today.</p>
      </div>

      <div className="footer-main">
        <div className="footer-brand-col">
          <div className="footer-brand">Lak<span>shya</span></div>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div className="footer-col" key={col.heading}>
            <h4>{col.heading}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom-row">
        <div className="footer-app-links">
          <span>Download the App</span>
          <a href="#" className="footer-app-badge">Google Play</a>
          <a href="#" className="footer-app-badge">App Store</a>
        </div>

        <div className="footer-social-links">
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} className="footer-social-icon" aria-label={s.label}>
              {s.label}
            </a>
          ))}
        </div>

        <select className="footer-region-select" defaultValue="India">
          <option>India</option>
        </select>
      </div>

      <div className="footer-legal">
        <p className="footer-browse-by">
          Browse by:{' '}
          {BROWSE_BY.map((item, i) => (
            <React.Fragment key={item}>
              <a href="#">{item}</a>
              {i < BROWSE_BY.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))}
        </p>
        <p className="footer-copyright">
          Copyright © 2026 Lakshya. All rights reserved.
        </p>
      </div>
    </footer>
  )
}