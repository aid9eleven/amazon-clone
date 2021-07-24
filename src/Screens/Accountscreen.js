import React, { useEffect, useState } from 'react'
import './Accountscreen.css'
import Header from '../Components/Header'
import Subheader from '../Components/Subheader'
import Footer from '../Components/Footer'
import Sidebar from '../Components/Sidebar'
import CountrySelect from '../Components/CountrySelect'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import db, { auth } from '../firebase'
import firebase from 'firebase'
import { PASSWORD_MIN_LENGTH } from '../constants'
import { truncateName } from '../util'
import CheckIcon from '@material-ui/icons/Check';
import CartItem from '../Components/CartItem'
import { action } from '../reducer'

function Accountscreen(props) {
  const [{ user, purchases }, dispatch] = useStateValue()
  const [editingField, setEditingField] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editFullname, setEditFullname] = useState(user?user.data.fullname:"")
  const [editPhonenum, setEditPhonenum] = useState(user?user.data.phonenum:"")
  const [editPassword, setEditPassword] = useState("")
  const [editNewpassword, setEditNewpassword] = useState("")
  const [editConfpassword, setEditConfpassword] = useState("")
  const nav = props.match.params.nav;
  const history = useHistory()
  const location = useLocation()

  const options = [
    {
      nav: "orders",
      title: "Your Orders",
      description: "Track, return, or buy things again",
      image: "https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/ya/images/Box._CB485927553_.png"
    },
    {
      nav: "security",
      title: "Login & Security",
      description: "Edit login, name, and mobile number",
      image: "https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/ya/images/sign-in-lock._CB485931485_.png"
    },
    {
      nav: "prime",
      title: "Prime",
      description: "View benefits and payment settings",
      image: "https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/ya/images/Prime_clear-bg._CB423472251_.png"
    }
  ]

  const option = 
    nav==="home"?
      {
        nav: "home",
        title: "Your Account"
      }
    :
      options.find(option => nav===option.nav)

  if (typeof(option)==="undefined") {
    history.push("/youraccount/home")
  }

  const handleSignout = () => {
    if (user) {
      auth.signOut()
    }
    
    history.push("/signin")
  }

  const handleEdit = (field) => {
    if (!isEditing) {
      setEditingField(field)
    }
    else {
      if (field==="name") {
        if (editFullname.toString().replace(" ", "").length > 0) {
          db.collection("users").doc(user?user.uid:"").set({
            ...user.data, fullname: editFullname
          })
        }
        else {
          alert("Name cannot be blank")
        }
      }

      else if (field==="phone") {
        if (editPhonenum.toString().replace(" ", "").length > 0) {
          db.collection("users").doc(user?user.uid:"").set({
            ...user.data, phonenum: editPhonenum
          })
        }
        else {
          alert("Phone number cannot be blank")
        }
      }

      else if (field==="password") {

        if (editPassword.toString().length>0 && editNewpassword.toString().length!==0 
            && editConfpassword.toString().length!==0) {
              
          let credential = firebase.auth.EmailAuthProvider.credential(user.email, editPassword)
          let currentuser = firebase.auth().currentUser

          currentuser.reauthenticateWithCredential(credential).then(
            () => {
              if (editNewpassword > PASSWORD_MIN_LENGTH) {
                if (editNewpassword===editConfpassword) {
                  currentuser.updatePassword(editNewpassword).then(
                    alert("Your password has been updated")
                  ).catch(e => {
                    alert("Something wrong happened")
                  });
                }
                else {
                  alert ("Passwords do not match")
                }
              }
              else {
                alert(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
              }
            }
          ).catch(
            e => alert(e)
          );
        }

        else {
          alert("Please fill out all fields")
        }
      }
      setEditingField("")
    }

    setIsEditing(!isEditing)
  }

  useEffect (() => {
    window.scrollTo(0, 0)
    setIsEditing(false)
    setEditingField("")
    if (firebase.auth().currentUser===null) {
      history.push("/")
    }

  }, [location.pathname])

  useEffect(() => {
    setEditFullname(user?user.data.fullname:"")
    setEditPhonenum(user?(user.data.phonenum?user.data.phonenum:""):"")
    setEditPassword("")
    setEditNewpassword("")
    setEditConfpassword("")
  }, [isEditing])

  useEffect(() => {
    dispatch({
      type: action.INITIALIZE,
      initCount: 0
    })
  }, [])

  return (
    <div className="accountscreen">
      <Header />
      <Subheader />
      <Sidebar />
      <CountrySelect />
      
      <div className="accountscreen__body">
        <div className="accountscreen__wrapper">
          {
            nav!=="home"?
              <div className="accountscreen__breadcrumbs">
                <Link to="/youraccount/home">
                  Your Account
                </Link>
                  &#62;
                <p>
                  {option.title}
                </p>
              </div>
            :
              ""
          }
          <h2 className="accountscreen__title">{option.title}</h2>
          {
            nav==="home"?
              <>
                <div className="accountscreen__grid">
                  {
                    options.map((option, index) => (
                      <div 
                        key={index}
                        className="accountscreen__homeoption"
                        onClick={() => history.push(`/youraccount/${option.nav}`)}
                      >
                        <img 
                          src={option.image}
                          alt=""
                        />
                        <div className="accountscreen__homeoption__details">
                          <h3>{option.title}</h3>
                          <p>{option.description}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <hr />
                <div className="accountscreen__grid">
                  <div className="accountscreen__linklist">
                    <h3>Ordering and shopping preferences</h3>
                    <p>Your addresses</p>
                    <p>Your Payments</p>
                    <p>Your Amazon profile</p>
                    <p>Archived orders</p>
                    <p>Manage your lists</p>
                    <p>Download order reports</p>
                    <p>1-Click settings</p>
                    <p>Amazon Fresh settings</p>
                    <p>Language preferences</p>
                    <p>Manage saved IDs</p>
                    <p>Coupons</p>
                    <p>Product Vouchers</p>
                    <p>VAT registration number</p>
                  </div>
                  <div className="accountscreen__linklist">
                    <h3>Digital content and devices</h3>
                    <p>Manage content and devices</p>
                    <p>Your apps</p>
                    <p>Prime Video settings</p>
                    <p>Amazon Music settings</p>
                    <p>Manage Amazon Drive and photos</p>
                    <p>Digital games and software</p>
                    <p>Twitch settings</p>
                    <p>Audible settings</p>
                    <p>Amazon Coins</p>
                    <p>Digital gifts you've received</p>
                    <p>Digital and device forum</p>
                  </div>
                  <div className="accountscreen__linklist">
                    <h3>Memberships and subscriptions</h3>
                    <p>Kindle Unlimited</p>
                    <p>Prime Video Channels</p>
                    <p>Music Unlimited</p>
                    <p>Subscribe &#038; Save</p>
                    <p>FreeTime Unlimited</p>
                    <p>Audible membership</p>
                    <p>Your Essentials</p>
                    <p>Magazine subscriptions</p>
                    <p>Other subscriptions</p>
                  </div>
                  <div className="accountscreen__linklist">
                    <h3>Communication and content</h3>
                    <p>Messages from Amazon and sellers</p>
                    <p>Email subscriptions</p>
                    <p>Advertising preferences</p>
                    <p>Communication preferences</p>
                    <p>Shipment updates via text</p>
                    <p>Alexa shopping notifications</p>
                    <p>Deals Notifications</p>
                    <p>Videos you've uploaded</p>
                  </div>
                  <div className="accountscreen__linklist">
                    <h3>Shopping programs and rentals</h3>
                    <p>Third Party Credit Card Installment</p>
                    <p>Manage Your Profiles</p>
                    <p>Rentals by Amazon</p>
                    <p>Amazon Household</p>
                    <p>Shop the Kids' Store by age</p>
                    <p>No-Rush rewards summary</p>
                    <p>Teens Program</p>
                    <p>Pet Profiles</p>
                    <p>Shop with Points</p>
                    <p>Amazon Second Chance</p>
                  </div>
                  <div className="accountscreen__linklist">
                    <h3>Other programs</h3>
                    <p>Account Linking</p>
                    <p>Amazon credit cards</p>
                    <p>Your seller account</p>
                    <p>Login with Amazon</p>
                    <p>Amazon Pay</p>
                    <p>Manage your trade-ins</p>
                    <p>Amazon Web Services</p>
                    <p>Amazon tax exemption program</p>
                  </div>
                </div>
              </>
            :
            nav==="orders"?
              <div className="accountscreen__purchases"> 
                {
                  purchases.length>0?
                    purchases.map((item, index) => (
                      <CartItem purchased key={index} item={item} />
                    ))
                  :
                    <p className="purchases__notice">You haven't placed an order yet.</p>
                }
              </div>
            :
            nav==="security"?
              <>
                <div className="accountscreen__securityoptions">
                  <div className="accountscreen__securityoption">
                    <div className={`accountscreen__securityoption__details ${editingField==="name"?"edit":""}`}>
                      <h3>Name:</h3>
                      <p>{user?user.data.fullname:""}</p>
                      <input 
                        value={editFullname}
                        onChange={(e) => setEditFullname(e.target.value)}
                      />
                    </div>
                    <button 
                      className={isEditing&&editingField!=="name"?"hidden":""}
                      onClick={() => handleEdit("name")}
                    >
                      {editingField==="name"?"Save":"Edit"}
                    </button>
                  </div>
                  <div className="accountscreen__securityoption">
                    <div className="accountscreen__securityoption__details">
                      <h3>Email:</h3>
                      <p>{user?user.email:""}</p>
                    </div>
                  </div>
                  <div className="accountscreen__securityoption">
                    <div className={`accountscreen__securityoption__details ${editingField==="phone"?"edit":""}`}>
                      <h3>Mobile Phone Number:</h3>
                      <p>{user?(user.data.phonenum?user.data.phonenum:"Add your phone number"):""}</p>
                      <input 
                        value={editPhonenum}
                        onChange={(e) => setEditPhonenum(e.target.value)}
                      />
                    </div>
                    <button 
                      className={isEditing&&editingField!=="phone"?"hidden":""}
                      onClick={() => handleEdit("phone")}
                    >
                      {editingField==="phone"?"Save":"Edit"}
                    </button>
                  </div>
                  <div className="accountscreen__securityoption">
                    <div className={`accountscreen__securityoption__details ${editingField==="password"?"edit":""}`}>
                      <h3>Password:</h3>
                      <p>********</p>
                      <input 
                        type="password"
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                        placeholder="Enter your old password"
                      />
                      <input 
                        type="password"
                        value={editNewpassword}
                        onChange={(e) => setEditNewpassword(e.target.value)}
                        placeholder="Enter your new password"
                      />
                      <input 
                        type="password"
                        value={editConfpassword}
                        onChange={(e) => setEditConfpassword(e.target.value)}
                        placeholder="Re-enter your old password"
                      />
                    </div>
                    <button 
                      className={isEditing&&editingField!=="password"?"hidden":""}
                      onClick={() => handleEdit("password")}
                    >
                      {editingField==="password"?"Save":"Edit"}
                    </button>
                  </div>
                  <div className="accountscreen__securityoption">
                    <div className="accountscreen__securityoption__details">
                      <h3>Logout your account</h3>
                    </div>
                    <button
                      onClick={handleSignout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <button onClick={() => history.push("/youraccount/home")}>
                  Done
                </button>
              </>
            :
            nav==="prime"?
              <div className="accountscreen__prime">
                <div className="accountscreen__prime__info">
                  <h1>
                    {user?truncateName(user.data.fullname):"User"}, we're giving you a 
                    30-day FREE trial of Prime
                  </h1>
                  <h3>
                    No commitments. Cancel anytime.
                  </h3>
                  <div className="accountscreen__prime__feature">
                    <CheckIcon/>
                    <p>Fast, FREE delivery</p>
                  </div>
                  <div className="accountscreen__prime__feature">
                    <CheckIcon/>
                    <p>Award winning movies and TV shows</p>
                  </div>
                  <div className="accountscreen__prime__feature">
                    <CheckIcon/>
                    <p>Ad-free music streaming</p>
                  </div>
                  <button>
                    START YOUR 30-DAY TRIAL
                  </button>
                  <p>
                    After your FREE trial, Prime is just $1299/month 
                    (plus any applicable taxes). Cancel anytime.
                  </p>
                  <p>
                    <strong>Special offer:</strong> You could qualify for 50% off Prime. |&nbsp;
                    <p className="accountscreen__prime__link">Are you a student?</p> |&nbsp;
                    <p className="accountscreen__prime__link">Have an EBT card/receive 
                    government assistance?</p>
                  </p>
                  <p className="accountscreen__prime__link">
                    SEE MORE PLANS
                  </p>
                </div>
                <img
                  className="accountscreen__prime__largeImage"
                  src="https://m.media-amazon.com/images/G/01/marketing/prime/prime_box._CB406216729_.png"
                  alt=""
                />
                <img
                  className="accountscreen__prime__logo"
                  src="https://m.media-amazon.com/images/G/01/marketing/prime/detail_page/PrimeLogo_White._CB485943134_.svg"
                  alt=""
                />
              </div>
            :
              ""
          }
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Accountscreen
