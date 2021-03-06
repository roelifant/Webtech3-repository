class Note {
  constructor(title) {
    this.title = title;
    this.element = this.createElement(title);
  }
  
  createElement(title){
    let newNote = document.createElement('div');
    newNote.setAttribute("class", "card");
    newNote.innerHTML = `<p>${title}</p><a href="#" class="card-remove">Remove</a>`;
    
    let removeBtn = newNote.children[1];
    removeBtn.addEventListener('click', this.remove.bind(newNote));
    
    return newNote;
  }
  
  add(){
    document.querySelector(".notes").appendChild(this.element);
  }
  
  saveToStorage(tekst){
      console.log(app.notesData);
      app.notesData.push(tekst);
      console.log(app.notesData);
      let localstorageNotesData = JSON.stringify(app.notesData);
      localStorage.setItem("notes", localstorageNotesData);
  }
  
  remove(){
    //remove title from array
    let cardTitle = this.children[0].innerHTML;
    var test = app.notesData.indexOf(cardTitle);
    if(test !== -1){app.notesData.splice(test, 1);};
    console.log(app.notesData);
    //save array again
    let localstorageNotesData = JSON.stringify(app.notesData);
    localStorage.setItem("notes", localstorageNotesData);
    //remove element during runtime
    this.parentNode.removeChild(this);
  }
}

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");
      
      
    this.notesData = [];
    // clicking the button should work
    this.btnAdd = document.getElementById("btnAddNote");
    this.btnAdd.addEventListener("click", this.createNote.bind(this));
    // pressing the enter key should also work
    onkeyup = function(e){
        let key = e.keyCode;
        if(key == 13){
            document.getElementById("btnAddNote").click();
        }
    }
    this.loadNotesFromStorage();
  }
  
  loadNotesFromStorage() {
      //check if Storage is already there
      //IF false: notesData is een lege array
      //IF true: notesData is array uit storage
      if((localStorage.getItem("notes"))!==null){
          console.log("notesData is array uit storage");
          let loaded = JSON.parse(localStorage.getItem("notes"));
          this.notesData = loaded;
          console.log(this.notesData);
          
          let i = 0;
          for(i = 0; i < this.notesData.length; i++){
              console.log(this.notesData[i]);
              let note = new Note(this.notesData[i]);
              note.add();
          }
      } else {
          console.log("notesData is een lege array");
      }
  }
   
  createNote(e){
    let tekst = document.getElementById("txtAddNote").value;
    let note = new Note(tekst);
    note.add();
    note.saveToStorage(tekst);
    this.reset();
  }
  
  reset(){
      document.getElementById("txtAddNote").value = "";
  }
}

let app = new App();