import add from './add.png'
import Trash from './trash.png'
import { makeProjectArray, currentProjectIndex } from './project.js'

//add new task button
export function addTaskButton() {
    const add_task = document.createElement('div');
    add_task.classList.add("mainbar_btn");

    const picture = new Image();
    picture.src = add;
    add_task.appendChild(picture);

    const task_text = document.createElement('p');
    task_text.textContent = "Add new task";
    add_task.appendChild(task_text);
    document.querySelector('.mainbar_btn').appendChild(add_task);
}

export function revealTaskBox() {
    const add_btn = document.querySelector('.mainbar_btn');
    const overlay = document.querySelector('#overlay');
    add_btn.addEventListener('click', () => {
        const task_active = document.querySelector('.task_content')
        task_active.classList.add('active');
        overlay.classList.add('active');
    })
    removeTaskBox();
    addSubmitButton();
} 

function removeTaskBox() {
    const remove_btn = document.querySelector('.close_button');
    const submit_btn = document.querySelector('.task_submit');
    const overlay = document.querySelector('#overlay');

    remove_btn.addEventListener('click', () => {
        const task_remove_active = document.querySelector('.task_content')
        task_remove_active.classList.remove('active');
        overlay.classList.remove('active');
    })

    submit_btn.addEventListener('click', () => {
        const task_remove_active = document.querySelector('.task_content')
        task_remove_active.classList.remove('active');
        overlay.classList.remove('active');
    })
}

function addSubmitButton() {
    const submit_btn = document.querySelector('.task_submit');
    submit_btn.addEventListener('click', () => {
        createNewTask();
        createTaskDOM();
        removeTaskBox();
    })
}

export function createNewTask() {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#due_date').value;
    const priority = document.querySelector('#priority').checked;

    const newTask = Task(title, description, dueDate, priority);
    currentProjectIndex.taskArray.push(newTask);

    clearTaskBox();
}

export function createTaskDOM() {
    let currentArrayIndex = currentProjectIndex.taskArray.length - 1;

    const task_box = document.createElement('div');
    const title = document.createElement('div');
    title.textContent = `${currentProjectIndex.taskArray[currentArrayIndex].title}`;

    task_box.appendChild(title);

    const button_container = document.createElement('div');
    button_container.classList.add('task_button_container')
    const details = document.createElement('div');
    details.textContent = "details"

    const trash = new Image();
    trash.src = Trash;
    button_container.appendChild(details);
    button_container.appendChild(trash);
    task_box.appendChild(button_container);

    document.querySelector('.mainbar_tasks').appendChild(task_box);


    details.classList.add('task_details');
    task_box.classList.add('task_box');
    title.classList.add('task_title');
    trash.classList.add('task_remove');
    
    function assignObjToDOM() {
        const currentArrayIndex = currentProjectIndex.taskArray.length - 1;
        // currentProjectIndex.taskArray[currentArrayIndex].myElement = task_box;

            function removeTaskButton() {
                trash.addEventListener('click', () => {
                    const index = currentProjectIndex.taskArray.findIndex(newTask => newTask.myElement === task_box);

                    if (index !== -1) {
                        const removedObject = currentProjectIndex.taskArray.splice(index, 1)[0];
                        removedObject.myElement.remove();
                    }
                })
            }
        removeTaskButton();
    }
        
    assignObjToDOM();
}

export function createTaskDOMLoop(loopIndex) {
    const task_box = document.createElement('div');
    const title = document.createElement('div');
    title.textContent = `${currentProjectIndex.taskArray[loopIndex].title}`;

    task_box.appendChild(title);

    const button_container = document.createElement('div');
    button_container.classList.add('task_button_container')
    const details = document.createElement('div');
    details.textContent = "details"

    const trash = new Image();
    trash.src = Trash;
    button_container.appendChild(details);
    button_container.appendChild(trash);
    task_box.appendChild(button_container);

    document.querySelector('.mainbar_tasks').appendChild(task_box);


    details.classList.add('task_details');
    task_box.classList.add('task_box');
    title.classList.add('task_title');
    trash.classList.add('task_remove');
    
    function assignObjToDOMLoop() {
        currentProjectIndex.taskArray[loopIndex].myElement = task_box;

            function removeTaskButtonLoop() {
                trash.addEventListener('click', () => {
                    const index = currentProjectIndex.taskArray.findIndex(newTask => newTask.myElement === task_box);

                    if (index !== -1) {
                        const removedObject = currentProjectIndex.taskArray.splice(index, 1)[0];
                        removedObject.myElement.remove();
                    }
                })
            }
        removeTaskButtonLoop();
    }
        
    assignObjToDOMLoop();
}

function clearTaskBox() {
    document.querySelector('#title').value = "";
    document.querySelector('#description').value = "";
    document.querySelector('#due_date').value = "";
    document.querySelector('#priority').checked === "false";
}


function Task(title, description, dueDate, priority) {
    return { title, description, dueDate, priority }
}

