import React from 'react'

const WORK_MODES = ['Any', 'Remote', 'Hybrid', 'Office']
const JOB_TYPES = ['Any', 'Internship', 'Full-time']
const EXPERIENCE_LEVELS = ['Any', 'Fresher', '1-3 years', '3-5 years']
const POSTED_WITHIN = [
  { label: 'Any time', value: null },
  { label: 'Last 24 hours', value: 24 },
  { label: 'Last 48 hours', value: 48 },
]

export default function JobFilters({ filters, setFilters, onApply, applying, availableLocations = [] }) {
  const setField = (field, value) => setFilters((f) => ({ ...f, [field]: value }))

  const toggleLocation = (loc) => {
    setFilters((f) => {
      const current = f.selectedLocations || []
      const next = current.includes(loc) ? current.filter((l) => l !== loc) : [...current, loc]
      return { ...f, selectedLocations: next }
    })
  }

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

      <div className="filter-group">
        <label>Posted</label>
        <div className="filter-pills">
          {POSTED_WITHIN.map((opt) => (
            <button
              key={opt.label}
              className={`filter-pill ${filters.postedWithin === opt.value ? 'active' : ''}`}
              onClick={() => setField('postedWithin', opt.value)}
              type="button"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {availableLocations.length > 0 && (
        <div className="filter-group">
          <label>Locations in results</label>
          <div className="filter-pills">
            {availableLocations.map((loc) => (
              <button
                key={loc}
                className={`filter-pill ${(filters.selectedLocations || []).includes(loc) ? 'active' : ''}`}
                onClick={() => toggleLocation(loc)}
                type="button"
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      )}

      <button className="check-jobs-btn" onClick={onApply} disabled={applying} type="button">
        Apply filters
      </button>
    </div>
  )
}
