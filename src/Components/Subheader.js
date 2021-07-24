import React from 'react'
import './Subheader.css'
import MenuIcon from '@material-ui/icons/Menu';
import { action } from '../reducer';
import { useStateValue } from '../StateProvider';

function Subheader() {
  const [{isSidebarOpen}, dispatch] =  useStateValue();
  return (
    <div className="subheader">
      <div className="subheader__left">
        <div 
          className="subheader__option"
          onClick={() => dispatch({
            type: action.OPEN_SIDEBAR,
            isSidebarOpen: true
          })}
        >
          <MenuIcon />
          <p><strong>All</strong></p>
        </div>
        <div className="subheader__option">
          <p>Today's Deals</p>
        </div>
        <div className="subheader__option">
          <p>Customer Service</p>
        </div>
      </div>
      <div className="subheader__right">
        <div className="subheader__option">
          <p><strong>Amazon's Response to COVID-19</strong></p>
        </div>
      </div>
    </div>
  )
}

export default Subheader
