import React, { useState } from 'react'
import './CartItem.css'
import CheckIcon from '@material-ui/icons/Check';
import products from '../products.json'
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { action } from '../reducer';
import db from '../firebase';

function CartItem({purchased=false, item}) {
  const [{user}, dispatch] = useStateValue()

  const handleCheckItem = () => {
    dispatch({
      type: action.INITIALIZE,
      initCount: 0
    })

    db.collection("users").doc(user.uid)
    .collection("cart").doc(item.id).set({
      productId: product.id,
      checked: !item.checked,
      quantity: item.quantity,
      timestamp: item.timestamp
    })
  }

  const handleIncrement = (increase) => {
    dispatch({
      type: action.INITIALIZE,
      initCount: 0
    })

    db.collection("users").doc(user.uid)
    .collection("cart").doc(item.id).set({
      productId: product.id,
      checked: item.checked,
      quantity: Math.max(1, item.quantity + increase),
      timestamp: item.timestamp
    })
  }

  const handleRemoveItem = () => {
    if (window.confirm("Remove this item from your cart?")) {
      dispatch({
        type: action.INITIALIZE,
        initCount: 0
      })

      db.collection("users").doc(user.uid)
      .collection("cart").doc(item.id).delete()
    }
  }

  const product = products.find(product => product.id===item.productId)

  return (
    <div className={`cartItem ${purchased?"purchased":""}`}>
      <div 
        className={`cartItem__checkbox ${item.checked?"checked":""}`}
        onClick={handleCheckItem}
      >
        <CheckIcon />
      </div>
      <Link className="cartItem__image" to={`/products/${product.id}`}>
        <img 
          src={product.img}
          alt=""
        />
      </Link>
      <div className="cartItem__details">
        <Link className="cartItem__title" to={`/products/${product.id}`}>
          {product.name}
        </Link>
        <div className="cartItem__quantity">
          <p>Qty:</p>
          <div className="cartItem__quantity__counter">
            <button 
              className="cartItem__quantity__decrement"
              onClick={() => handleIncrement(-1)}
            >
              -
            </button>
            <p className="cartItem__quantity__count">{item.quantity}</p>
            <button 
              className="cartItem__quantity__increment"
              onClick={() => handleIncrement(1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="cartItem__remove" onClick={handleRemoveItem}>
          <p>Remove from cart</p>
        </div>
      </div>
    </div>
  )
}

export default CartItem
