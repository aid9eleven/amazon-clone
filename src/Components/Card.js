import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

function Card({title, img, destination, link}) {
  return (
    <div className="card">
      <h2 className="card__title">{title}</h2>
      <Link className="card__image" to={destination}>
        <img
          src={img}
          alt=""
        />
      </Link>
      <Link className="card__link" to={destination}>{link}</Link>
    </div>
  )
}

export default Card