window.addEventListener("DOMContentLoaded", init);
const notesList = document.querySelector("#notesList");
const noteEditor = document.querySelector("#noteEditor");

function init() {
  for (let i = 0; i < window.localStorage.length; i++) {
    const note = document.createElement("div");
    const utc = window.localStorage.key(i);
    note.innerText = noteTitle(window.localStorage.getItem(utc));
    note.setAttribute("data-name", utc);
    notesList.appendChild(note);
  }

  document.querySelector("#newBtn").addEventListener("click", newNote);
  document.querySelector("#deleteBtn").addEventListener("click", deleteNote);

  document.querySelector("#notesList").addEventListener("click", function() {
    changeNote(event.target.getAttribute("data-name"));
  });

  noteEditor.addEventListener("keydown", checkEmpty);
  noteEditor.addEventListener("keyup", saveNote);
}

function changeNote(value) {
  noteEditor.value = window.localStorage.getItem(value) || "";
  noteEditor.setAttribute("data-utc", value);
}

function checkEmpty() {
  if (noteEditor.value.length === 0) {
    let utc = Date.now().toString();
    noteEditor.setAttribute("data-utc", utc);
    const note = document.createElement("div");
    note.setAttribute("data-name", utc);
    note.classList.add("note");
    notesList.appendChild(note);
  }
}

function saveNote() {
  let char = noteEditor.value;
  let utc = noteEditor.getAttribute("data-utc");
  window.localStorage.setItem(utc, noteEditor.value);
  document.querySelector("[data-name='" + utc + "']").innerText = noteTitle(
    char
  );
}

function noteTitle(char) {
  var title = char.split("\n")[0];
  if (title.length < 30) {
    return title;
  } else {
    return title + "...";
  }
}

function newNote() {
  noteEditor.value = "";
}

function deleteNote() {
  const utc = noteEditor.getAttribute("data-utc");
  noteEditor.value = "";
  document.querySelector("[data-name='" + utc + "']").remove();
  window.localStorage.removeItem(utc);
}
