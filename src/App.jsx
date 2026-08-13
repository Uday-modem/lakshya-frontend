import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Interviews from './pages/Interviews.jsx'
import Hackathons from './pages/Hackathons.jsx'
import Community from './pages/Community.jsx'

function App() {
  const [user, setUser] = useState(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('Lakshya_token')
    const fullName = localStorage.getItem('Lakshya_name')
    const email = localStorage.getItem('Lakshya_email')
    if (token && fullName) {
      setUser({ fullName, email })
    }
    setChecked(true)
  }, [])

  const handleAuth = (authResponse) => {
    localStorage.setItem('Lakshya_token', authResponse.token)
    localStorage.setItem('Lakshya_name', authResponse.fullName)
    localStorage.setItem('Lakshya_email', authResponse.email)
    setUser({ fullName: authResponse.fullName, email: authResponse.email })
  }

  const handleLogout = () => {
    localStorage.removeItem('Lakshya_token')
    localStorage.removeItem('Lakshya_name')
    localStorage.removeItem('Lakshya_email')
    setUser(null)
  }

  if (!checked) return null

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login onAuth={handleAuth} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup onAuth={handleAuth} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/interviews"
          element={user ? <Interviews user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/hackathons"
          element={user ? <Hackathons user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/community"
          element={user ? <Community user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
