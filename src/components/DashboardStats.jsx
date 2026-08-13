import React, { useEffect, useState } from 'react'
import { applicationsApi } from '../api/api.js'

const SOURCES_SCANNED = 8

export default function DashboardStats({ skills, matchCount, hasSearched, refreshKey }) {
  const [appliedCount, setAppliedCount] = useState(null)

  useEffect(() => {
    applicationsApi
      .list()
      .then((res) => setAppliedCount((res.applications || []).length))
      .catch(() => {})
  }, [refreshKey])

  const topSkill = skills && skills.length > 0 ? skills[0] : '—'

  const stats = [
    { label: 'Matches today', value: hasSearched ? matchCount : '—' },
    { label: 'Applied', value: appliedCount === null ? '—' : appliedCount },
    { label: 'Sources scanned', value: SOURCES_SCANNED },
    { label: 'Top skill match', value: topSkill },
  ]

  return (
    <div className="stats-bar">
      {stats.map((s) => (
        <div className="stat-tile" key={s.label}>
          <div className="stat-label">{s.label}</div>
          <div className="stat-value">{s.value}</div>
        </div>
      ))}
    </div>
  )
}