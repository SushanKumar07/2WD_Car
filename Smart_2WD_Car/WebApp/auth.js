import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// PASTE YOUR FULL FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "Your_apiKey",
  databaseURL: "Your_databaseURL",
  authDomain: "Your_authDomain",
  projectId: "Your_projectId",
  storageBucket: "Your_storageBucket",
  messagingSenderId: "Your_messagingSenderID",
  appId: "Your_appID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check if already logged in -> jump to dashboard
onAuthStateChanged(auth, (user) => {
  if (user) { window.location.href = "index.html"; }
});

let isLoginMode = true;
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const toggleLink = document.getElementById('toggleLink');
const toggleMsg = document.getElementById('toggleMsg');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const authError = document.getElementById('authError');

// Toggle between Login and Register
toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  isLoginMode = !isLoginMode;
  formTitle.innerText = isLoginMode ? "Login to Rover" : "Register Rover Account";
  submitBtn.innerText = isLoginMode ? "Login" : "Sign Up";
  toggleMsg.innerText = isLoginMode ? "Don't have an account?" : "Already have an account?";
  toggleLink.innerText = isLoginMode ? "Register here" : "Login here";
  authError.style.display = 'none';
});

// Handle Submit
submitBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  authError.style.display = 'none';

  if(!email || !password) {
    authError.innerText = "Please fill in all fields.";
    authError.style.display = 'block';
    return;
  }

  if (isLoginMode) {
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        authError.innerText = error.message.replace("Firebase: ", "");
        authError.style.display = 'block';
      });
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        authError.innerText = error.message.replace("Firebase: ", "");
        authError.style.display = 'block';
      });
  }
});