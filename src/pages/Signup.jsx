import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../api/api.js'
import '../styles/auth.css'

export default function Signup({ onAuth }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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

        <div className="auth-hero-block">
          <p className="auth-headline">
            Your aim, <span>our mission.</span>
          </p>
          <div className="auth-hero-frame">
            <img
              src="/images/lakshya-hero.png"
              alt="Illustration of a crowd competing for a single job opening, while a Lakshya user applies from their laptop and gets hired"
              className="auth-hero-img"
            />
          </div>
          <p className="auth-hero-caption">
            Join in a minute — your skills, matched against jobs posted in the last 48 hours.
          </p>
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
              <div className="password-field">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

         <div className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>

          <div className="auth-trust-note">
            🔒 Your resume and data stay private and are never shared without your action.
          </div>
        </div>
      </div>
    </div>
  )
}
