import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDsaYZncEAof8RL5pNQ5NGVykzyCHehDog",
  authDomain: "todo-list-60adc.firebaseapp.com",
  databaseURL: "https://todo-list-60adc.firebaseio.com",
  projectId: "todo-list-60adc",
  storageBucket: "todo-list-60adc.appspot.com",
  messagingSenderId: "70025924420",
  appId: "1:70025924420:web:7bbaec8304febe64489111",
  measurementId: "G-1GFRK11JJ2",
};

// - Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
firebase.analytics();
// - Database
const database = fb.database();
const ref = database.ref("users");

export { fb, database, ref };
