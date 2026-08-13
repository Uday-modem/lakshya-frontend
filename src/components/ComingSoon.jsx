import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ComingSoon({ icon, title, tagline, description, features = [], eta }) {
  const [notified, setNotified] = useState(false)

  return (
    <div className="coming-soon-wrap">
      <div className="coming-soon-card">
        <div className="coming-soon-icon">{icon}</div>
        <span className="coming-soon-pill">In development</span>
        <h1>{title}</h1>
        <p className="coming-soon-tagline">{tagline}</p>
        <p className="coming-soon-desc">{description}</p>

        {features.length > 0 && (
          <div className="coming-soon-features">
            {features.map((f) => (
              <div className="coming-soon-feature" key={f.title}>
                <div className="csf-icon">{f.icon}</div>
                <div>
                  <div className="csf-title">{f.title}</div>
                  <div className="csf-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="coming-soon-actions">
          <button
            type="button"
            className="check-jobs-btn coming-soon-notify"
            disabled={notified}
            onClick={() => setNotified(true)}
          >
            {notified ? "You're on the list ✓" : 'Notify me when it launches'}
          </button>
          <Link to="/dashboard" className="coming-soon-back">← Back to Dashboard</Link>
        </div>

        {eta && <div className="coming-soon-eta">{eta}</div>}
      </div>
    </div>
  )
}