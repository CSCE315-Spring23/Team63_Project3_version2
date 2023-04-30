import React from 'react'
import {Link} from 'react-router-dom'

function MainLayout({children}) {
  return (
    <div style={{backgroundColor: '#9fb0a8'}}>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#65706b', fontFamily: 'Poppins'}}>
          <div className="container">
            <Link to="/" className="navbar-brand">Menu</Link>
          </div>
        </nav>
      </header>
      <main>
        <div className='container mt-3'>
          {children}
        </div>
      </main>
    </div>
  )
}

export default MainLayout
