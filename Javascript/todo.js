import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBWefNr7a4k-iIJ_pwBK8CTol6WoqqwX2Q",
  authDomain: "mytimehub-574cb.firebaseapp.com",
  projectId: "mytimehub-574cb",
  databaseURL: "https://mytimehub-574cb-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "mytimehub-574cb.appspot.com",
  messagingSenderId: "987808044688",
  appId: "1:987808044688:web:38ca9171817d6a2ab12a15",
  measurementId: "G-QNQEKK1V6Q"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

signInAnonymously(auth)
  .then(() => console.log("Signed in anonymously"))
  .catch(err => console.error("Auth error:", err));

onAuthStateChanged(auth, user => {
  if (!user) return;

  const userId = user.uid;
  const notesRef = ref(db, `users/${userId}/notes`);
  if (!notesRef) {
    set(notesRef)
  }
  const container = document.getElementById("notes");
  const addButton = document.getElementById("add-note");

  async function loadNotes() {
    const snapshot = await get(notesRef);
    const notes = snapshot.exists() ? snapshot.val() : [];
    renderNotes(notes);
  }

  async function deleteNote(index) {
    const snapshot = await get(notesRef);
    const notes = snapshot.exists() ? snapshot.val() : [];
    notes.splice(index, 1);
    await set(notesRef, notes);
    renderNotes(notes);
  }

  async function addNote() {
    const snapshot = await get(notesRef);
    const notes = snapshot.exists() ? snapshot.val() : [];
    notes.push({ content: `Note @ ${new Date().toLocaleTimeString()}` });
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
      

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete";
      deleteBtn.textContent = "✖";
      deleteBtn.onclick = () => deleteNote(index);

      noteDiv.appendChild(textarea);
      noteDiv.appendChild(deleteBtn);
      container.appendChild(noteDiv);
    });
  }

  addButton.addEventListener("click", addNote);
  loadNotes();
});

document.getElementById("save-all").addEventListener("click", async () => {
  const container = document.getElementById("notes");
  const textareas = container.querySelectorAll("textarea");

  const updatedNotes = Array.from(textareas).map(t => ({
    content: t.value
  }));

  const notesRef = ref(db, `users/${auth.currentUser.uid}/notes`);
  await set(notesRef, updatedNotes);
  console.log("All notes saved!");
});
