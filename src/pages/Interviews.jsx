import React from 'react'
import TopNav from '../components/TopNav.jsx'
import ComingSoon from '../components/ComingSoon.jsx'
import '../styles/dashboard.css'
import '../styles/platform.css'

export default function Interviews({ user, onLogout }) {
  return (
    <div className="dash-shell">
      <TopNav user={user} onLogout={onLogout} />
      <div className="page-body">
        <ComingSoon
          icon="🎙️"
          title="AI-Based Mock Interviews"
          tagline="Practice with an interviewer that adapts to the role you're applying for."
          description="Rehearse real interview scenarios drawn from your resume and target job, get instant scoring on your answers, and walk in prepared. This feature is being built and will roll out to your dashboard automatically once ready."
          features={[
            { icon: '🎯', title: 'Role-specific questions', desc: 'Generated from the job description and your matched skills.' },
            { icon: '🗣️', title: 'Voice & text practice', desc: 'Answer out loud or type — get feedback either way.' },
            { icon: '📊', title: 'Instant scorecards', desc: 'Clarity, confidence, and technical accuracy, broken down per answer.' },
            { icon: '🔁', title: 'Unlimited retakes', desc: 'Repeat any question until you feel ready to apply.' },
          ]}
          eta="Rolling out in phases — starting with technical roles."
        />
      </div>
    </div>
  )
}