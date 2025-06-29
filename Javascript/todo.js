// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Firebase setup
const firebaseConfig = {
  apiKey: "AIzaSyBWefNr7a4k-iIJ_pwBK8CTol6WoqqwX2Q",
  authDomain: "mytimehub-574cb.firebaseapp.com",
  projectId: "mytimehub-574cb",
  databaseURL: "https://mytimehub-574cb-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "mytimehub-574cb.appspot.com",
  messagingSenderId: "987808044688",
  appId: "1:987808044688:web:38ca9171817d6a2ab12a15"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

signInAnonymously(auth)
  .then(() => console.log("Signed in anonymously"))
  .catch(err => console.error("Auth error:", err.message));

onAuthStateChanged(auth, user => {
  if (!user) return;

  const uid = user.uid;
  const notesRef = ref(db, `users/${uid}/notes`);
  const container = document.getElementById("notes");
  const addBtn = document.getElementById("add-note");
  const saveAllBtn = document.getElementById("save-all");

  async function loadNotes() {
    const snapshot = await get(notesRef);
    const data = snapshot.exists() ? snapshot.val() : [];
    const notes = Array.isArray(data) ? data : Object.values(data); // Ensures array structure
    renderNotes(notes);
  }

  async function addNote() {
    const snapshot = await get(notesRef);
    const data = snapshot.exists() ? snapshot.val() : [];
    const notes = Array.isArray(data) ? data : Object.values(data);
    notes.push({ content: `Note @ ${new Date().toLocaleTimeString()}` });
    await set(notesRef, notes);
    renderNotes(notes);
  }

  async function deleteNote(index) {
    const snapshot = await get(notesRef);
    const data = snapshot.exists() ? snapshot.val() : [];
    const notes = Array.isArray(data) ? data : Object.values(data);
    notes.splice(index, 1);
    await set(notesRef, notes);
    renderNotes(notes);
  }

  function renderNotes(notes) {
    container.innerHTML = "";
    notes.forEach((note, index) => {
      const noteDiv = document.createElement("div");
      noteDiv.className = "note";

      const textarea = document.createElement("textarea");
      textarea.value = note.content;

      const delBtn = document.createElement("button");
      delBtn.textContent = "X";
      delBtn.style.color = "red"
      delBtn.style.top = "1px"
      delBtn.style.right = "1px"
      delBtn.onclick = () => deleteNote(index);

      noteDiv.appendChild(textarea);
      noteDiv.appendChild(delBtn);
      container.appendChild(noteDiv);
    });
  }

  saveAllBtn.addEventListener("click", async () => {
    const textareas = document.querySelectorAll("#notes textarea");
    const updated = Array.from(textareas).map(t => ({ content: t.value }));
    await set(notesRef, updated);
    console.log("All notes saved!");
  });

  addBtn.addEventListener("click", addNote);

  loadNotes();
});
