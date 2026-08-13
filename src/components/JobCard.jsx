import React, { useState } from 'react'
import { applicationsApi, jobsApi } from '../api/api.js'

export default function JobCard({ job, onOpenDetail }) {
  const [displayTitle, setDisplayTitle] = useState(job.title)
  const [translatingTitle, setTranslatingTitle] = useState(false)

  const handleApplyClick = () => {
    applicationsApi.record(job)
  }

  const handleTranslateTitle = async () => {
    setTranslatingTitle(true)
    const translated = await jobsApi.translateTitle(job.title)
    if (translated) setDisplayTitle(translated)
    setTranslatingTitle(false)
  }

  const previewText = (job.description || '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^-\s+/gm, '')
    .replace(/\n+/g, ' ')
    .trim()

  return (
    <div className="job-card">
      <div className="company-avatar">{(job.company || '?').trim().charAt(0).toUpperCase()}</div>
      <div className="match-badge">
        <div className="pct">{Math.round(job.matchScore || 0)}%</div>
        <div className="lbl">MATCH</div>
      </div>

      <div className="job-main">
        <div className="job-title-row">
          <h3 className="job-title job-title-clickable" onClick={() => onOpenDetail({ ...job, title: displayTitle })}>
            {displayTitle}
          </h3>
          <button
            className="translate-title-btn"
            onClick={handleTranslateTitle}
            disabled={translatingTitle}
            type="button"
            title="Translate title to English"
          >
            {translatingTitle ? '…' : '🌐'}
          </button>
        </div>
        <p className="job-company">{job.company}</p>

        <div className="job-meta">
          <span>{job.location || 'N/A'}</span>
          <span>{job.workMode}</span>
          <span>{job.jobType}</span>
          {job.postedDate ? <span>Posted {job.postedDate}</span> : null}
          {job.salary ? <span className="salary-pill">{job.salary}</span> : null}
        </div>

        <p className="job-desc">{previewText}</p>

        <div className="job-footer">
          <button className="job-source-link" onClick={() => onOpenDetail({ ...job, title: displayTitle })} type="button">
            via {job.source} · view details
          </button>
          <a className="apply-btn" href={job.applyUrl} target="_blank" rel="noopener noreferrer" onClick={handleApplyClick}>
            Apply
          </a>
        </div>
      </div>
    </div>
  )
}