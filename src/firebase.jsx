import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAy6B_LTHk2SFQdsc4qDNpllZ0Q3XYYA7s",
  authDomain: "mytodo-list-project.firebaseapp.com",
  projectId: "mytodo-list-project",
  storageBucket: "mytodo-list-project.appspot.com",
  messagingSenderId: "115799058410",
  appId: "1:115799058410:web:93dffac79e69d187e2f493"
});

const db = firebaseApp.firestore();
export default db;