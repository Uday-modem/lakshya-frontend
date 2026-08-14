import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../api/api.js'
import skyImage from '../images/lakshya-hero-sky.png'
import groundImage from '../images/lakshya-hero-ground.png'
import AuthFooter from '../components/AuthFooter.jsx'
import PlatformPillars from '../components/PlatformPillars.jsx'
import '../styles/auth.css'

export default function Login({ onAuth }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
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

  const handleGoogleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'}/auth/google`
  }

  return (
    <div className="auth-page">
      <div className="auth-viewport">
        <header className="auth-topbar">
          <div className="auth-topbar-brand">Lak<span>shya</span></div>
          <div className="auth-topbar-actions">
            New to Lakshya? <Link to="/signup">Create an account</Link>
          </div>
        </header>

        <main className="auth-hero">
          <h1 className="auth-hero-headline">
            While others compete, <span>you get ahead.</span>
          </h1>
          <p className="auth-hero-sub">
            Upload your resume once. We'll watch every job board for you.
          </p>

          <div className="auth-hero-row">
            <div className="auth-card">
              <h2>Welcome back</h2>
              <p className="subtitle">Sign in to see jobs matched to your skills.</p>

              {error && <div className="form-error">{error}</div>}

              {!showEmailForm ? (
                <div className="auth-oauth">
                  <button type="button" className="btn-oauth" onClick={handleGoogleSignIn}>
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9C16.64 14.2 17.64 11.9 17.64 9.2z" />
                      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.94v2.33A9 9 0 0 0 9 18z" />
                      <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.16.28-1.7V4.97H.94A9 9 0 0 0 0 9c0 1.45.35 2.83.94 4.03l3.01-2.33z" />
                      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .94 4.97l3.01 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
                    </svg>
                    Continue with Google
                  </button>

                  <div className="auth-divider"><span>OR</span></div>

                  <button type="button" className="btn-outline" onClick={() => setShowEmailForm(true)}>
                    Continue with email
                  </button>
                </div>
              ) : (
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
                      autoFocus
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
                        placeholder="••••••••"
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
                    {loading ? 'Signing in…' : 'Sign in'}
                  </button>

                  <button type="button" className="btn-back" onClick={() => setShowEmailForm(false)}>
                    ← Back to all sign in options
                  </button>
                </form>
              )}

              <div className="auth-switch auth-switch--mobile">
                New to Lakshya? <Link to="/signup">Create an account</Link>
              </div>

              <div className="auth-trust-note">
                🔒 Your resume and data stay private and are never shared without your action.
              </div>
            </div>

            <div className="auth-illustrations">
              <img className="illustration-sky" src={skyImage} alt="" />
              <img className="illustration-ground" src={groundImage} alt="" />
            </div>
          </div>

          <div className="auth-stat-strip">
            <div><strong>8</strong><span>job sources scanned</span></div>
            <div className="auth-stat-divider" />
            <div><strong>48h</strong><span>freshness window</span></div>
            <div className="auth-stat-divider" />
            <div><strong>0</strong><span>manual searching</span></div>
          </div>

          <p className="auth-hero-quote">
            While everyone else fights for the same opening, you're already ahead of it.
          </p>
        </main>
      </div>

      <PlatformPillars />
      <AuthFooter />
    </div>
  )
}