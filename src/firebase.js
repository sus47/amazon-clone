import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyDXJ81Liu_I36ivVkN-5R3tIbFI5VReRrY",
    authDomain: "clone-4acce.firebaseapp.com",
    databaseURL: "https://clone-4acce.firebaseio.com",
    projectId: "clone-4acce",
    storageBucket: "clone-4acce.appspot.com",
    messagingSenderId: "763214391683",
    appId: "1:763214391683:web:d827333a00150fbbdbeeb6",
    measurementId: "G-5H12FJ75B3"
};

//initialize the app
const firebaseApp = firebase.initializeApp(firebaseConfig);

//initialize the database
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };