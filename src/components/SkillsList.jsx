import React from 'react'

export default function SkillsList({ skills, onCheckJobs, checking }) {
  if (!skills || skills.length === 0) return null

  return (
    <div>
      <div className="skills-wrap">
        {skills.map((s) => (
          <span key={s} className="skill-chip">{s}</span>
        ))}
      </div>
      <button className="check-jobs-btn" onClick={onCheckJobs} disabled={checking}>
        {checking ? 'Checking eligible jobs…' : 'Check your eligible jobs'}
      </button>
    </div>
  )
}
