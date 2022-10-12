// SELECTORS

const todoInput = document.querySelector('.todo-input'); //Ekleme
const todoButton = document.querySelector('.todo-button'); //Submit butonu
const todoList = document.querySelector('.todo-list'); // ul
const todoFilter = document.querySelector('.filter-todo'); // Select Box



//ALERTS

const alertWarning = document.querySelector('.alert-warning');
const alertSuccess = document.querySelector('.alert-success');



//EVENTS

document.addEventListener("DOMContentLoaded", function(){
    getTodos();
})
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("click", filterTodo);


//FUCNTIONS

function addTodo(e) {
    e.preventDefault();


    //BOS LİSTE KONTROLU
    const isEmpty = str => !str.trim().length;
    if(isEmpty(todoInput.value)) {
        alertWarning.style.display ="block";
        setTimeout(() => {
            alertWarning.style.display ="none";
        }, 1200);
        todoInput.value = "";
    }
    else {

    saveLocal(todoInput.value)
    

    //CREATE DIVS
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo", "d-flex", "justify-content-between", "bg-white", "m-2", "border-bottom");
    console.log(todoDiv)

    //Checkbox

    // const completedButton = document.createElement("button");
    // completedButton.classList.add("complete-btn", "btn", "rounded-0", "border-0","p-2");
    // completedButton.innerHTML = `
    //     <svg 
    //     class="complete-btn m-0 p-0"
    //     pointer-events="none"
    //     width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    //     <path
    //     d="M8.294 16.998c-.435 0-.847-.203-1.111-.553L3.61 11.724a1.392 1.392 0 0 1 .27-1.951 1.392 1.392 0 0 1 1.953.27l2.351 3.104 5.911-9.492a1.396 1.396 0 0 1 1.921-.445c.653.406.854 1.266.446 1.92L9.478 16.34a1.39 1.39 0 0 1-1.12.656c-.022.002-.042.002-.064.002z"
    //     fill="#84cc16" />
    //     </svg>`



    //DELETE BUTTON

    const deleteButton = document.createElement("button")
    deleteButton.classList.add("trash-btn", "btn", "rounded-0", "border-0","p-2")
    deleteButton.innerHTML = `
        <svg
        class="trash-btn m-0 p-0"
        pointer-events="none"
        width="20px" height="20px" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
        d="M5.12817 8.15391C5.12817 10.4103 5.12817 13.5898 5.12817 15.1283C5.23074 16.4616 5.3333 18.2052 5.43587 19.436C5.53843 20.8719 6.7692 22.0001 8.2051 22.0001H15.7948C17.2307 22.0001 18.4615 20.8719 18.5641 19.436C18.6666 18.2052 18.7692 16.4616 18.8718 15.1283C18.9743 13.5898 18.8718 10.4103 18.8718 8.15391H5.12817Z"
        fill="#ef4444" />
        <path
        d="M19.1795 5.07698H16.6154L15.7949 3.53852C15.2821 2.61545 14.359 2.00006 13.3333 2.00006H10.8718C9.84615 2.00006 8.82051 2.61545 8.41026 3.53852L7.38462 5.07698H4.82051C4.41026 5.07698 4 5.48724 4 5.8975C4 6.30775 4.41026 6.71801 4.82051 6.71801H19.1795C19.5897 6.71801 20 6.41032 20 5.8975C20 5.38468 19.5897 5.07698 19.1795 5.07698ZM9.12821 5.07698L9.64103 4.25647C9.84615 3.84621 10.2564 3.53852 10.7692 3.53852H13.2308C13.7436 3.53852 14.1538 3.74365 14.359 4.25647L14.8718 5.07698H9.12821Z"
        fill="#ef4444" />
        </svg>`
    console.log(deleteButton)

    //LIST ITEM

    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item","liItem", "w-100", "px-1","m-2")
    newTodo.innerHTML = todoInput.value.toLowerCase();
    console.log(newTodo)

    todoDiv.appendChild(newTodo);
    // todoDiv.appendChild(completedButton);
    todoDiv.appendChild(deleteButton);

    // APPEND TO LIST

    todoList.appendChild(todoDiv);

    //CLEAR INPUT

    todoInput.value = "";
        alertSuccess.style.display ="block";
        setTimeout(() => {
            alertSuccess.style.display ="none";
        }, 1200);        
    }


   
}


function deleteCheck(e) {
    const item = e.target;
    
    //DELETE
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("drop");
        deleteLocal(todo )
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })
    }

     //CHECK MARK
     if(item.classList[1] === "liItem"){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    // console.log(todos)
   
    todos.forEach(function (item) {    
       
        switch (e.target.value) {
            case "all":
                    console.log(item)
                    item.style.setProperty ("display", "flex", "important");
                    // item.style.display = 'flex', 'important';  
                break;
            case "completed":
                if(item.classList.contains('completed')){         
                    item.style.setProperty ("display", "flex", "important");
                    // item.style.display = 'flex' ,'important';
                }
                else {
                    item.style.setProperty ("display", "none", "important");
                    // item.style.display = 'none', 'important';
                }
                break;
            case "uncompleted":
                if(!item.classList.contains('completed')){
                    item.style.setProperty ("display", "flex", "important");
                    // item.style.display = 'flex', 'important';
                }
                else
                {
                    item.style.setProperty ("display", "none", "important");
                    // item.style.display = 'none', 'important';
                    
                }
                break;
            
        }
    })  
}


//LOCAL STORAGE
 
function saveLocal (todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));    
    }

    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));    
    }

    todos.forEach((todo) => {
            const todoDiv = document.createElement('div');
            todoDiv.classList.add("todo", "d-flex", "justify-content-between", "bg-white", "m-2", "border-bottom");
            console.log(todoDiv)




            //DELETE BUTTON

            const deleteButton = document.createElement("button")
            deleteButton.classList.add("trash-btn", "btn", "rounded-0", "border-0","p-2")
            deleteButton.innerHTML = `
                <svg
                class="trash-btn m-0 p-0"
                pointer-events="none"
                width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                d="M5.12817 8.15391C5.12817 10.4103 5.12817 13.5898 5.12817 15.1283C5.23074 16.4616 5.3333 18.2052 5.43587 19.436C5.53843 20.8719 6.7692 22.0001 8.2051 22.0001H15.7948C17.2307 22.0001 18.4615 20.8719 18.5641 19.436C18.6666 18.2052 18.7692 16.4616 18.8718 15.1283C18.9743 13.5898 18.8718 10.4103 18.8718 8.15391H5.12817Z"
                fill="#ef4444" />
                <path
                d="M19.1795 5.07698H16.6154L15.7949 3.53852C15.2821 2.61545 14.359 2.00006 13.3333 2.00006H10.8718C9.84615 2.00006 8.82051 2.61545 8.41026 3.53852L7.38462 5.07698H4.82051C4.41026 5.07698 4 5.48724 4 5.8975C4 6.30775 4.41026 6.71801 4.82051 6.71801H19.1795C19.5897 6.71801 20 6.41032 20 5.8975C20 5.38468 19.5897 5.07698 19.1795 5.07698ZM9.12821 5.07698L9.64103 4.25647C9.84615 3.84621 10.2564 3.53852 10.7692 3.53852H13.2308C13.7436 3.53852 14.1538 3.74365 14.359 4.25647L14.8718 5.07698H9.12821Z"
                fill="#ef4444" />
                </svg>`
            console.log(deleteButton)

            //LIST ITEM

            const newTodo = document.createElement("li");
            newTodo.classList.add("todo-item","liItem", "w-100", "px-1","m-2")
            newTodo.innerHTML = todo.toLowerCase();
            console.log(newTodo)

            todoDiv.appendChild(newTodo);
            // todoDiv.appendChild(completedButton);
            todoDiv.appendChild(deleteButton);

            // APPEND TO LIST

            todoList.appendChild(todoDiv);
            })

}



function deleteLocal(todo) {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));    
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

