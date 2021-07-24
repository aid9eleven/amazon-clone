import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import './Header.css';
import categories from '../categories.json'
import { useStateValue } from '../StateProvider';
import { action } from '../reducer';
import { truncateName, sumAtToken } from '../util';

function Header() {
  const [dropdown, setDropdown] = useState(false)
  const [searchKey, setSearchKey] = useState("")
  const [searchCategory, setSearchCategory] = useState({id: "all", name: "All"})
  const [{user, cart, country}, dispatch] =  useStateValue();
  const history = useHistory()

  const cartItemsCount = user?(sumAtToken(cart, "quantity")):0

  const handleSignin = () => {
    if (user) {
      history.push("/youraccount")
    }
    else {
      history.push("/signin")
    }
  }

  const handleSearch = (key) => {
    history.push(`/search/${key}`)
  }

  return (
    <div className="header">
      <Link className="header__logo" to="/">
        <img
          src="https://www.mabaya.com/wp-content/uploads/2019/10/amazon_PNG25.png"
          alt=""
        />
      </Link>
      <div 
        className="header__deliveryLocation"
        onClick={() => dispatch({
          type: action.OPEN_COUNTRY_SELECTOR,
          isCountrySelectorOpen: true
        })}
      >
        <LocationOnOutlinedIcon />
        <div className="header__deliveryLocation__label">
          <span>Deliver to</span>
          <p><strong>{country.name}</strong></p>
        </div>
      </div>
      <form className="header__search">
        <div 
          className="header__search__categories"
          onClick={() => setDropdown(!dropdown)}
        >
          <p>{searchCategory.name}</p>
       <ArrowDropDownIcon />
          <div className={`header__search__dropdown ${dropdown?"active":""}`}>
            <div onClick={() => setSearchCategory({id: "all", name: "All"})}>
              All
            </div>
            {
              categories.map(category => (
                <div 
                  key={category.id}
                  onClick={() => setSearchCategory(category)}
                >
                  {category.name}
                </div>
              ))
            }
          </div>
        </div>
        <input 
          className="header__search__searchbar"
          value={searchKey}
          onChange={e => setSearchKey(e.currentTarget.value)}
        />
        <button
          onClick={() => handleSearch(searchKey)}
          className="header__search__search"
          type="sumbit"
        >
          <SearchIcon />
        </button>
      </form>
      <div 
        className="header__signIn"
        onClick={handleSignin}
      >
        <span>Hello, {user?truncateName(user.data.fullname, 20):"Sign in"}</span>
        <p><strong>Account</strong></p>
      </div>
      <div 
        className="header__returns"
        onClick={() => history.push("/youraccount/orders")}
      >
        <span>Returns</span>
        <p><strong>&#38; Orders</strong></p>
      </div>
      <div 
        className="header__cart"
        onClick={() => history.push("/cart")}
      >
        <div className="header__cart__icon">
          <ShoppingCartOutlinedIcon />
          <div className="header__cart__count">
            {cartItemsCount}
          </div>
        </div>
        <p><strong>Cart</strong></p>
      </div>
    </div>
  )
}

export default Header
