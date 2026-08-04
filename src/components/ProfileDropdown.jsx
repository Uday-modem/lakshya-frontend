import React, { useState, useEffect, useRef } from 'react'
import { userApi } from '../api/api.js'

export default function ProfileDropdown({ user, refreshKey }) {
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    userApi.getProfile().then(setProfile).catch(() => {})
  }, [refreshKey])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const field = (label, value) => (
    <div className="profile-field">
      <div className="field-label">{label}</div>
      <div className={`field-value ${!value ? 'muted' : ''}`}>
        {value || 'Not detected from resume'}
      </div>
    </div>
  )

  return (
    <div className="profile-wrap" ref={wrapRef}>
      <button className="profile-trigger" onClick={() => setOpen((o) => !o)} type="button">
        Profile
      </button>

      {open && profile && (
        <div className="profile-dropdown">
          <h3>{profile.fullName}</h3>
          <p className="profile-email">{profile.email}</p>

          {field('Phone', profile.phone)}
          {field('Education', profile.education)}
          {field('Experience', profile.experienceSummary)}

          <div className="profile-field">
            <div className="field-label">Skills ({profile.skills?.length || 0})</div>
            <div className="skills-wrap" style={{ marginTop: 6 }}>
              {(profile.skills || []).map((s) => (
                <span key={s} className="skill-chip">{s}</span>
              ))}
              {(!profile.skills || profile.skills.length === 0) && (
                <span className="field-value muted">Upload a resume to populate this</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}