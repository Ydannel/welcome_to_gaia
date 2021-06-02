import firebase from 'firebase/app';
import 'firebase/auth';

export  const auth  =  firebase.initializeApp({
    apiKey: process.env.REACT_APP_PUBLIC_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROYECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE,
    messagingSenderId: process.env.REACT_APP_MSG_ID,
    appId: process.env.REACT_APP_APP_ID
  }).auth();