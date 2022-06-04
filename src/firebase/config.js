import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAi555ah0I3pfedbjV9R2bkYLS0oT7iZ8c",
  authDomain: "chat-app-a3592.firebaseapp.com",
  projectId: "chat-app-a3592",
  storageBucket: "chat-app-a3592.appspot.com",
  messagingSenderId: "289943366853",
  appId: "1:289943366853:web:22f6f63ea4f2619ede14ac",
  measurementId: "G-Q4QVND7S4K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099');
if (window.location.hostname === 'localhost') {
  db.useEmulator('localhost', 8080);
}

export {auth, db};

export default firebase;
