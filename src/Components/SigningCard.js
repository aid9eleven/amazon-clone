import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import InfoIcon from '@material-ui/icons/Info';
import db, { auth } from '../firebase';
import firebase from 'firebase'
import './SigningCard.css'
import { validateEmail } from '../util';
import { PASSWORD_MIN_LENGTH, signingType } from '../constants';

function SigningCard({type}) {
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confpassword , setConfpassword] = useState("")

  const history = useHistory()
  const location = useLocation()

  const handleSigning = (e) => {
    e.preventDefault()

    if (type===signingType.SIGNIN) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          history.push("/");
        })
        .catch((e) => alert(e.message));
    }

    else if (type===signingType.SIGNUP) {
      if (
        fullname.toString().replace(" ", "").length > 0 
        && email.toString().replace(" ", "").length > 0 
        && password.toString().length > 0 
        && confpassword.toString().length > 0 
      ) {
        if (validateEmail(email)) {
          if (password.length >= PASSWORD_MIN_LENGTH) {
            if (password===confpassword) {
              auth
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                  let user = firebase.auth().currentUser
                  db.collection("users").doc(user.uid).set({
                    fullname: fullname
                  })

                  user.sendEmailVerification()
                  history.push("/validateuser");
                })
                .catch((e) => alert(e.message));
            }
            else {
              alert ("Passwords do not match")
            }
          }
          else {
            alert(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
          }
        }
        else {
          alert("Email is not a valid email")
        }
      }
      else {
        alert("All fields must not be empty")
      }
    }
  }

  useEffect(() => {
    setFullname("")
    setEmail("")
    setPassword("")
    setConfpassword("")
  }, [location.pathname])

  return (
    <div className="signingCard">
      <h2 className="signingCard__title">
        {
          type===signingType.SIGNIN?
            "Sign In"
          :type===signingType.SIGNUP?
            "Sign Up"
          :
            ""
        }
      </h2>
      <form>
        {
          type===signingType.SIGNUP?
            <div className="signingCard__form__field">
              <p className="signingCard__form__label">
                Full name
              </p>
              <input 
                value={fullname}
                className="signingCard__form__input"
                onChange={e => setFullname(e.currentTarget.value)}
              />
            </div>
          :
            ""
        }
        <div className="signingCard__form__field">
          <p className="signingCard__form__label">
            Email
          </p>
          <input 
            value={email}
            className="signingCard__form__input"
            onChange={e => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="signingCard__form__field">
          <p className="signingCard__form__label">
            Password
          </p>
          <input 
            type="password"
            value={password}
            placeholder={
              type===signingType.SIGNUP?
                `At least ${PASSWORD_MIN_LENGTH} characters`
              :
                ""
            }
            className="signingCard__form__input"
            onChange={e => setPassword(e.currentTarget.value)}
          />
          {
            type===signingType.SIGNUP?
              <p className="signingCard__form__notice">
                <InfoIcon />
                Passwords must be at least {PASSWORD_MIN_LENGTH} characters
              </p>
            :
              ""
          }
        </div>
        {
          type===signingType.SIGNUP?
            <div className="signingCard__form__field">
              <p className="signingCard__form__label">
                Re-enter password
              </p>
              <input 
                type="password"
                value={confpassword}
                className="signingCard__form__input"
                onChange={e => setConfpassword(e.currentTarget.value)}
              />
            </div>
          :
            ""
        }

        <button
          className="signingCard__submitButton"
          type="submit"
          onClick={handleSigning}
        >
          {
            type===signingType.SIGNIN?
              "Sign In"
            :type===signingType.SIGNUP?
              "Create your Amazon account"
            :
              ""
          }
        </button>
      </form>
      {
        type===signingType.SIGNUP?
          <div className="signingCard__note">
            Already have an account?&nbsp;
            <Link to="/signin">
              Sign In 
              <ArrowRightIcon />
            </Link>
          </div>
        :
          ""
      }
    </div>
  )
}

export default SigningCard
