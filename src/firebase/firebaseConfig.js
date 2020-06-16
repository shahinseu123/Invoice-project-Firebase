import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'


var firebaseConfig = {
    apiKey: "AIzaSyBmPnr9Uj3eNpnHkUpDmeCkiVkgJaIfHj8",
    authDomain: "vuefirebaseproject-d3fb0.firebaseapp.com",
    databaseURL: "https://vuefirebaseproject-d3fb0.firebaseio.com",
    projectId: "vuefirebaseproject-d3fb0",
    storageBucket: "vuefirebaseproject-d3fb0.appspot.com",
    messagingSenderId: "863737934397",
    appId: "1:863737934397:web:1dee3c8f59ab17c27cb054",
    measurementId: "G-9VZWDR7ZKV"
};
const fb = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { fb, db }

