//add notes
let add = document.querySelector(".add");
add.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("button clicked");

  let txt = document.querySelector(".text");
  let title = document.querySelector(".title");
  let msg = document.querySelector(".msg");

  //check if note title and note text ix filled
  if (title.value === "" || txt.value === "") {
    msg.innerHTML = "ensure you have filled in a note and title";
    console.log("failed");
  } else {
    msg.innerHTML = "";
    console.log("success");
  }

  //get items to store in local storage
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notesObj = [];
  } else {
    //JSON.parse converts string to object
    notesObj = JSON.parse(notes);
  }

  //notes object
  let myObj = {
    title: title.value,
    text: txt.value,
  };

  notesObj.push(myObj);

  //set items to the local storage
  //JSON.stringify converts myObj array to string
  localStorage.setItem("notes", JSON.stringify(notesObj));
  title.value = "";
  txt.value = "";

  showNote();
});

function showNote() {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let htmlCode = "";
  notesObj.forEach((list, ind) => {
    htmlCode += `
    <div class="note">
    <h1 class="note-title">${list.title}</h1>
    <p class="note-text">${list.text}</p>
    <span class="options">
        <i class="fa fa-pencil" id=${ind} onclick="editNote(this.id)" aria-hidden="true"></i>
        <i class="fa fa-trash" id=${ind} onclick="deleteNote(this.id)" aria-hidden="true"></i>
    </span>
    </div>
    `;
  });

  let noteList = document.querySelector(".notes");
  if (notesObj.length != 0) {
    noteList.innerHTML = htmlCode;
  } else {
    noteList.innerHTML = "no notes yet";
  }
}

//delete notes
function deleteNote(ind) {
  console.log("dlete");
  let confirmDel = confirm("Do you want to delete this note?");

  if (confirmDel === true) {
    let notes = localStorage.getItem("notes");
    if (notes === null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }

    //delete the item at the speciifed index
    notesObj.splice(ind, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));

    showNote();
  }
}

//edit notes
function editNote(ind) {
  let notes = localStorage.getItem("notes");
  let txt = document.querySelector(".text");
  let title = document.querySelector(".title");

  if (title.value !== "" || txt.value !== "") {
    console.log("clear ooo");
    return alert("please clear form before editing a note");
  }

  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  console.log(notesObj)
  notesObj.findIndex((list, ind) => {
    title.value = list.title;
    txt.value = list.txt;
  })
  notesObj.splice(ind, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
}

showNote();
