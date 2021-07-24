import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAzhtTAcISl17DPL8LJRaS5vVNjlFYjXMk",
  authDomain: "clone-c2a3b.firebaseapp.com",
  databaseURL: "https://clone-c2a3b.firebaseio.com",
  projectId: "clone-c2a3b",
  storageBucket: "clone-c2a3b.appspot.com",
  messagingSenderId: "132944170629",
  appId: "1:132944170629:web:254f0d831d73b9eb56a3ec",
  measurementId: "G-HLFN8RGVXP"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;