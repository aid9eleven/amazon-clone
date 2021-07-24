import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Homescreen from './Screens/Homescreen';
import Categoryscreen from './Screens/Categoryscreen';
import Productscreen from './Screens/Productscreen';
import Signingscreen from './Screens/Signingscreen';
import { useStateValue } from './StateProvider';
import { useEffect, useState } from 'react';
import db, { auth } from './firebase';
import ValidateUser from './Components/ValidateUser';
import Accountscreen from './Screens/Accountscreen';
import { MAX_INIT_COUNT, signingType } from './constants';
import { action } from './reducer';
import Cartscreen from './Screens/Cartscreen';
import Searchscreen from './Screens/Searchscreen';

function App() {
  const [{ user, initCount }, dispatch] = useStateValue();
  const [cart, setCart] = useState([])
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {  
        db.collection("users").doc(authUser.uid).onSnapshot(snapshot => (
          dispatch({
            type: action.SET_USER,
            user: {...authUser, data: snapshot.data()},
          })
        ))

      } else {
        dispatch({
          type: action.SET_USER,
          user: null,
        });
      }
    });

    return () => {
      unsubscribe();
    }
  }, [])

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).collection("cart")
      .orderBy("timestamp", "desc").onSnapshot(snapshot => (
        setCart(snapshot.docs.map(doc => ({
          id: doc.id, ...doc.data()
        })))
      ))
  
      dispatch({
        type: action.SET_CART,
        cart: cart
      })

      db.collection("users").doc(user.uid).collection("purchases")
      .orderBy("timestamp", "desc").onSnapshot(snapshot => (
        setPurchases(snapshot.docs.map(doc => ({
          id: doc.id, ...doc.data()
        })))
      ))
  
      dispatch({
        type: action.SET_PURCHASES,
        purchases: purchases
      })
    }
    else {
      dispatch({
        type: action.SET_CART,
        cart: []
      });

      dispatch({
        type: action.SET_PURCHASES,
        purchases: []
      });
    }

    
    dispatch({
      type: action.INITIALIZE,
      initCount: Math.min(MAX_INIT_COUNT, initCount+1)
    })

  }, [user, cart.length, initCount])

  return (
    <Router>
      <div className={`app ${initCount<MAX_INIT_COUNT?"initializing":""}`}>
        <div className="app__initForeground">
          <p>Please wait...</p>
        </div>
        <Switch>
          <Route path="/" exact>
            <Homescreen />
          </Route>
          <Route path="/categories/:id" component={Categoryscreen} />
          <Route path="/categories" exact>
            <Redirect to="/categories/all" />
          </Route>
          <Route path="/products/:id" component={Productscreen} />
          <Route path="/products" exact>
            <Redirect to="/categories/all" />
          </Route>
          <Route path="/search/:key" component={Searchscreen} />
          <Route path="/search" exact>
            <Redirect to="/categories/all" />
          </Route>
          <Route path="/signin" exact>
            <Signingscreen type={signingType.SIGNIN} />
          </Route>
          <Route path="/signup" exact>
            <Signingscreen type={signingType.SIGNUP} />
          </Route>
          <Route path="/validateuser" exact>
            <ValidateUser />
          </Route>
          <Route path="/youraccount/:nav" component={Accountscreen} />
          <Route path="/youraccount" exact>
            <Redirect to="youraccount/home" />
          </Route>
          <Route path="/cart">
            <Cartscreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
