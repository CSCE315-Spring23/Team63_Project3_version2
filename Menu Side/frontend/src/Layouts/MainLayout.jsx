import React from 'react'
import {Link} from 'react-router-dom'

function MainLayout({children}) {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container">
            <Link to="./logo192.png" className="navbar-brand">Menu</Link>
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
