import React from 'react'
import TopNav from '../components/TopNav.jsx'
import ComingSoon from '../components/ComingSoon.jsx'
import '../styles/dashboard.css'
import '../styles/platform.css'

export default function Hackathons({ user, onLogout }) {
  return (
    <div className="dash-shell">
      <TopNav user={user} onLogout={onLogout} />
      <div className="page-body">
        <ComingSoon
          icon="🏆"
          title="Hackathons"
          tagline="Build, ship, and get noticed by hiring teams."
          description="Join hackathons curated for your skill set, team up with other Lakshya members, and showcase working projects directly to recruiters. Leaderboards and winner spotlights are on the way."
          features={[
            { icon: '👥', title: 'Team formation', desc: 'Get matched with teammates based on complementary skills.' },
            { icon: '🧩', title: 'Curated challenges', desc: 'Problem statements from partner companies and open communities.' },
            { icon: '🥇', title: 'Leaderboards', desc: 'Track standings live and earn a place on your public profile.' },
            { icon: '💼', title: 'Recruiter visibility', desc: 'Standout submissions get surfaced to hiring teams on the platform.' },
          ]}
          eta="First hackathon cohort planned soon — watch this space."
        />
      </div>
    </div>
  )
}