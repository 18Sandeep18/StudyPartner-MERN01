import React from 'react'

import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const handleCick = () => {
    logout()
  }
  return (
    <header>
      <div className='container'>
        <Link to="/">
          <h2>Study Partner</h2>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <button onClick={handleCick}>Log Out</button>
            </div>
          )}
          {!user && (
            <div className='links'>
              <Link to="/login">Login</Link>

              <Link to="/signup">Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
