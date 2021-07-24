import React, { useState } from 'react'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './CheckoutCard.css'
import db from '../firebase';
import firebase from 'firebase';
import { useStateValue } from '../StateProvider';
import { useHistory } from 'react-router-dom';

function CheckoutCard({product}) {
  const [{user, cart}, dispatch] = useStateValue()
  const [quantity, setQuantity] = useState(1)
  const history = useHistory()
  const maxQuantity = 20

  const addToCart = () => {
    if (user) {
      let item = cart.find(item => item.productId===product.id)
      if (typeof(item)!=="undefined") {
        db.collection("users").doc(user.uid)
        .collection("cart").doc(item.id).set({
          productId: product.id,
          checked: true,
          quantity: item.quantity + quantity,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
      }
      else {
        db.collection("users").doc(user.uid)
        .collection("cart").doc().set({
          productId: product.id,
          checked: true,
          quantity: quantity,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
      }
  
      alert("This item has been added to your cart")
      history.push("/cart")
    }
    else {
      history.push("/signin")
    }
  }

  const buyNow = () => {
    if (user) {
      if (window.confirm("Are you sure you would like to purchase this item?")) {
        db.collection("users").doc(user.uid)
        .collection("purchases").doc().set({
          productId: product.id,
          quantity: quantity,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
  
        alert("Thank you for shopping at Amazon")
        history.push("/youraccount/orders")
      }
    }
    else {
      history.push("/signin")
    }
  }

  return (
    <div className="checkoutCard">
      <div className="checkoutCard__price">
        <p>Total Cost:</p>
        <p className="checkoutCard__price__price">${(quantity*product.price).toFixed(2)}</p>
      </div>
      <div className="checkoutCard__quantity">
        <p>Qty:</p>
        <div className="checkoutCard__quantity__counter">
          <button 
            className="checkoutCard__quantity__decrement"
            onClick={() => {setQuantity(Math.max(1, quantity-1))}}
          >
            -
          </button>
          <p className="checkoutCard__quantity__count">{quantity}</p>
          <button 
            className="checkoutCard__quantity__increment"
            onClick={() => {setQuantity(Math.min(maxQuantity, quantity+1))}}
          >
            +
          </button>
        </div>
      </div>
      <button 
        className="checkoutCard__addToCart"
        onClick={addToCart}
      >
        <AddShoppingCartIcon />
        <p>Add to Cart</p>
      </button>
      <button 
        className="checkoutCard__buyNow"
        onClick={buyNow}
      >
        <PlayArrowIcon />
        <p>Buy Now</p>
      </button>
      <hr />
      <div className="checkoutCard__location">
        <LocationOnIcon />
        <p>Deliver to Philippines</p>
      </div>
    </div>
  )
}

export default CheckoutCard
