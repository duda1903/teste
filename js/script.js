let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let closeModalView = document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseModal = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.

// +++++++++++++++++++ EVENTOS +++++++++++++++++++//

addNote.addEventListener('click', (evt) => {
  evt.preventDefault(); //faz com que a página não seja recarregada
  modal.style.display = 'block';
  notes.style.display = 'none';
  addNote.style.display = 'none';
});

btnCloseModal.addEventListener('click', (evt) => {
  evt.preventDefault();
  listNotes();
  modal.style.display = 'none';
  notes.style.display = 'flex';
  addNote.style.display = 'block';
});

btnSaveNote.addEventListener('click', (evt) => {
  evt.preventDefault();
  let objNote = { 
    id : document.querySelector("#input-id").value,
    title :  document.querySelector("#input-title").value,
    content : document.querySelector("#input-content").value.trim()
  };
  console.log(objNote);
  saveNote(objNote);
});


closeModalView.addEventListener("click", (evt) => {
  evt.preventDefault();
  modalView.style.display = 'none';
  notes.style.display = 'flex';
  addNote.style.display = 'block';
});
//+++++++++++++++++++++++++++++++ FUNÇÔES ++++++++++++++++++++++++++++++++++++

const saveNote = (note) => {

  let listNotes = loadNotes();

  if(note.id.length < 1){ //se o comprimento da string do elemento id for menor que 1, ou seja n tem valor de id - valor do local storage
    note.id = new Date().getTime();
    document.querySelector('#input-id').value = note.id;
    listNotes.push(note);
  }else{
    console.log(note.id);
    listNotes.forEach((item,i) =>{
      if(item.id == note.id){
        listNotes[i] = note;
      }
    });
  }
  note.lastTime = new Date().getTime();
 
  listNotes = JSON.stringify(listNotes);
  localStorage.setItem('notes', listNotes);
};

const loadNotes = () =>{
  let listNotes = localStorage.getItem('notes');
  console.log(listNotes);
  if(!listNotes){
    listNotes = []; //forma literla de declara um arrey vazio
  }
  else{
    listNotes = JSON.parse(listNotes);
  }
  return listNotes;
};

//forEach percorre o arrey e executa uma função p cada / push inclui um novo intem no arrey

const listNotes = () => {
  let listNotes = loadNotes();
  notes.innerHTML="";
  listNotes.forEach((item) =>{
    let divCard = document.createElement('div');
    divCard.className = 'card';
    divCard.style.widht = '18rem';
    notes.appendChild(divCard);
    let divCardBody = document.createElement ('div');
    divCardBody.className = 'card-body';
    divCard.appendChild(divCardBody);
    let h1 = document.createElement ('h1');
    h1.innerText = item.title;
    divCardBody.appendChild(h1);
    let pContent = document.createElement ('p');
    pContent.innerText = item.content;
    divCardBody.appendChild(pContent);
    let pLastTime = document.createElement('p');
    pLastTime.innerText = new Date(item.lastTime).toLocaleDateString();
    divCardBody.appendChild(pLastTime);
    divCard.addEventListener('click',(evt) =>{
      evt.preventDefault();
      showNote(item);
    });
  });   
};

const showNote = (note) =>{
  document.querySelector('#title-note').innerHTML = "<h1>"+note.title+"</h1>";
  document.querySelector('#content-note').innerHTML = "<p>"+note.content+"</p>";
  document.querySelector('#content-note').innerHTML += 
  "<p>"+new Date(note.lastTime).toLocaleDateString()+"</p>";
  document.querySelector('#controls-note').innerHTML ="";
  let aDelete = document.createElement('a');
  let i = document.createElement('i');
  i.style.color = "#FF0000";
  i.className = "bi";
  i.className = "bi-trash";
  aDelete.appendChild(i);
  document.querySelector("#controls-note").appendChild(aDelete);
  aDelete.addEventListener('click', (evt) => {
    evt.preventDefault();
    deleteNote(note.id);
  });
  modalView.style.display = 'block';
  addNote.style.display = 'none';
  notes.style.display = 'none';
};

const deleteNote = (id) => {
  listNotes = loadNotes();
  listNotes.forEach(note => i) {
    if (notes.id === id){
      listNotes.splice(i);
    }
  }
};




listNotes();