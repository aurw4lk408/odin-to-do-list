import { projectArray, removeTasksFromScreen } from './project.js'
import empty_star from './emptyStar.png'
import FullStar from './fullStar.png'
import Trash from './trash.png'
import { addInactiveClass, removeInactiveClass } from './tasks.js';
// import { revealDetailsBox } from './tasks.js';


export function selectInbox() {

    const inbox = document.querySelector('.all_tasks');
    inbox.addEventListener('click', () => {
        document.querySelector('.mainbar_heading').textContent = "Inbox";
        document.querySelector('.mainbar_btn').classList.remove('active');
        removeTasksFromScreen();
        for(let i = 0; i < projectArray.length; i++) {
            for(let j = 0; j < projectArray[i].taskArray.length; j++) {
                createTaskDOMInboxLoop(i, j);
            }
        }
    })
}


function createTaskDOMInboxLoop(i, j) {
    const task_box = document.createElement('div');
    projectArray[i].taskArray[j].myElement = task_box;

    const title = document.createElement('div');
    title.textContent = `${projectArray[i].taskArray[j].title}`;

    task_box.appendChild(title);

    const button_container = document.createElement('div');
    button_container.classList.add('task_button_container')
    const details = document.createElement('div');
    details.textContent = "details"
    const pencil = new Image();
    pencil.src = Pencil;
    pencil.classList.add('pencil');
    details.appendChild(pencil);

    const date_btn = document.createElement('div');
    date_btn.classList.add('task_date');
    date_btn.textContent = `${projectArray[i].taskArray[j].dueDate}`;


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
    
    if (projectArray[i].taskArray[j].priority === true) {
        star.appendChild(fullStar);
    }
    else {
        star.appendChild(emptyStar);
    }

    star.addEventListener('click', () => {
        const index = projectArray[i].taskArray.findIndex(newTask => newTask.myElement === task_box);

        if (projectArray[i].taskArray[index].priority === true) {
            star.removeChild(fullStar);
            star.appendChild(emptyStar);
            projectArray[i].taskArray[index].priority = false;

        }
        else {
            star.removeChild(emptyStar);
            star.appendChild(fullStar);
            projectArray[i].taskArray[index].priority = true;

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

    revealDetailsBoxInboxLoop(i, details, task_box, title, date_btn, trash, star);

    
    // function assignObjToDOMInbox() {
    //     projectArray[i].taskArray[j].myElement = task_box;

            function removeTaskButtonLoop() {
                trash.addEventListener('click', () => {
                    // code is wrong here, try to figure it out later
                    
                    // projectArray[i].taskArray[j].myElement = task_box;
                    // projectArray[i].taskArray[j].myElement.remove();

                    // console.log(projectArray);
                    // projectArray[i].taskArray.splice(j, 1);

                    // console.log(projectArray);
                    // console.log(j);

                    const index = projectArray[i].taskArray.findIndex(newTask => newTask.myElement === task_box);
                    console.log(index);

                    if (index !== -1) {
                        const removedObject = projectArray[i].taskArray.splice(index, 1)[0];
                        removedObject.myElement.remove();
                    }
                })
            }
        removeTaskButtonLoop(task_box, i);
}



function revealDetailsBoxInboxLoop(i, variable, box, title, date_btn, trash, star) {
    const btn = variable;
    btn.addEventListener('click', () => {
        if(!document.querySelector('.details_task_box')) {
            createDetailsDOMInboxLoop(i, box, title, date_btn, trash, star)
            populateDetailsBoxInboxLoop(i, box);

            addInactiveClass(trash, star);
        }
    })
}

function populateDetailsBoxInboxLoop(i, task_box) {
    const index = projectArray[i].taskArray.findIndex(newTask => newTask.myElement === task_box);
    if (index !== -1) {
        document.querySelector('#details_title').value = `${projectArray[i].taskArray[index].title}`;
        document.querySelector('#details_description').value = `${projectArray[i].taskArray[index].description}`;
        document.querySelector('#details_due_date').value = `${projectArray[i].taskArray[index].dueDate}`;
        document.querySelector('#details_priority').value = `${projectArray[i].taskArray[index].priority}`;
    }
}

function removeDetailsBoxInboxLoop(box, trash, star) {
    const btn = document.querySelector('.details_close_button');
    btn.addEventListener('click', () => {
        box.remove();

        removeInactiveClass(trash, star);
    })
}


function updateTaskBoxInboxLoop(i, index, title) {
    title.textContent = `${projectArray[i].taskArray[index].title}`;
}

function createDetailsDOMInboxLoop(i, afterChildDiv, title, date_btn, trash, star) {
    if(!document.querySelector('.details_task_box')) {
        const details_task_box = document.createElement('div');
    
        const close_btn = document.createElement('div');
        const left_container = document.createElement('div');
        const details_duedate = document.createElement('div');
        const details_priority = document.createElement('div');
        const details_title = document.createElement('div');
        const container = document.createElement('div');
        const submit = document.createElement('div');
        const details_description = document.createElement('div');
    
        container.appendChild(left_container);
        container.appendChild(details_description);
    
        left_container.appendChild(details_title);
        left_container.appendChild(details_duedate);
        left_container.appendChild(details_priority);
    
        close_btn.innerHTML = `<button class="details_close_button">&times;</button>`
        details_title.innerHTML = `<label for="details_title">Title</label>
        <input type="text" id="details_title" name="task_title">`
        details_priority.innerHTML = `<label for="details_priority">Priority</label>
        <input type="checkbox" id="details_priority" name="task_priority">`
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
        details_priority.classList.add('details_priority');
        details_description.classList.add('details_description');
        container.classList.add('details_container');
        close_btn.classList.add('details_close_button');
    
        details_task_box.appendChild(close_btn);
        details_task_box.appendChild(container);
        details_task_box.appendChild(submit);
    
        const parentDiv = document.querySelector('.mainbar_tasks');
        parentDiv.insertBefore(details_task_box, afterChildDiv.nextSibling);
    
    
        removeDetailsBoxInboxLoop(details_task_box, trash, star);
        submitDetailsBoxInboxLoop(i, afterChildDiv, details_task_box, title, date_btn, trash, star);
        
    }
}

function submitDetailsBoxInboxLoop(i, task_box, details_box, title, date_btn, trash, star) {
    const details_btn = document.querySelector('.details_task_submit');

    details_btn.addEventListener('click', () => {
    
    const index = projectArray[i].taskArray.findIndex(newTask => newTask.myElement === task_box);
    if (index !== -1) {
        projectArray[i].taskArray[index].title = document.querySelector('#details_title').value;
        projectArray[i].taskArray[index].description = document.querySelector('#details_description').value;
        projectArray[i].taskArray[index].dueDate = document.querySelector('#details_due_date').value;
        if (!document.querySelector('#details_priority').checked) {
            projectArray[i].taskArray[index].priority = false;
        }
        else {
            projectArray[i].taskArray[index].priority = true;
        }
    }


    date_btn.textContent = `${projectArray[i].taskArray[index].dueDate}`;
    updateTaskBoxInboxLoop(i, index, title);

    details_box.remove();
    removeInactiveClass(trash, star);
    })
}