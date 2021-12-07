import firebase from 'firebase/compat'

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

firebase.initializeApp(firebaseConfig)
export const database = firebase.database()
