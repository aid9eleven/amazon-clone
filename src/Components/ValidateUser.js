import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import './ValidateUser.css'

function ValidateUser() {

  const handleResendEmail = () => {
    auth.currentUser.sendEmailVerification()
  }

  return (
    <div className="validateUser">
      <Link to="/signin">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/175px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="validateUser__message">
        <h3>A verification link has been sent to your email account</h3>
        <hr />
        <p>
          Please click on the link that has just been sent to your email account
          to verify your email and continue with the registration form.
        </p>
      </div>
      <Link className="validateUser__link" to="/signin">Click here to sign in</Link>

      <p className="validateUser__link" onClick={handleResendEmail}>Resend verification link</p>
    </div>
  )
}

export default ValidateUser
