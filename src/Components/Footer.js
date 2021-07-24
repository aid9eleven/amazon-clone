import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Footer.css'
import categories from '../categories.json'

function Footer() {

  const location = useLocation();

  const backToTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <div className="footer">
      <div className="footer__backToTop" onClick={backToTop}>
        Back to Top
      </div>
      <div className="footer__main">
        <div className="footer__links">
          <Link to="categories/all">All categories</Link>
          {
            categories.map(category => (
              <Link key={category.id} to={`/categories/${category.id}`}>{category.name}</Link>
            ))
          }
        </div>

        <hr />

        <div className="footer__credits">
          <Link 
            className="footer__logo" 
            to="/" 
            onClick={() => {
              if (location.pathname === "/") {
                backToTop()
              }
            }}
          >
            <img
              src="https://www.mabaya.com/wp-content/uploads/2019/10/amazon_PNG25.png"
              alt=""
            />
          </Link>
          <p className="footer__note">
            This Amazon clone is created by Adrian Cabriga for showcasing purposes only.
            All credits belong to Amazon.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
