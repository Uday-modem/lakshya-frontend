import React, { useState } from 'react'
import JobCard from './JobCard.jsx'
import JobDetailModal from './JobDetailModal.jsx'

export default function JobList({ jobs, loading, hasSearched }) {
  const [selectedJob, setSelectedJob] = useState(null)

  return (
    <div className="panel">
      <div className="job-list-header">
        <h2>Jobs for you</h2>
        {hasSearched && !loading && (
          <span className="job-count">{jobs.length} match{jobs.length !== 1 ? 'es' : ''} · last 2 days</span>
        )}
      </div>

      {loading && (
        <div className="loading-state">
          <div className="icon">⏳</div>
          Scanning job boards for fresh matches…
        </div>
      )}

      {!loading && !hasSearched && (
        <div className="empty-state">
          <div className="icon">🧭</div>
          Upload your resume, then click "Check your eligible jobs" to see matches here.
        </div>
      )}

      {!loading && hasSearched && jobs.length === 0 && (
        <div className="empty-state">
          <div className="icon">📭</div>
          No fresh matches right now. Try widening your filters.
        </div>
      )}

      {!loading && jobs.map((job) => (
        <JobCard key={job.id} job={job} onOpenDetail={setSelectedJob} />
      ))}

      <JobDetailModal key={selectedJob ? selectedJob.id : 'none'} job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  )
}