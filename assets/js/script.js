var btnAdd = document.getElementById("writeDown");
var list = document.getElementById("list");
var chosenNote;
var todo = [];
var noteList = [];

btnAdd.addEventListener("click", add);
list.addEventListener("click", check);
//list.addEventListener("dragstart", move);

function add() {
    let title = String(document.getElementById("title").value);
    let text = String(document.getElementById("text").value);
    let index = todo.length;
    todo[index] = title + " - " + text;

    let taskbox = document.createElement("div");
    taskbox.className = "draggable row m-0 mt-2 bg-light d-flex align-items-center";
    taskbox.setAttribute("data-index", index);                                      // indicizza le note quando vengono create
    list.appendChild(taskbox);
    taskbox.setAttribute("draggable", "true");

    let task = document.createElement("input");
    task.type = "text";
    task.setAttribute("readonly", "on");
    task.value = todo[index];
    task.className = "note col-10 me-auto m-2 border-0 bg-light";    
    taskbox.appendChild(task);

    let btn1 = document.createElement("div");
    let btn2 = document.createElement("div");
    let btn3 = document.createElement("div");
    let btnDrag = document.createElement("i");
    let btnEdit = document.createElement("i");
    let btnClose = document.createElement("i");
    btn1.className = "badge text-bg-primary col-auto m-2 p-2";
    btn2.className = "badge text-bg-warning col-auto p-2";
    btn3.className = "badge text-bg-danger col-auto m-2 p-2";
    btnDrag.className = "bi bi-list";
    btnClose.className = "bi bi-x-lg";
    btnEdit.className = "bi bi-pencil";
    taskbox.appendChild(btn1);
    taskbox.appendChild(btn2);
    taskbox.appendChild(btn3);
    btn3.appendChild(btnClose);   
    btn2.appendChild(btnEdit);
    btn1.appendChild(btnDrag);
    document.getElementById("title").value = "";
    document.getElementById("text").value = "";
    noteList.push(taskbox);
    taskbox.addEventListener("dragover", dragOver);
    taskbox.addEventListener("drop", dragDrop);
    taskbox.addEventListener("dragstart", dragStart);
}

function dragStart() {
  chosenNote = this.getAttribute("data-index");
}

function dragOver(event) {
  event.preventDefault();         // previene comportamenti di default del browser
}

function dragDrop() {
  let otherNote = this.getAttribute("data-index");
  swap(chosenNote, otherNote);
}

function swap(a, b) {
  let itemA = noteList[a].querySelector(".note").value;
  let itemB = noteList[b].querySelector(".note").value;
  noteList[a].querySelector(".note").value = itemB;
  noteList[b].querySelector(".note").value = itemA;
}

function check(event) {
  const target = event.target;
  if (target.className == "badge text-bg-danger col-auto m-2 p-2") {
    target.parentNode.remove();
  }
  else if (target.className == "badge text-bg-warning col-auto p-2") {
    target.className = "badge text-bg-success bg-opacity-75 col-auto p-2";
    target.parentNode.firstElementChild.removeAttribute("readonly");
    target.parentNode.firstElementChild.focus();
  }
  else if (target.className == "badge text-bg-success bg-opacity-75 col-auto p-2") {
    target.parentNode.firstElementChild.setAttribute("readonly", "on");
    target.className = "badge text-bg-warning col-auto p-2";
  }
  /*                            più veloce in caso di più bottoncini
  switch (target.className) {
    case "badge text-bg-danger col-auto m-2 p-2":
      target.parentNode.remove();
      break;
    case "badge text-bg-warning col-auto p-2":
      target.className = "badge text-bg-success bg-opacity-75 col-auto p-2";
      target.parentNode.firstElementChild.removeAttribute("readonly");
      target.parentNode.firstElementChild.focus();
      break;
    case "badge text-bg-success bg-opacity-75 col-auto p-2":
      target.parentNode.firstElementChild.setAttribute("readonly", "on");
      target.className = "badge text-bg-warning col-auto p-2";
      break;
    default:
      break;
  }*/
}


