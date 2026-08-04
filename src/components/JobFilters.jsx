import React from 'react'

const WORK_MODES = ['Any', 'Remote', 'Hybrid', 'Office']
const JOB_TYPES = ['Any', 'Internship', 'Full-time']
const EXPERIENCE_LEVELS = ['Any', 'Fresher', '1-3 years', '3-5 years']

export default function JobFilters({ filters, setFilters, onApply, applying }) {
  const setField = (field, value) => setFilters((f) => ({ ...f, [field]: value }))

  return (
    <div className="panel" style={{ marginTop: 20 }}>
      <h2>Filters</h2>
      <p className="panel-subtitle">Narrow down jobs to what fits you.</p>

      <div className="filter-group">
        <label>Work mode</label>
        <div className="filter-pills">
          {WORK_MODES.map((mode) => (
            <button
              key={mode}
              className={`filter-pill ${filters.workMode === mode ? 'active' : ''}`}
              onClick={() => setField('workMode', mode)}
              type="button"
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>Location</label>
        <input
          type="text"
          placeholder="e.g. Bengaluru, London, Remote"
          value={filters.location}
          onChange={(e) => setField('location', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Job type</label>
        <div className="filter-pills">
          {JOB_TYPES.map((type) => (
            <button
              key={type}
              className={`filter-pill ${filters.jobType === type ? 'active' : ''}`}
              onClick={() => setField('jobType', type)}
              type="button"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>Experience</label>
        <div className="filter-pills">
          {EXPERIENCE_LEVELS.map((level) => (
            <button
              key={level}
              className={`filter-pill ${filters.experienceLevel === level ? 'active' : ''}`}
              onClick={() => setField('experienceLevel', level)}
              type="button"
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <button className="check-jobs-btn" onClick={onApply} disabled={applying} type="button">
        {applying ? 'Applying filters…' : 'Apply filters'}
      </button>
    </div>
  )
}
