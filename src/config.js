// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app'
import firebase from 'firebase/compat'
// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyCpm4tbF6QucaV00q8X-AzeGRrhJkz1W04',
  authDomain: 'dragons-of-mugloar.firebaseapp.com',
  projectId: 'dragons-of-mugloar',
  storageBucket: 'dragons-of-mugloar.appspot.com',
  messagingSenderId: '393156094158',
  databaseURL: 'https://dragons-of-mugloar-default-rtdb.europe-west1.firebasedatabase.app/',
  appId: '1:393156094158:web:1b71228d1c1f4d6321489f',
  measurementId: 'G-V9RTGTVWG3'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const database = firebase.database()
// const analytics = getAnalytics(config)
