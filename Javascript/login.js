console.log("%cLogin script connected", "background-color: blue; color: white; border-radius: 5px;");

// Import Firebase modules
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";

// Firebase config
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

// Handle login
document.getElementById("loginButton").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      console.log("User logged in:", user);

      // Retrieve user data from Firebase Database
      get(ref(database, "users/" + user.uid))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log("User data:", userData);

            // Save user data to local storage
            localStorage.setItem("user", JSON.stringify(userData));

            alert("Login successful!");
            window.location.href = "profile.html"; // Redirect to homepage
          } else {
            console.log("No user data found");
            alert("User data not found. Please register again.");
          }
        })
        .catch((error) => {
          console.error("Error retrieving user data:", error);
        });
    })
    .catch((error) => {
      console.error("Login failed:", error);
      alert("Login failed: " + error.message);
    });
});
