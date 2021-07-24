import React from 'react'
import { Link } from 'react-router-dom'
import CountrySelect from '../Components/CountrySelect'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import Subheader from '../Components/Subheader'
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import categories from '../categories.json'
import products from '../products.json'
import './Searchscreen.css'
import { padZeros } from '../util'

function Searchscreen(props) {
  const key = props.match.params.key;

  const items = products.filter(
    product => product.name.toLowerCase().includes(
      key.toLowerCase()
    ) || product.description.toLowerCase().includes(
      key.toLowerCase()
    )
  )

  return (
    <div className="searchscreen">
      <Header />
      <Subheader />
      <Sidebar />
      <CountrySelect />

      <div className="searchscreen__body">
        <div className="searchscreen__body__left">
          <h3>Categories</h3>
          <div className="searchscreen__body__links">
            <Link 
              to="/categories/all"
            >
              All Categories
            </Link>
            {
              categories.map(category => (
                <Link 
                  key={category.id}
                  to={`/categories/${category.id}`}
                >
                  {category.name}
                </Link>
              ))
            }
          </div>
        </div>
        <div className="searchscreen__body__right">
          <h1>Results for "{key}"</h1>
          <div className="searchscreen__items">
            {
              items.slice(0, 12).map((item, index) => (
                <Link 
                  className="searchscreen__item"
                  key={index} 
                  to={`/products/${item.id}`}
                >
                  <img
                    src={item.img}
                    alt=""
                  />
                  <p className="searchscreen__item__name">{item.name}</p>
                  <div className="searchscreen__item__rating">
                    {
                      [...Array(Math.floor(item.rating))].map((item, index) => (
                        <StarIcon key={index} />
                      ))
                    }
                    {
                      item.rating%1!==0?<StarHalfIcon />:<></>
                    }
                    {
                      [...Array(Math.floor((5-item.rating).toFixed(1)))].map((item, index) => (
                        <StarBorderIcon key={index} />
                      ))
                    }
                  </div>
                  <p className="searchscreen__item__price">
                    $<strong>{Math.floor(item.price)}</strong>{padZeros(Math.floor((item.price%1)*100), 2)}
                  </p>
                </Link>
              ))
            }
          </div>
        
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default Searchscreen
