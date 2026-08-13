import React from 'react'
import { NavLink } from 'react-router-dom'
import ProfileDropdown from './ProfileDropdown.jsx'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', soon: false },
  { to: '/interviews', label: 'Mock Interviews', soon: true },
  { to: '/hackathons', label: 'Hackathons', soon: true },
  { to: '/community', label: 'Community', soon: true },
]

export default function TopNav({ user, onLogout, profileRefreshKey }) {
  return (
    <nav className="dash-nav">
      <div className="dash-nav-left">
        <div className="brand">Lak<span>shya</span></div>
        <div className="nav-tabs">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-tab${isActive ? ' active' : ''}`}
            >
              {item.label}
              {item.soon && <span className="nav-tab-badge">Soon</span>}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="user-area">
        <span className="user-greeting">Hi, {user.fullName?.split(' ')[0]}</span>
        <ProfileDropdown user={user} refreshKey={profileRefreshKey} />
        <button className="logout-btn" onClick={onLogout}>Log out</button>
      </div>
    </nav>
  )
}