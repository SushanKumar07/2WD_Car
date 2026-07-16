// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"; // ADDED THIS LINE

// Your existing config...
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
const db = getDatabase(app);
const auth = getAuth(app); // ADDED THIS LINE
const carRef = ref(db, 'rover/control');

// --- SECURITY CHECK ---
// If user is NOT logged in, kick them to login.html
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    document.getElementById('statusText').innerText = `Connected as ${user.email}`;
  }
});

// --- LOGOUT LOGIC ---
document.getElementById('logoutBtn').addEventListener('click', (e) => {
  e.preventDefault();
  signOut(auth);
});


// --- Haptics & Command Logic ---
let currentCommand = "STOP";
let currentSpeed = 200;

function sendToFirebase() {
  // Writes data to Firebase Realtime Database instantly
  set(carRef, {
    command: currentCommand,
    speed: currentSpeed
  });
}

function updateCommand(cmd) {
  if (cmd === currentCommand) return; 
  currentCommand = cmd;

  if (navigator.vibrate && cmd !== "STOP") { navigator.vibrate(50); }
  
  sendToFirebase();
  console.log("Sent:", cmd);
}

// --- Speed Slider Logic ---
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

speedSlider.addEventListener('input', (e) => {
  speedValue.innerText = e.target.value;
});

speedSlider.addEventListener('change', (e) => {
  currentSpeed = parseInt(e.target.value);
  sendToFirebase();
});

// --- Button & Keyboard Listeners ---
const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
  btn.addEventListener('mousedown', () => updateCommand(btn.dataset.cmd));
  btn.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    updateCommand(btn.dataset.cmd);
    btn.classList.add('active-key');
  });

  btn.addEventListener('mouseup', () => updateCommand('STOP'));
  btn.addEventListener('mouseleave', () => updateCommand('STOP'));
  btn.addEventListener('touchend', (e) => {
    e.preventDefault();
    updateCommand('STOP');
    btn.classList.remove('active-key');
  });
});

const keyMap = { 'w': 'W', 'W': 'W', 'a': 'A', 'A': 'A', 's': 'S', 'S': 'S', 'd': 'D', 'D': 'D', 'q': 'Q', 'Q': 'Q', 'e': 'E', 'E': 'E' };

document.addEventListener('keydown', (e) => {
  const cmd = keyMap[e.key];
  if (cmd && currentCommand !== cmd) {
    updateCommand(cmd);
    const btn = document.getElementById(`btn-${cmd}`);
    if(btn) btn.classList.add('active-key');
  }
});

document.addEventListener('keyup', (e) => {
  const cmd = keyMap[e.key];
  if (cmd) {
    updateCommand('STOP');
    const btn = document.getElementById(`btn-${cmd}`);
    if(btn) btn.classList.remove('active-key');
  }
});