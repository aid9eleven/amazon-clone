import React from 'react'
import { Link } from 'react-router-dom'
import './Section.css'

function Section({title, destination, link, items}) {
  return (
    <div className="section">
      <div className="section__header">
        <h2 className="section__title">{title}</h2>
        <Link className="section__link" to={destination}>{link}</Link>
      </div>
      <div className="section__itemsContainer">
        <div className="section__items">
          {items.map((item, index) => (
            <Link key={index} to={`/products/${item.id}`}>
              <img
                src={item.img}
                alt=""
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Section
