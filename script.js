let currentUser = localStorage.getItem("currentUser");
if(currentUser === null) window.location.href = 'login.html';

let todoItemsContainer = document.getElementById("todoItemsContainer");
let todoUserInput = document.getElementById("todoUserInput");
let addTodoButton = document.getElementById("addTodoButton");
let saveBtn = document.getElementById("todoSaveBtn");
let logoutBtn = document.getElementById("logoutBtn");


function getFromLocalStorage(){
    let currentUser = localStorage.getItem("currentUser");
    let stringifyList = localStorage.getItem("todoList_"+currentUser);
    let parsedList = JSON.parse(stringifyList);
    if (parsedList === null) return []
    else return parsedList;
}
let todoList=getFromLocalStorage();
let todoCount = todoList.length;

function saveInLocalStorage(todoList){
    let currentUser = localStorage.getItem("currentUser");
    let stringifyedList = JSON.stringify(todoList);
    localStorage.setItem("todoList_"+currentUser,stringifyedList);
}

saveBtn.onclick = function(){
    saveInLocalStorage(todoList);
}


function onTodoStatusChange(labelId,todoId){
    let labelE = document.getElementById(labelId);
    labelE.classList.toggle("checkbox-label-checked");

    let todoObjectIndex = todoList.findIndex(function(eachtodo){
        let todoIndex = "todo" + eachtodo.Uid;
        if (todoIndex === todoId) return true;
        else return false;
    });
    let todoObject = todoList[todoObjectIndex]
    if (todoObject.todoCheckedStatus === true){
            todoObject.todoCheckedStatus = false;
    }else{
        todoObject.todoCheckedStatus = true;
    }
}

function deleteTodo(todoId){
    let todoItem = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoItem);
    let todoIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.Uid;
        if (eachTodoId===todoId) return true;
    })
    todoList.splice(todoIndex,1);
    saveInLocalStorage();
    location.reload();
}

function createandAppendTodo(todo){
    let labelId = "label"+todo.Uid;
    let checkboxId = "checkbox"+todo.Uid;
    let todoId = "todo"+todo.Uid;

    let todoItemContainer = document.createElement('li');
    todoItemContainer.classList.add("todo-item-container","d-flex","flex-row");
    todoItemContainer.id = todoId;
    todoItemsContainer.appendChild(todoItemContainer);

    let checkboxEle = document.createElement('input');
    checkboxEle.type = "checkbox";
    checkboxEle.id = checkboxId;
    checkboxEle.classList.add("checkbox-input");
    checkboxEle.checked = todo.todoCheckedStatus;
    checkboxEle.onclick=function(){
        onTodoStatusChange(labelId,todoId);
    }
    todoItemContainer.appendChild(checkboxEle);

    let labelContainerEle = document.createElement('div');
    labelContainerEle.classList.add("label-container","d-flex","flex-row");
    todoItemContainer.appendChild(labelContainerEle);

    let labelEle = document.createElement('label');
    labelEle.setAttribute("for", checkboxId);
    labelEle.id = labelId;
    labelEle.classList.add("checkbox-label");
    labelEle.textContent = todo.text;
    if (todo.todoCheckedStatus === true){
        labelEle.classList.add("checkbox-label-checked");
    }
    labelContainerEle.appendChild(labelEle);

    let deleteIconContainerEle = document.createElement('div');
    deleteIconContainerEle.classList.add("delete-icon-container");
    labelContainerEle.appendChild(deleteIconContainerEle);

    let deleteIconEle = document.createElement('i');
    deleteIconEle.classList.add("fa-solid","fa-trash-can","delete-icon");
    deleteIconEle.onclick = function(){
        deleteTodo(todoId);
    }
    deleteIconContainerEle.appendChild(deleteIconEle);

}

addTodoButton.onclick = function(){
    let userInput = todoUserInput.value;
    if(userInput === ""){
        alert("Please enter a task");
        return;
    }
    todoCount = todoCount + 1
    let newTodo = {
        text: userInput,
        Uid: todoCount,
        todoCheckedStatus: false
    }
    todoList.push(newTodo);
    createandAppendTodo(newTodo);
    todoUserInput.value = "";

    
}

for (let todo of todoList){
    createandAppendTodo(todo);
}

logoutBtn.addEventListener("click",function(){
    localStorage.removeItem("currentUser");
    window.location.href = 'login.html';
})