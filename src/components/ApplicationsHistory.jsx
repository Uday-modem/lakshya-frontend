import React, { useState, useEffect } from 'react'
import { applicationsApi } from '../api/api.js'

const STATUS_OPTIONS = ['Clicked', 'Applied', 'Interviewing', 'Rejected', 'Offer']

export default function ApplicationsHistory({ refreshKey }) {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    applicationsApi
      .list()
      .then((res) => setApplications(res.applications || []))
      .catch(() => {})
  }, [refreshKey])

  const handleStatusChange = async (id, newStatus) => {
    // Update locally right away so the dropdown feels instant
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)))
    await applicationsApi.updateStatus(id, newStatus)
  }

  if (applications.length === 0) return null

  return (
    <div className="panel" style={{ marginTop: 20 }}>
      <h2>Recent applications</h2>
      <p className="panel-subtitle">
        Jobs you clicked "Apply" on in Lakshya. We can't verify what happened on the
        employer's site, so status here is set by you - update it as things progress.
      </p>
      <div className="applications-list">
        {applications.slice(0, 8).map((app) => (
          <div key={app.id} className="application-item">
            <div className="app-title">{app.jobTitle}</div>
            <div className="app-meta">
              {app.company} · via {app.source} · {new Date(app.appliedAt).toLocaleDateString()}
            </div>
            <select
              className={`status-select status-${(app.status || 'Clicked').toLowerCase()}`}
              value={app.status || 'Clicked'}
              onChange={(e) => handleStatusChange(app.id, e.target.value)}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}