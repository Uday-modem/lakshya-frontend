import React, { useState, useEffect } from 'react'
import { resumeApi, jobsApi, userApi } from '../api/api.js'
import ResumeUpload from '../components/ResumeUpload.jsx'
import SkillsList from '../components/SkillsList.jsx'
import JobFilters from '../components/JobFilters.jsx'
import JobList from '../components/JobList.jsx'
import ApplicationsHistory from '../components/ApplicationsHistory.jsx'
import TopNav from '../components/TopNav.jsx'
import DashboardStats from '../components/DashboardStats.jsx'
import '../styles/dashboard.css'
import '../styles/platform.css'

export default function Dashboard({ user, onLogout }) {
  const [skills, setSkills] = useState([])
  const [hasExistingResume, setHasExistingResume] = useState(false)
  const [allJobs, setAllJobs] = useState([])
  const [jobs, setJobs] = useState([])
  const [checking, setChecking] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState('')
  const [profileRefreshKey, setProfileRefreshKey] = useState(0)
  const [filters, setFilters] = useState({
    workMode: 'Any',
    location: '',
    jobType: 'Any',
    experienceLevel: 'Any',
  })

  useEffect(() => {
    resumeApi
      .getSkills()
      .then((res) => {
        setSkills(res.skills || [])
        setHasExistingResume((res.skills || []).length > 0)
      })
      .catch(() => {})
  }, [])

  const normalize = (value) => (value === 'Any' ? '' : value)

  const handleResumeParsed = (newSkills) => {
    setSkills(newSkills)
    setHasExistingResume(true)
    setProfileRefreshKey((k) => k + 1)
  }

  const handleCheckJobs = async () => {
    setError('')
    setChecking(true)
    setHasSearched(true)
    try {
      const res = await jobsApi.search({
        skills,
        workMode: normalize(filters.workMode),
        location: filters.location,
        jobType: normalize(filters.jobType),
        experienceLevel: normalize(filters.experienceLevel),
      })
      const fetched = res.jobs || []
      setAllJobs(fetched)
      setJobs(fetched)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not fetch jobs right now. Please try again.')
      setAllJobs([])
      setJobs([])
    } finally {
      setChecking(false)
    }
  }

  const hoursSince = (dateStr) => {
    if (!dateStr) return null
    const posted = new Date(dateStr)
    if (Number.isNaN(posted.getTime())) return null
    return (Date.now() - posted.getTime()) / (1000 * 60 * 60)
  }

  // Client-side only - filters the already-fetched job list, never calls the API again.
  const handleApplyFilters = () => {
    const wm = normalize(filters.workMode)
    const jt = normalize(filters.jobType)
    const exp = normalize(filters.experienceLevel)

    const result = allJobs.filter((job) => {
      if (wm && job.workMode && job.workMode !== 'Unknown' && job.workMode.toLowerCase() !== wm.toLowerCase()) return false
      if (jt && job.jobType && job.jobType !== 'Unknown' && !job.jobType.toLowerCase().includes(jt.toLowerCase())) return false
      if (exp && job.experienceLevel && job.experienceLevel !== 'Unknown' && job.experienceLevel.toLowerCase() !== exp.toLowerCase()) return false
      if (filters.location && job.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) return false
      if (filters.postedWithin) {
        const hrs = hoursSince(job.postedDate)
        if (hrs !== null && hrs > filters.postedWithin) return false
      }
      if (filters.selectedLocations && filters.selectedLocations.length > 0) {
        const jobLoc = (job.location || '').toLowerCase()
        const matches = filters.selectedLocations.some((loc) => jobLoc.includes(loc.toLowerCase()))
        if (!matches) return false
      }
      return true
    })

    setJobs(result)
  }

  return (
    <div className="dash-shell">
      <TopNav user={user} onLogout={onLogout} profileRefreshKey={profileRefreshKey} />

      <div className="dash-body-outer">
        <DashboardStats
          skills={skills}
          matchCount={jobs.length}
          hasSearched={hasSearched}
          refreshKey={profileRefreshKey + jobs.length}
        />

        <div className="dash-body">
        <div>
          <div className="panel">
            <h2>Your resume</h2>
            <p className="panel-subtitle">Upload a PDF to extract your skills automatically.</p>
            <ResumeUpload onParsed={handleResumeParsed} hasExistingResume={hasExistingResume} />
            <div style={{ marginTop: 18 }}>
              <SkillsList skills={skills} onCheckJobs={handleCheckJobs} checking={checking} />
            </div>
          </div>

          <JobFilters
            filters={filters}
            setFilters={setFilters}
            onApply={handleApplyFilters}
            applying={false}
            availableLocations={[...new Set(allJobs.map((j) => j.location).filter(Boolean))]}
          />

          <ApplicationsHistory refreshKey={jobs.length} />
        </div>

        <div>
          {error && <div className="banner-error">{error}</div>}
          <JobList jobs={jobs} loading={checking} hasSearched={hasSearched} />
        </div>
        </div>
      </div>
    </div>
  )
}