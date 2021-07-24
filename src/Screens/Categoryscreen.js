import React, { useEffect } from 'react'
import categories from '../categories.json'
import products from '../products.json'
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Subheader from '../Components/Subheader';
import Sidebar from '../Components/Sidebar';
import CountrySelect from '../Components/CountrySelect';
import './Categoryscreen.css'
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { padZeros } from '../util';

function Categoryscreen(props) {
  const id = props.match.params.id;
  const [{allProducts, topSellers}] = useStateValue()

  const history = useHistory()
  
  const category = 
    id==="all"?
      {id:"all", name: "All categories"}
    :id==="top"?
      {id:"top", name:"Top Sellers"}
    :
      categories.find(category => category.id === parseInt(id))
   
  const items = 
    id==="all"?
      allProducts
    :id==="top"?
      topSellers
    :
      products.filter(product => product.category === parseInt(id))

  useEffect(() => {
    window.scrollTo(0, 0)
    if (typeof(category)==="undefined") {
      history.push("/categories/all")
    }
  }, [])

  return (
    <div className="categoryscreen">
      <Header />
      <Subheader />
      <Sidebar />
      <CountrySelect />

      <div className="categoryscreen__body">
        <div className="categoryscreen__body__left">
          <h3>Categories</h3>
          <div className="categoryscreen__body__links">
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
        <div className="categoryscreen__body__right">
          <h1>{category.name}</h1>
          <div className="categoryscreen__items">
            {
              items.slice(0, 12).map((item, index) => (
                <Link 
                  className="categoryscreen__item"
                  key={index} 
                  to={`/products/${item.id}`}
                >
                  <img
                    src={item.img}
                    alt=""
                  />
                  <p className="categoryscreen__item__name">{item.name}</p>
                  <div className="categoryscreen__item__rating">
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
                  <p className="categoryscreen__item__price">
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

export default Categoryscreen
