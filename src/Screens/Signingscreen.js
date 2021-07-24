import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import SigningCard from '../Components/SigningCard'
import { signingType } from '../constants'
import { auth } from '../firebase'
import './Signingscreen.css'

function Signingscreen({type}) {
  const history = useHistory()

  useEffect(() => {
    window.scrollTo(0, 0)
    auth.signOut()
  }, [])

  return (
    <div className="signingscreen">
      <Link className="signingscreen__logo" to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/175px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="signingscreen__main">
        <SigningCard type={type}/>
        {
          type===signingType.SIGNIN?
            <>
              <div className="signingscreen__separator"><p>New to Amazon?</p></div>
              <button
                className="signingscreen__button"
                onClick={() => history.push("/signup")}
              >
                Create your Amazon account
              </button>
            </>
          :
            ""
        }
      </div>
    </div>
  )
}

export default Signingscreen
