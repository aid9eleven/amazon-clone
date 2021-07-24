import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Sidebar.css'
import categories from '../categories.json'
import CloseIcon from '@material-ui/icons/Close';
import { useStateValue } from '../StateProvider';
import { action } from '../reducer';
import { auth } from '../firebase';
import { useEffect } from 'react';
import { truncateName } from '../util';

function Sidebar() {
  const [{user, isSidebarOpen}, dispatch] =  useStateValue();
  const history = useHistory()

  const handleSignin = () => {
    if (user) {
      auth.signOut()
    }
    
    history.push("/signin")
  }

  useEffect(() => {
    dispatch({
      type: action.OPEN_SIDEBAR,
      isSidebarOpen: false
    })
  }, [])

  return (
    <div className={`sidebar ${isSidebarOpen?"active":""}`}>
      <div 
        className="sidebar__shadow" 
        onClick={() => dispatch({
          type: action.OPEN_SIDEBAR,
          isSidebarOpen: false
        })}
      />
      <div className="sidebar__main">
        <div className="sidebar__header">
          <Link to="/">Hello, {user?truncateName(user.data.fullname):"Sign In"}</Link>
        </div>
        <div className="sidebar__content">
          <div className="sidebar__optionSet">
            <div className="sidebar__optionSet__header">
              Shop by category
            </div>
            <div className="sidebar__options">
              {
                categories.map(category => (
                  <Link 
                    className="sidebar__option"
                    key={category.id}
                    to={`/categories/${category.id}`}
                  >
                    {category.name}
                  </Link>
                ))
              }
            </div>
          </div>
          <hr />
          <div className="sidebar__optionSet">
            <div className="sidebar__optionSet__header">
              Help &#38; Settings
            </div>
            <div className="sidebar__options">
              <div 
                className="sidebar__option"
                onClick={() => history.push("/youraccount/home")}
              >
                Your Account
              </div>
              <div className="sidebar__option">
                Customer Service
              </div>
              <div 
                className="sidebar__option"
                onClick={handleSignin}
              >
                {user?"Sign Out":"Sign In"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div 
        className="sidebar__closeButton"
        onClick={() => dispatch({
          type: action.OPEN_SIDEBAR,
          isSidebarOpen: false
        })}
      >
        <CloseIcon />
      </div>
    </div>
  )
}

export default Sidebar
