import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
export const firebaseConfig = {
    apiKey: "AIzaSyAknU0ci1bfKPJiXORs2Ek3LiNGDzpVCgk",
    authDomain: "chainwhiz-app-cec95.firebaseapp.com",
    projectId: "chainwhiz-app-cec95",
    storageBucket: "chainwhiz-app-cec95.appspot.com",
    messagingSenderId: "651582557132",
    appId: "1:651582557132:web:338cda24a5abfe3742eb69",
    measurementId: "G-7N9W5EWL8R"
  };

const app = initializeApp(firebaseConfig);
const firebaseAnalytics = getAnalytics(app);
export default firebaseAnalytics