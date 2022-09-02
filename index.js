const addBtn = document.querySelector(".add");
const addTitle = document.querySelector(".title");
const addText = document.querySelector(".text");
const msg = document.querySelector(".msg");

//add notes
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("button clicked");

  //check if note title and note text is filled
  if (addTitle.value == "" || addText.value == "") {
    console.log("failed");
    msg.innerHTML = "ensure you have filled in a note and title";
  } else {
    console.log("success");
    addNotes();
    msg.innerHTML = "";
    addText.value = "";
    addTitle.value = "";
    showNotes();
  }
});

//add notes function
function addNotes() {
  //get items to store in local storage
  if (localStorage.getItem("notes") == null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }

  //notes object
  let myObj = {
    title: addTitle.value,
    text: addText.value,
  };

  notes.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// show notes function
function showNotes() {
  if (localStorage.getItem("notes") == null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }

  let html = "";
  notes.forEach(function (list, index) {
    html += `
        <div class="note">
          <h1 class="note-title">${list.title}</h1>
          <p class="note-text">${list.text}</p>
          <span class="options">
            <i class="fa fa-pencil" id=${index} onclick="editNote(this.id)" aria-hidden="true"></i>
            <i class="fa fa-trash" id=${index} onclick="deleteNote(this.id)" aria-hidden="true"></i>
          </span>
        </div>
        `;
  });

  let noteList = document.querySelector(".notes");
  if (notes.length != 0) {
    noteList.innerHTML = html;
  } else {
    noteList.innerHTML =`You do not have any notes yet`;
  }
}

// delete notes function
function deleteNote(index) {
  console.log("delete");
  let confirmDel = confirm("Do you want to delete this note?");
  if (confirmDel == true) {
    if (localStorage.getItem("notes") == null) {
      notes = [];
    } else {
      notes = JSON.parse(localStorage.getItem("notes"));
    }

    //delete the item at the speciifed index
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
  }
}

//edit notes function
function editNote(index) {
  if (addTitle.value !== "" || addText.value !== "") {
    console.log("clear ooo");
    return alert("please clear form before editing a note");
  } else {
    if (localStorage.getItem("notes") == null) {
      notes = [];
    } else {
      notes = JSON.parse(localStorage.getItem("notes"));
    }
    let title = notes[index].title;
    let text = notes[index].text;
 
    addTitle.value = title;
    addText.value = text;

    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
  }
}

showNotes();
