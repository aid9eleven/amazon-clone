import React, { useEffect } from 'react'
import CountrySelect from '../Components/CountrySelect'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import Subheader from '../Components/Subheader'
import './Cartscreen.css'
import { useStateValue } from '../StateProvider'
import CartItem from '../Components/CartItem'
import { action } from '../reducer'
import { sumAtToken } from '../util'
import products from '../products.json'
import db from '../firebase'
import firebase from 'firebase'
import { useHistory } from 'react-router-dom'

function Cartscreen() {
  const [{user, cart}, dispatch] = useStateValue()
  const history = useHistory()

  const handlePurchaseItems = () => {
    if (window.confirm("Are you sure you would like to purchase the selected items?")) {
      cart.filter(item => item.checked===true).map(item => {
        db.collection("users").doc(user.uid)
        .collection("purchases").doc().set({
          productId: item.productId,
          quantity: item.quantity,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
  
        db.collection("users").doc(user.uid)
        .collection("cart").doc(item.id).delete()
      })
  
      alert("Thank you for shopping at Amazon")
      history.push("/youraccount/orders")
    }
  }

  useEffect(() => {
    dispatch({
      type: action.INITIALIZE,
      initCount: 0
    })
  }, [])

  return (
    <div className="cartscreen">
      <Header />
      <Subheader />
      <Sidebar />
      <CountrySelect />
      
      <div className="cartscreen__body">
        <div className="cartscreen__items">
          <h1>Shopping Cart</h1>
          {
            cart.length>0?
              cart.map((item, index) => (
                <CartItem key={index} item={item} />
              ))
            :
              <p className="cartscreen__notice">You have no items in your cart</p>
          }
        </div>
        <div className="cartscreen__checkout">
          <h2>Subtotal (
            {
              user?
                typeof(cart.filter(item => item.checked===true))!=="undefined"?
                  sumAtToken(cart.filter(item => item.checked===true), "quantity")
                :0
              :0
            }
            &nbsp;items):&nbsp;$
            {
              user?
                typeof(cart.filter(item => item.checked===true))!=="undefined"?
                  cart.filter(item => item.checked===true).reduce(
                    (sum, item) => {
                      return (sum + (item["quantity"]
                      *products.find(product => product.id===item.productId).price)).toFixed(2)
                    }
                  ,0)
                :0
              :0
            }
          </h2>
          <button onClick={handlePurchaseItems}>
            Purchase selected items
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Cartscreen
