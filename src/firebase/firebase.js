import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyCr15stdl7vh9Z2DRzfNy5dpd6-W-NZ0mQ",
  authDomain: "loginauth-518e0.firebaseapp.com",
  databaseURL: "https://loginauth-518e0.firebaseio.com",
  projectId: "loginauth-518e0",
  storageBucket: "loginauth-518e0.appspot.com",
  messagingSenderId: "34170149004",
  appId: "1:34170149004:web:d5ad7c1176b117785a43a9",
  measurementId: "G-92JQEZN6SF"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
// export const db = myFirebase.firestore();
// export const auth = firebase.auth()
// export default firebaseConfig;
const storage = firebase.storage();
export  {
  storage, firebase as default
}
