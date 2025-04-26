console.log("%cRegister script connected", "background-color: blue; color: white; border-radius: 5px;");

// Import Firebase modules
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBWefNr7a4k-iIJ_pwBK8CTol6WoqqwX2Q",
    authDomain: "mytimehub-574cb.firebaseapp.com",
    databaseURL: "https://mytimehub-574cb-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "mytimehub-574cb",
    storageBucket: "mytimehub-574cb.firebasestorage.app",
    messagingSenderId: "987808044688",
    appId: "1:987808044688:web:38ca9171817d6a2ab12a15",
    measurementId: "G-QNQEKK1V6Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Handle user registration
document.getElementById("registerButton").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const username = document.getElementById("username").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User registered:", user);

      // Store additional user data + starter docs and notes
      set(ref(database, "users/" + user.uid), {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        docs: {},
        notes: {}
      })
        .then(() => {
          alert("User registered successfully!");
          window.location.href = "login.html";
        })
        .catch((error) => {
          console.error("Error saving user data:", error);
          alert("Error saving user data: " + error.message);
        });
    })
    .catch((error) => {
      console.error("Registration failed:", error);
      alert("Registration failed: " + error.message);
    });
});

