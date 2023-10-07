import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyA1NHka7esxtfwSqU_xfJhaMamX6MD3qJQ",
    authDomain: "task-p3.firebaseapp.com",
    projectId: "task-p3",
    storageBucket: "task-p3.appspot.com",
    messagingSenderId: "227206641893",
    appId: "1:227206641893:web:b4071eaf7ad27128f8bc0c",
    measurementId: "G-LH3GKF503P"
  };
  
  
  const app = initializeApp(firebaseConfig);

// Obtenha a instância do Firestore
const db = getFirestore(app);

export { db };
