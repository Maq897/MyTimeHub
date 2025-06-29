console.log("%cLogin script connected", "background-color: blue; color: white; border-radius: 5px;");

// ✅ Import Firebase modules via CDN
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWefNr7a4k-iIJ_pwBK8CTol6WoqqwX2Q",
  authDomain: "mytimehub-574cb.firebaseapp.com",
  databaseURL: "https://mytimehub-574cb-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "mytimehub-574cb",
  storageBucket: "mytimehub-574cb.appspot.com",
  messagingSenderId: "987808044688",
  appId: "1:987808044688:web:38ca9171817d6a2ab12a15",
  measurementId: "G-QNQEKK1V6Q"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const database = getDatabase(app);


// 🧠 Login handler
document.getElementById("loginButton").addEventListener("click", function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const otpInp = document.getElementById("OTP");

  if (otpInp.value !== OTP) {
    alert("Wrong OTP");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("✅ User logged in:", user);

      // 📦 Fetch user data from Realtime DB
      localStorage.setItem("UserId", user.uid)
      return get(ref(database, "users/" + user.uid));
    })
    .then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log("🧾 User data:", userData);

        // 💾 Save to localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        alert("Login Successful");
        window.location.href = "profile.html";
      } else {
        console.warn("⚠️ No user data found");
        alert("User data not found. Please sign up again.");
      }
    })
    .catch((error) => {
      console.error("❌ Login failed:", error);
      alert("Login failed: " + error.message);
    });
});
