# 🚗 Firebase Smart Rover

![GitHub Repo stars](https://img.shields.io/github/stars/SushanKumar07/2WD_Car?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/SushanKumar07/2WD_Car?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/SushanKumar07/2WD_Car?style=for-the-badge)
![License](https://img.shields.io/github/license/SushanKumar07/2WD_Car?style=for-the-badge)

A secure cloud-connected robotic rover built using the **Arduino UNO R4 WiFi**, **Firebase Authentication**, and **Firebase Realtime Database**.

The rover is controlled through a responsive web dashboard where authenticated users can remotely operate the robot in real time using keyboard or touch controls.

---

# ✨ Features

- 🔐 Firebase Authentication
- ☁️ Firebase Realtime Database
- 📱 Responsive Web Dashboard
- 🎮 Keyboard Controls
- 📲 Mobile Touch Controls
- ⚡ Real-Time Communication
- 🎚 Adjustable Motor Speed
- 🌐 WiFi Connectivity
- 🚗 Arduino UNO R4 WiFi Integration

---

# 🛠 Hardware Used

- Arduino UNO R4 WiFi
- L298N Motor Driver
- 2 DC Gear Motors
- Robot Chassis
- Battery Pack
- Jumper Wires

---

# 💻 Software Used

- Arduino IDE
- HTML5
- CSS3
- JavaScript
- Firebase Authentication
- Firebase Realtime Database
- Git
- GitHub

---

# 🏗 System Architecture

```text
                   User
                     │
                     ▼
         Web Dashboard (HTML/CSS/JS)
                     │
                     ▼
        Firebase Authentication
                     │
         verifies logged-in user
                     │
                     ▼
      Firebase Realtime Database
                     │
          Stores Rover Commands
                     │
                     ▼
          Arduino UNO R4 WiFi
                     │
          Reads Latest Command
                     │
                     ▼
             Motor Driver
                     │
                     ▼
                  Rover
```

---

# 🎮 Controls

| Key | Action |
|------|--------|
| W | Move Forward |
| A | Turn Left |
| S | Move Backward |
| D | Turn Right |
| Q | Rotate Left |
| E | Rotate Right |
| Speed Slider | Adjust Motor Speed |

---

# 📂 Project Structure

```text
firebase-smart-rover
│
├── Arduino
│   └── RoverFirmware.ino
│
├── WebApp
│   ├── index.html
│   ├── login.html
│   ├── app.js
│   ├── auth.js
│   └── style.css
│
├── docs
│
├── README.md
├── LICENSE
└── .gitignore
```

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone https://github.com/SushanKumar07/2WD_Car.git
```

---

## 2. Open Arduino IDE

Open

```
Arduino/RoverFirmware.ino
```

---

## 3. Install Required Libraries

Install the following libraries using the Arduino Library Manager.

- WiFiS3
- ArduinoJson
- Firebase Client Library (if required by your firmware)

---

## 4. Configure WiFi

Inside the Arduino sketch update:

```cpp
const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";
```

---

## 5. Upload the code

Select

```
Board

Arduino UNO R4 WiFi
```

Upload the firmware.

---

# 🔥 Firebase Setup

Create a Firebase project.

Enable

- Authentication
- Email/Password Sign-in
- Realtime Database

Replace the Firebase configuration inside

```
WebApp/app.js
```

and

```
WebApp/auth.js
```

with your own Firebase credentials.

Example:

```javascript
const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
};
```

---

# 🧪 Usage

1. Register a new account.
2. Login.
3. Open the dashboard.
4. Adjust speed.
5. Drive the rover.
6. Logout securely.

---

# ⚠ Troubleshooting

### Arduino not connecting

- Check WiFi credentials
- Verify board selection
- Restart Arduino

---

### Authentication fails

- Enable Email/Password authentication
- Verify Firebase configuration
- Check browser console

---

### Rover not moving

- Check motor wiring
- Verify Firebase database path
- Check battery voltage

---

### Website doesn't load

- Make sure JavaScript modules are enabled.
- Verify Firebase SDK URLs.
- Open the browser console for errors.

---

# 🛣 Roadmap

- [x] Arduino UNO R4 WiFi Control
- [x] Firebase Authentication
- [x] Realtime Database
- [x] Responsive Dashboard
- [x] Keyboard Controls
- [x] Mobile Controls
- [ ] WebSocket Communication
- [ ] Live Camera Feed
- [ ] Battery Monitoring
- [ ] Obstacle Detection
- [ ] Autonomous Navigation

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Feel free to fork the repository and submit a pull request.

---

# 📜 License

This project is licensed under the MIT License.
