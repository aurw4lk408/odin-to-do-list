// import add from './add.png'
import Trash from './trash.png'
import empty_star from './emptyStar.png'
import FullStar from './fullStar.png'
import Pencil from './pencil.png'
import { currentProjectIndex, projectArray } from './project.js'
import { v4 as uuidv4 } from 'uuid';

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
    const close_btn = document.querySelector('.task_close');
    const submit_btn = document.querySelector('.task_submit');
    const overlay = document.querySelector('#overlay');

    remove_btn.addEventListener('click', () => {
        const task_remove_active = document.querySelector('.task_content')
        task_remove_active.classList.remove('active');
        overlay.classList.remove('active');
    })
    
    close_btn.addEventListener('click', () => {
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

        document.querySelector('.task_box').classList.add('animate');
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

function revealDetailsBox(variable, box, title, date_btn, trash, star) {
    const btn = variable;
    btn.addEventListener('click', () => {
        if(!document.querySelector('.details_task_box')) {
            createDetailsDOM(box, title, date_btn, trash, star)
            populateDetailsBox(box);

            addInactiveClass(trash, star);
        }
    })
}

export function addInactiveClass(trash, star) {
    document.querySelector('.mainbar_btn').classList.add('inactive');

    trash.style.pointerEvents = "none";
    star.style.pointerEvents = "none";
}

export function removeInactiveClass(trash, star) {
    document.querySelector('.mainbar_btn').classList.remove('inactive');

    trash.style.pointerEvents = "auto";
    star.style.pointerEvents = "auto";
}

function populateDetailsBox(task_box) {
    // let currentArrayIndex = currentProjectIndex.taskArray.length - 1;
    const index = currentProjectIndex.taskArray.findIndex(newTask => newTask.myElement === task_box);
    if (index !== -1) {
        document.querySelector('#details_title').value = `${currentProjectIndex.taskArray[index].title}`;
        document.querySelector('#details_description').value = `${currentProjectIndex.taskArray[index].description}`;
        document.querySelector('#details_due_date').value = `${currentProjectIndex.taskArray[index].dueDate}`;
    }
}

export function removeDetailsBox(box, trash, star) {
    const btn = document.querySelector('.details_close_button');
    btn.addEventListener('click', () => {
        box.remove();

        removeInactiveClass(trash, star);
    })
}

function updateTaskBox(index, title) {
    title.textContent = `${currentProjectIndex.taskArray[index].title}`;
}

function createDetailsDOM(afterChildDiv, title, date_btn, trash, star) {
    if(!document.querySelector('.details_task_box')) {
        const details_task_box = document.createElement('div');
    
        const close_btn = document.createElement('div');
        const left_container = document.createElement('div');
        const details_duedate = document.createElement('div');
        const details_title = document.createElement('div');
        const container = document.createElement('div');
        const submit = document.createElement('div');
        const details_description = document.createElement('div');
    
        container.appendChild(left_container);
        container.appendChild(details_description);
    
        left_container.appendChild(details_title);
        left_container.appendChild(details_duedate);
    
        close_btn.innerHTML = `<button class="details_close_button">&times;</button>`
        details_title.innerHTML = `<label for="details_title">Title</label>
        <input type="text" id="details_title" name="task_title">`
        details_duedate.innerHTML = `<label for="details_due_date">Due Date</label>
        <input type="date" id="details_due_date" name="task_due_date">`
    
        details_description.innerHTML = `<label for="details_description">Description</label>
        <input type="text" id="details_description" name="task_description">`
        submit.innerHTML = `<div class="parent_task_submit">
        <button class="details_task_submit">Submit</button></div>`
    
        left_container.classList.add('details_left_container');
        details_task_box.classList.add('details_task_box');
        details_title.classList.add('details_title');
        details_duedate.classList.add('details_duedate');
        details_description.classList.add('details_description');
        container.classList.add('details_container');
        close_btn.classList.add('details_close_button');
    
        details_task_box.appendChild(close_btn);
        details_task_box.appendChild(container);
        details_task_box.appendChild(submit);
    
        const parentDiv = document.querySelector('.mainbar_tasks');
        parentDiv.insertBefore(details_task_box, afterChildDiv.nextSibling);
    
    
        removeDetailsBox(details_task_box, trash, star);
        submitDetailsBox(afterChildDiv, details_task_box, title, date_btn, trash, star);
        
    }
}

function submitDetailsBox(task_box, details_box, title, date_btn, trash, star) {
    const details_btn = document.querySelector('.details_task_submit');
    details_btn.addEventListener('click', () => {

    const index = currentProjectIndex.taskArray.findIndex(newTask => newTask.myElement === task_box);
    if (index !== -1) {
        currentProjectIndex.taskArray[index].title = document.querySelector('#details_title').value;
        currentProjectIndex.taskArray[index].description = document.querySelector('#details_description').value;
        currentProjectIndex.taskArray[index].dueDate = document.querySelector('#details_due_date').value;
    }

    date_btn.textContent = `${currentProjectIndex.taskArray[index].dueDate}`;

    updateTaskBox(index, title);
    details_box.remove();

    removeInactiveClass(trash, star);
    })
}

export function createTaskDOM() {
    let currentArrayIndex = currentProjectIndex.taskArray.length - 1;

    const task_box = document.createElement('div');
    const title = document.createElement('div');
    title.textContent = `${currentProjectIndex.taskArray[currentArrayIndex].title}`;

    task_box.appendChild(title);

    const button_container = document.createElement('div');
    button_container.classList.add('task_button_container');
    const details = document.createElement('div');
    const pencil = new Image();
    pencil.src = Pencil;
    pencil.classList.add('pencil');
    details.appendChild(pencil);

    const date_btn = document.createElement('div');
    date_btn.classList.add('task_date');
    date_btn.textContent = `${currentProjectIndex.taskArray[currentArrayIndex].dueDate}`;

    const trash = new Image();
    trash.src = Trash;

    const star = document.createElement('div');
    star.classList.add('star');
    
    const emptyStar = new Image();
    emptyStar.src = empty_star;
    emptyStar.classList.add('empty_star');
    
    const fullStar = new Image();
    fullStar.src = FullStar;
    fullStar.classList.add('full_star');
    
    if (currentProjectIndex.taskArray[currentArrayIndex].priority === true) {
        star.appendChild(fullStar);
    }
    else {
        star.appendChild(emptyStar);
    }

    star.addEventListener('click', () => {
        const index = currentProjectIndex.taskArray.findIndex(newTask => newTask.myElement === task_box);

        if (currentProjectIndex.taskArray[index].priority === true) {
            star.removeChild(fullStar);
            star.appendChild(emptyStar);
            currentProjectIndex.taskArray[index].priority = false;
        }
        else {
            star.removeChild(emptyStar);
            star.appendChild(fullStar);
            currentProjectIndex.taskArray[index].priority = true;
        }
    })

    button_container.appendChild(star);
    button_container.appendChild(date_btn);
    button_container.appendChild(details);
    button_container.appendChild(trash);
    task_box.appendChild(button_container);

    document.querySelector('.mainbar_tasks').appendChild(task_box);


    details.classList.add('task_details');
    task_box.classList.add('task_box');
    title.classList.add('task_title');
    trash.classList.add('task_remove');

    revealDetailsBox(details, task_box, title, date_btn, trash, star);

    
    function assignObjToDOM() {
        const currentArrayIndex = currentProjectIndex.taskArray.length - 1;
        currentProjectIndex.taskArray[currentArrayIndex].myElement = task_box;
        currentProjectIndex.taskArray[currentArrayIndex].id_value = uuidv4();

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
    button_container.classList.add('task_button_container');
    
    const details = document.createElement('div');
    const pencil = new Image();
    pencil.src = Pencil;
    pencil.classList.add('pencil');
    details.appendChild(pencil);

    const date_btn = document.createElement('div');
    date_btn.classList.add('task_date');
    date_btn.textContent = `${currentProjectIndex.taskArray[loopIndex].dueDate}`;

    const trash = new Image();
    trash.src = Trash;

    const star = document.createElement('div');
    star.classList.add('star');
    
    const emptyStar = new Image();
    emptyStar.src = empty_star;
    emptyStar.classList.add('empty_star');
    
    const fullStar = new Image();
    fullStar.src = FullStar;
    fullStar.classList.add('full_star');
    
    if (currentProjectIndex.taskArray[loopIndex].priority === true) {
        star.appendChild(fullStar);
    }
    else {
        star.appendChild(emptyStar);
    }

    star.addEventListener('click', () => {
        const index = currentProjectIndex.taskArray.findIndex(newTask => newTask.myElement === task_box);

        if (currentProjectIndex.taskArray[index].priority === true) {
            star.removeChild(fullStar);
            star.appendChild(emptyStar);
            currentProjectIndex.taskArray[index].priority = false;
        }
        else {
            star.removeChild(emptyStar);
            star.appendChild(fullStar);
            currentProjectIndex.taskArray[index].priority = true;
        }
    })

    button_container.appendChild(star);

    button_container.appendChild(date_btn);
    button_container.appendChild(details);
    button_container.appendChild(trash);
    task_box.appendChild(button_container);

    document.querySelector('.mainbar_tasks').appendChild(task_box);


    details.classList.add('task_details');
    task_box.classList.add('task_box');
    title.classList.add('task_title');
    trash.classList.add('task_remove');

    revealDetailsBoxLoop(loopIndex, details, task_box, title, date_btn, trash, star);

    
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

function revealDetailsBoxLoop(loopIndex, variable, box, title, date_btn, trash, star) {
    const btn = variable;
    btn.addEventListener('click', () => {
        if(!document.querySelector('.details_task_box')) {
            createDetailsDOMLoop(loopIndex, box, title, date_btn, trash, star)
            populateDetailsBoxLoop(box);

            addInactiveClass(trash, star);
        }
    })
}

function populateDetailsBoxLoop(task_box) {
    const index = currentProjectIndex.taskArray.findIndex(newTask => newTask.myElement === task_box);
    if (index !== -1) {
        document.querySelector('#details_title').value = `${currentProjectIndex.taskArray[index].title}`;
        document.querySelector('#details_description').value = `${currentProjectIndex.taskArray[index].description}`;
        document.querySelector('#details_due_date').value = `${currentProjectIndex.taskArray[index].dueDate}`;
    }        
}

function removeDetailsBoxLoop(box, trash, star) {
    const btn = document.querySelector('.details_close_button');
    btn.addEventListener('click', () => {
        box.remove();

        removeInactiveClass(trash, star);
    })
}


function updateTaskBoxLoop(index, title) {
    title.textContent = `${currentProjectIndex.taskArray[index].title}`;
}

function createDetailsDOMLoop(loopIndex, afterChildDiv, title, date_btn, trash, star) {
    if(!document.querySelector('.details_task_box')) {
        const details_task_box = document.createElement('div');
    
        const close_btn = document.createElement('div');
        const left_container = document.createElement('div');
        const details_duedate = document.createElement('div');
        const details_title = document.createElement('div');
        const container = document.createElement('div');
        const submit = document.createElement('div');
        const details_description = document.createElement('div');
    
        container.appendChild(left_container);
        container.appendChild(details_description);
    
        left_container.appendChild(details_title);
        left_container.appendChild(details_duedate);
    
        close_btn.innerHTML = `<button class="details_close_button">&times;</button>`
        details_title.innerHTML = `<label for="details_title">Title</label>
        <input type="text" id="details_title" name="task_title">`
        details_duedate.innerHTML = `<label for="details_due_date">Due Date</label>
        <input type="date" id="details_due_date" name="task_due_date">`
    
        details_description.innerHTML = `<label for="details_description">Description</label>
        <input type="text" id="details_description" name="task_description">`
        submit.innerHTML = `<div class="parent_task_submit">
        <button class="details_task_submit">Submit</button></div>`
    
        left_container.classList.add('details_left_container');
        details_task_box.classList.add('details_task_box');
        details_title.classList.add('details_title');
        details_duedate.classList.add('details_duedate');
        details_description.classList.add('details_description');
        container.classList.add('details_container');
        close_btn.classList.add('details_close_button');
    
        details_task_box.appendChild(close_btn);
        details_task_box.appendChild(container);
        details_task_box.appendChild(submit);
    
        const parentDiv = document.querySelector('.mainbar_tasks');
        parentDiv.insertBefore(details_task_box, afterChildDiv.nextSibling);
    
    
        removeDetailsBoxLoop(details_task_box, trash, star);
        submitDetailsBoxLoop(afterChildDiv, details_task_box, title, date_btn, trash, star);
        
    }
}

function submitDetailsBoxLoop(task_box, details_box, title, date_btn, trash, star) {
    const details_btn = document.querySelector('.details_task_submit');

    details_btn.addEventListener('click', () => {
    const index = currentProjectIndex.taskArray.findIndex(newTask => newTask.myElement === task_box);
    if (index !== -1) {
        currentProjectIndex.taskArray[index].title = document.querySelector('#details_title').value;
        currentProjectIndex.taskArray[index].description = document.querySelector('#details_description').value;
        currentProjectIndex.taskArray[index].dueDate = document.querySelector('#details_due_date').value;
    }            


    date_btn.textContent = `${currentProjectIndex.taskArray[index].dueDate}`;

    updateTaskBoxLoop(index, title);

    details_box.remove();
    removeInactiveClass(trash, star);
    })
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

