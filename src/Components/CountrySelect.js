import React, { useEffect, useState } from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './CountrySelect.css'
import countries from '../countries.json'
import { useStateValue } from '../StateProvider'
import { action } from '../reducer';

function CountrySelect() {
  const [dropdown, setDropdown] = useState(false)
  const [{isCountrySelectorOpen, country}, dispatch] =  useStateValue();
  const [currentCountry, setCurrentCountry] = useState(country)

  const handleSetCountry = () => {
    dispatch({
      type: action.SET_COUNTRY,
      country: currentCountry
    })

    dispatch({
      type: action.OPEN_COUNTRY_SELECTOR,
      isCountrySelectorOpen: false
    })
  }

  useEffect(() => {
    setCurrentCountry(country)
  }, [isCountrySelectorOpen, country])

  useEffect(() => {
    dispatch({
      type: action.SET_COUNTRY,
      country: currentCountry
    })

    dispatch({
      type: action.OPEN_COUNTRY_SELECTOR,
      isCountrySelectorOpen: false
    })
  }, [])

  return (
    <div className={`countrySelect ${isCountrySelectorOpen?"active":""}`}>
      <div 
        className="countrySelect__shadow" 
        onClick={() => dispatch({
          type: action.OPEN_COUNTRY_SELECTOR,
          isCountrySelectorOpen: false
        })}
      />
      <div className="countrySelect__main">
        <div className="countrySelect__header">Choose your location</div>
        <div 
          className="countrySelect__select"
          onClick={() => setDropdown(!dropdown)}
        >
          <div className="countrySelect__select__select">
            <p>{currentCountry.name}</p>
            <ArrowDropDownIcon />
          </div>
          <div className={`countrySelect__dropdown ${dropdown?"active":""}`}>
            {
              countries.map(country => (
                <div 
                  key={country.id}
                  onClick={() => setCurrentCountry(country)}
                >
                  {country.name}
                </div>
              ))
            }
          </div>
        </div>
        <button onClick={handleSetCountry}>
          Done
        </button>
      </div>
    </div>
  )
}

export default CountrySelect
