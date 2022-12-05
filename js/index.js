// GLOBAL FUNCTIONS
let getElmID = (id) => document.getElementById(id);

let displayList = (containerID, list) => {
  getElmID(containerID).innerHTML = "";
  list.forEach((element, index) => {
    getElmID(containerID).innerHTML += `
      <li>
        <span>${element}</span>
        <div class="buttons">
          <button class="remove" onclick="removeTask('${containerID}',${index})"><i class="fa-solid fa-trash"></i></button>
          <button class="complete" onclick="completeTask(${index})"><i class="fa-solid fa-check"></i></button>
        </div>
      </li>
    `;
  });
};

// CLASSES
class ToDoList {
  constructor() {
    this.toDo = [];
    this.completed = [];
  }

  addNewTask = (taskName) => {
    this.toDo.push(taskName);
    this.updateLocalStorage(this.toDo, "to-do");
  };

  completeTask = (index) => {
    this.completed.push(this.toDo[index]);
    this.toDo.splice(index, 1);
    this.updateLocalStorage(this.toDo, "to-do");
    this.updateLocalStorage(this.completed, "completed");
  };

  removeTask = (list, index) => {
    switch (list) {
      case "todo":
        this.toDo.splice(index, 1);
        this.updateLocalStorage(this.toDo, "to-do");
        break;
      case "completed":
        this.completed.splice(index, 1);
        this.updateLocalStorage(this.completed, "completed");
        break;
    }
  };

  updateLocalStorage = (arr, key) => {
    let arrStr = JSON.stringify(arr);
    localStorage.setItem(key, arrStr);
  };
}

// MAIN SCRIPTS
let toDoList = new ToDoList();
for (key of ["to-do", "completed"]) {
  if (localStorage.getItem(key)) {
    let item = JSON.parse(localStorage.getItem(key));
    switch (key) {
      case "to-do":
        toDoList.toDo = item;
        break;
      case "completed":
        toDoList.completed = item;
        break;
    }
  }
}
displayList("todo", toDoList.toDo);
displayList("completed", toDoList.completed);

let newTask = () => {
  let taskName = getElmID("newTask").value;
  toDoList.addNewTask(taskName);
  displayList("todo", toDoList.toDo);
};

let completeTask = (index) => {
  toDoList.completeTask(index);
  displayList("todo", toDoList.toDo);
  displayList("completed", toDoList.completed);
};

let removeTask = (list, index) => {
  toDoList.removeTask(list, index);
  displayList("todo", toDoList.toDo);
  displayList("completed", toDoList.completed);
};

getElmID("two").addEventListener("click", (e) => {
  displayList("todo", toDoList.toDo.sort());
  displayList("completed", toDoList.completed.sort());
});

getElmID("three").addEventListener("click", (e) => {
  displayList("todo", toDoList.toDo.sort().reverse());
  displayList("completed", toDoList.completed.sort().reverse());
});
