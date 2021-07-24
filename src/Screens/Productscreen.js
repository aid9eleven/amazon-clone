import React, { useEffect } from 'react'
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Subheader from '../Components/Subheader';
import products from '../products.json'
import categories from '../categories.json'
import { Link } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './Productscreen.css'
import CheckoutCard from '../Components/CheckoutCard';
import Sidebar from '../Components/Sidebar';
import CountrySelect from '../Components/CountrySelect';

function Productscreen(props) {
  const id = parseInt(props.match.params.id);

  const product = products.find(product => product.id === parseInt(id))
  const category = 
    typeof(product)!=="undefined"?
      categories.find(category => category.id === product.category)
    :
      {id:"all", name:"All categories"}

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="productscreen">
      <Header />
      <Subheader />
      <Sidebar />
      <CountrySelect />

      <div className="productscreen__body">
        <Link to={`/categories/${category.id}`} className="productscreen__breadcrumbs">
          See products under {category.name}
        </Link>

      {
        typeof(product)!=="undefined"?
          <div className="productscreen__product">
            <div className="productscreen__product__image">
              <img
                src={product.img}
                alt=""
              />
            </div>
            <div className="productscreen__product__details">
              <h1 className="productscreen__product__title">{product.name}</h1>
              <div className="productscreen__product__rating">
                <p>Rating: <strong>{product.rating}/5</strong> </p>
                <div>
                  {
                    [...Array(Math.floor(product.rating))].map((item, index) => (
                      <StarIcon key={index} />
                    ))
                  }
                  {
                    product.rating%1!==0?<StarHalfIcon />:<></>
                  }
                  {
                    [...Array(Math.floor((5-product.rating).toFixed(1)))].map((item, index) => (
                      <StarBorderIcon key={index} />
                    ))
                  }
                </div>
              </div>
              <p className="productscreen__product__price">
                Price: <strong>${product.price.toFixed(2)}</strong>
              </p>
              <div className="productscreen__product__description">
                <h3>Product description:</h3>
                <p>{product.description}</p>
              </div>
            </div>
            <CheckoutCard product={product} />
          </div>
        :
          <div className="productscreen__notice">Sorry, this item is either removed or does not exist.</div>
      }
      </div>

      <Footer />
    </div>
  )
}

export default Productscreen
