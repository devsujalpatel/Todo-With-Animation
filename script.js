const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');


const saveToLocalStorage = () => {
    const tasks = [];
    document.querySelectorAll('#todoList li').forEach((li) => {
        tasks.push({
            text: li.querySelector('.todoSpan').textContent,
            completed: li.querySelector('.checkBox').checked,
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


const loadFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(({ text, completed }) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkBox" ${completed ? 'checked' : ''}>
            <span class="todoSpan" style="text-decoration: ${completed ? 'line-through' : 'none'}">${text}</span>
            <span class="delete"><i class="fa-solid fa-trash"></i></span>
        `;
        todoList.appendChild(li);
    });
    animateListItems();
};




const addTask = () => {
    if (todoInput.value === '') {
        alert("Todo Cannot be empty");
    } else {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkBox">
            <span class="todoSpan">${todoInput.value}</span>
            <span class="delete"><i class="fa-solid fa-trash"></i></span>
        `;
        todoList.appendChild(li);
        todoInput.value = ''; 
        saveToLocalStorage(); 
        animateListItems(); 
    }
};


const deleteTask = (event) => {
    if (event.target.closest('.delete')) {
        const li = event.target.closest('li'); 
        todoList.removeChild(li); 
        saveToLocalStorage(); 
    }
};


const taskComplete = (event) => {
    if (event.target.classList.contains('checkBox')) {
        const span = event.target.nextElementSibling; 
        if (event.target.checked) {
            span.style.textDecoration = 'line-through';
        } else {
            span.style.textDecoration = 'none';
        }
        saveToLocalStorage(); 
    }
};


todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});


addTodoBtn.addEventListener('click', addTask);



todoList.addEventListener('click', (event) => {
    deleteTask(event); 
    taskComplete(event); 
});

document.getElementById("todoList").addEventListener("click", function (event) {
    if (event.target.classList.contains("todoSpan")) {
        const li = event.target.closest("li"); // Get the parent <li> of the clicked span
        const checkBox = li.querySelector(".checkBox"); // Find the checkbox within the same <li>
        checkBox.checked = !checkBox.checked; // Toggle the checkbox state
        
        // Optionally, apply a line-through style when the checkbox is toggled
        if (checkBox.checked) {
            event.target.style.textDecoration = "line-through";
        } else {
            event.target.style.textDecoration = "none";
        }
    }
});


document.addEventListener('DOMContentLoaded', loadFromLocalStorage);


const h1 = document.querySelector("h1");
const h1Text = h1.textContent;

let charText = "";

h1Text.split("").forEach((char) => {
    if (char === " ") {
        charText += "&nbsp;";
    } else {
        charText += `<span class="animatedText">${char}</span>`;
    }
});

h1.innerHTML = charText;

gsap.from(".animatedText", {
    y: 70,
    duration: 0.3,
    delay: 0.4,
    stagger: 0.15,
    opacity: 0,
});

const tl = gsap.timeline();

tl.from(".create", {
    y: 70,
    duration: 0.3,
    delay: 0.5,
    stagger: 0.15,
    opacity: 0,
});


const animateListItems = () => {
    tl.from("#todoList li", {
        y: 70,
        duration: 0.3,
        stagger: 0.15,
        opacity: 0,
    });
};