import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth,getReactNativePersistence } from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAAKLHW9uSu88YT_ccMznS8SZwzKCrKyx4",
  authDomain: "airbnb-b4141.firebaseapp.com",
  projectId: "airbnb-b4141",
  storageBucket: "airbnb-b4141.appspot.com",
  messagingSenderId: "980994463127",
  appId: "1:980994463127:web:d2146a1ee3740ce24da0d2"
};

// Initialize Firebase
//expo community no es compatible 
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{persistence: getReactNativePersistence(AsyncStorage)})