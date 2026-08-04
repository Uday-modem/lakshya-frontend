import React, { useState, useEffect } from 'react'
import { jobsApi, applicationsApi } from '../api/api.js'

const FIELD_ORDER = [
  ['title', 'Title'],
  ['role', 'Role'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['qualification', 'Qualification'],
  ['modeOfWork', 'Mode of Work'],
  ['placeOfWork', 'Place of work'],
  ['salary', 'Salary'],
]

function naIfBlank(value) {
  return value && String(value).trim() && value !== 'Unknown' ? value : 'N/A'
}

export default function JobDetailModal({ job, onClose }) {
  const [fields, setFields] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!job) return
    setLoading(true)
    jobsApi
      .formatDescription(job)
      .then((data) => setFields(data))
      .catch(() => {
        // Network/API failure - still show a complete, consistent layout using
        // whatever we already have locally, rather than breaking the modal.
        setFields({
          title: naIfBlank(job.title),
          role: 'N/A',
          skills: 'N/A',
          experience: naIfBlank(job.experienceLevel),
          qualification: 'N/A',
          modeOfWork: naIfBlank(job.workMode),
          placeOfWork: naIfBlank(job.location),
          salary: naIfBlank(job.salary),
        })
      })
      .finally(() => setLoading(false))
  }, [job])

  if (!job) return null

  const handleApplyClick = () => {
    applicationsApi.record(job)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>

        <h2 className="job-title">{job.title}</h2>
        <p className="job-company">{job.company} · {job.location}</p>

        <div className="job-meta">
          <span>{job.workMode}</span>
          <span>{job.jobType}</span>
          <span>via {job.source}</span>
          {job.postedDate ? <span>Posted {job.postedDate}</span> : null}
        </div>

        {loading && (
          <div className="modal-description">
            <p>Loading job description…</p>
          </div>
        )}

        {!loading && fields && (
          <div className="modal-description jd-fixed-format">
            <h4 className="jd-heading">Job Description</h4>
            {FIELD_ORDER.map(([key, label]) => (
              <p key={key}><strong>{label}:</strong> {fields[key] || 'N/A'}</p>
            ))}
          </div>
        )}

        <a className="apply-btn modal-apply-btn" href={job.applyUrl} target="_blank" rel="noopener noreferrer" onClick={handleApplyClick}>
          Apply on {job.source}
        </a>
      </div>
    </div>
  )
}