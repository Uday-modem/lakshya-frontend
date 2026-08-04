import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../api/api.js'
import '../styles/auth.css'

export default function Login({ onAuth }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await authApi.login({ email, password })
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
          Upload your resume once. We'll watch every board for you.
        </div>
        <div className="auth-stat-row">
          <div><strong>8</strong>job sources scanned</div>
          <div><strong>48h</strong>freshness window</div>
          <div><strong>0</strong>manual searching</div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <h1>Welcome back</h1>
          <p className="subtitle">Sign in to see jobs matched to your skills.</p>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit}>
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
                placeholder="••••••••"
              />
            </div>
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="auth-switch">
            New to Lakshya? <Link to="/signup">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
