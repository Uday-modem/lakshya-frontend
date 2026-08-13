import React from 'react'
import TopNav from '../components/TopNav.jsx'
import ComingSoon from '../components/ComingSoon.jsx'
import '../styles/dashboard.css'
import '../styles/platform.css'

export default function Community({ user, onLogout }) {
  return (
    <div className="dash-shell">
      <TopNav user={user} onLogout={onLogout} />
      <div className="page-body">
        <ComingSoon
          icon="💬"
          title="Community"
          tagline="One place for drive updates, referrals, and honest questions."
          description="A dedicated space to share off-campus drives, ask about a company's interview process, or get help with a bug on the platform itself — moderated and organised by topic so nothing gets lost."
          features={[
            { icon: '📢', title: 'Drive & off-campus alerts', desc: 'Members post openings as soon as they find them.' },
            { icon: '❓', title: 'Q&A threads', desc: 'Ask about interview rounds, CTC ranges, or company culture.' },
            { icon: '🛠️', title: 'Platform support', desc: 'Report issues or request features directly to the team.' },
            { icon: '🌐', title: 'Topic channels', desc: 'Filter by domain — SDE, data, core, product, and more.' },
          ]}
          eta="Community guidelines and channels are being finalised."
        />
      </div>
    </div>
  )
}