import {
  initializeApp
} from 'firebase/app';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';
import {
  getAuth
} from 'firebase/auth'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA81HxQWu5zIKBS4DrEuJzQpTsNrp3LqHk",
  authDomain: "smartbrankas-azfi.firebaseapp.com",
  databaseURL: "https://smartbrankas-azfi-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smartbrankas-azfi",
  storageBucket: "smartbrankas-azfi.appspot.com",
  messagingSenderId: "1006472358413",
  appId: "1:1006472358413:web:b7048ca23643cd04080344",

};

let app;
app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})
// const auth = getAuth()
export {
  auth
}