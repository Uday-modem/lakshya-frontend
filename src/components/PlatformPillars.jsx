import React from 'react'

const PILLARS = [
  {
    label: 'AI Mock Interviews',
    sub: 'Practice, get real feedback',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="9" r="4" stroke="#12233D" strokeWidth="1.6" />
        <path d="M5 21c1.4-3.6 4.6-5.5 8-5.5s6.6 1.9 8 5.5" stroke="#12233D" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M17 6.5l2 1.3-2 1.3" stroke="#C99A3B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Find & Apply to Jobs',
    sub: 'Every board, one place',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="4" y="9" width="18" height="13" rx="2" stroke="#12233D" strokeWidth="1.6" />
        <path d="M9 9V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#12233D" strokeWidth="1.6" />
        <path d="M4 14h18" stroke="#C99A3B" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: 'Hackathons',
    sub: 'Build, showcase, win',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M6 5l6 6-3 3-6-6 3-3Z" stroke="#12233D" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M20 5l-6 6 3 3 6-6-3-3Z" stroke="#12233D" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 14l-4 7 7-4" stroke="#C99A3B" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Resume Building',
    sub: 'AI-polished in minutes',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="5" y="3" width="16" height="20" rx="2" stroke="#12233D" strokeWidth="1.6" />
        <path d="M8.5 8h9M8.5 12h9M8.5 16h5.5" stroke="#C99A3B" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Community',
    sub: 'Learn alongside peers',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="9" cy="9" r="3" stroke="#12233D" strokeWidth="1.6" />
        <circle cx="18" cy="10" r="2.4" stroke="#C99A3B" strokeWidth="1.6" />
        <path d="M3.5 20c1-3 3-4.6 5.5-4.6s4.5 1.6 5.5 4.6" stroke="#12233D" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M15.5 15.8c2.1.2 3.6 1.7 4.4 4.2" stroke="#C99A3B" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function PlatformPillars() {
  return (
    <section className="auth-pillars">
      <h2>Get ahead with Lakshya</h2>
      <p>Everything you need to land the next role, in one place.</p>

      <div className="auth-pillars-grid">
        {PILLARS.map((p) => (
          <div className="auth-pillar" key={p.label}>
            <div className="auth-pillar-icon">{p.icon}</div>
            <div className="auth-pillar-label">{p.label}</div>
            <div className="auth-pillar-sub">{p.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}