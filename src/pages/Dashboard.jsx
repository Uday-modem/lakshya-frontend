import React, { useState, useEffect } from 'react'
import { resumeApi, jobsApi, userApi } from '../api/api.js'
import ResumeUpload from '../components/ResumeUpload.jsx'
import SkillsList from '../components/SkillsList.jsx'
import JobFilters from '../components/JobFilters.jsx'
import JobList from '../components/JobList.jsx'
import ProfileDropdown from '../components/ProfileDropdown.jsx'
import ApplicationsHistory from '../components/ApplicationsHistory.jsx'
import '../styles/dashboard.css'

export default function Dashboard({ user, onLogout }) {
  const [skills, setSkills] = useState([])
  const [hasExistingResume, setHasExistingResume] = useState(false)
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
    userApi
      .getProfile()
      .then((profile) => {
        setSkills(profile.skills || [])
        setHasExistingResume(!!profile.hasResume)
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
      setJobs(res.jobs || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Could not fetch jobs right now. Please try again.')
      setJobs([])
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="dash-shell">
      <nav className="dash-nav">
        <div className="brand">Lak<span>shya</span></div>
        <div className="user-area">
          <span>Hi, {user.fullName?.split(' ')[0]}</span>
          <ProfileDropdown user={user} refreshKey={profileRefreshKey} />
          <button className="logout-btn" onClick={onLogout}>Log out</button>
        </div>
      </nav>

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

          <JobFilters filters={filters} setFilters={setFilters} onApply={handleCheckJobs} applying={checking} />

          <ApplicationsHistory refreshKey={jobs.length} />
        </div>

        <div>
          {error && <div className="banner-error">{error}</div>}
          <JobList jobs={jobs} loading={checking} hasSearched={hasSearched} />
        </div>
      </div>
    </div>
  )
}