import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../api/api.js'
import '../styles/auth.css'

export default function Signup({ onAuth }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      const res = await authApi.signup({ fullName, email, password })
      onAuth(res)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-brand">Lak<span>shya</span></div>
        <div className="auth-tagline">
          Your skills, matched against jobs posted in the last 48 hours.
        </div>
        <div className="auth-stat-row">
          <div><strong>8</strong>job sources scanned</div>
          <div><strong>48h</strong>freshness window</div>
          <div><strong>0</strong>manual searching</div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <h1>Create your account</h1>
          <p className="subtitle">Takes less than a minute.</p>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jordan Lee"
              />
            </div>
            <div className="field-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="field-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
              />
            </div>
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <div className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
