import { projectArray, removeTasksFromScreen } from "./project";
import Trash from './trash.png'


export function selectToday() {
    const today_btn = document.querySelector('.today');
    today_btn.addEventListener('click', () => {
        document.querySelector('.mainbar_heading').textContent = "Today";
        document.querySelector('.mainbar_btn').classList.remove('active');
        removeTasksFromScreen();
        
        let initial_todayArray = JSON.parse(JSON.stringify(projectArray));

        let todayArray = createTodayArray(initial_todayArray);

        for(let i = 0; i < todayArray.length; i++) {
            for(let j = 0; j < todayArray[i].taskArray.length; j++) {
                createTaskDOMTodayLoop(todayArray, i, j);
            }
        }
    })
}

function createTodayArray(initial_todayArray) {
    const currentDate = new Date().toISOString().split('T')[0];
    for (let i = 0; i < initial_todayArray.length; i++) {
        for (let j = 0; j < initial_todayArray[i].taskArray.length; j++) {
            if (initial_todayArray[i].taskArray[j].dueDate !== currentDate) {
                delete initial_todayArray[i].taskArray[j];
            }
        }
    }

    
    let todayArray = initial_todayArray.map(project => {
        const filteredValues = project.taskArray.filter(value => value !== undefined);
        return { ...project, taskArray: filteredValues };
    });


    for (let i = 0; i < todayArray.length; i++) {
        if (todayArray[i].taskArray === undefined || todayArray[i].taskArray.length === 0) {
            todayArray.splice(i, 1);
        }
    }
    
    return todayArray;
}

export function createTaskDOMTodayLoop(todayArray, i, j) {
    const task_box = document.createElement('div');
    projectArray[i].taskArray[j].myElement = task_box;


    const title = document.createElement('div');
    title.textContent = `${todayArray[i].taskArray[j].title}`;

    task_box.appendChild(title);

    const button_container = document.createElement('div');
    button_container.classList.add('task_button_container')
    const details = document.createElement('div');
    details.textContent = "details"

    revealDetailsBoxTodayLoop(todayArray, i, j, details, task_box, title);

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
    
    // function assignObjToDOMToday() {
    //     projectArray[i].taskArray[j].myElement = task_box;

            function removeTaskButtonLoopToday() {
                trash.addEventListener('click', () => {
                    const index = projectArray[i].taskArray.findIndex(newTask => newTask.myElement === task_box);
                    console.log(index);

                    if (index !== -1) {
                        const removedObject = projectArray[i].taskArray.splice(index, 1)[0];
                        removedObject.myElement.remove();
                    }
                    // if (todayArray[i].taskArray.splice(j, 1)[0] === undefined) {
                    //     const last = todayArray.pop();
                    //     last.myElement.remove();
                    // }
                    //     else if (todayArray[i].taskArray.splice(j, 1)[0] === undefined) {
                    //         const removedObject = todayArray[i].taskArray.splice(j, 1)[0];
                    //         removedObject.myElement.remove();
                    //         console.log(todayArray);
                    //     }
                })
            }
        removeTaskButtonLoopToday(task_box, i, j);
    // }
        
    // assignObjToDOMToday(task_box);
}



function revealDetailsBoxTodayLoop(todayArray, i, j, variable, box, title) {
    const btn = variable;
    btn.addEventListener('click', () => {
        if(!document.querySelector('.details_task_box')) {
            createDetailsDOMTodayLoop(todayArray, i, j, box, title)
            populateDetailsBoxTodayLoop(todayArray, i, j);
        }

        console.log(todayArray);
    })
}

function populateDetailsBoxTodayLoop(todayArray, i, j) {
    // let currentArrayIndex = currentProjectIndex.taskArray.length - 1;
        document.querySelector('#details_title').value = `${todayArray[i].taskArray[j].title}`;
        document.querySelector('#details_description').value = `${todayArray[i].taskArray[j].description}`;
        document.querySelector('#details_due_date').value = `${todayArray[i].taskArray[j].dueDate}`;
        document.querySelector('#details_priority').value = `${todayArray[i].taskArray[j].priority}`;
}

function removeDetailsBoxTodayLoop(box) {
    const btn = document.querySelector('.details_close_button');
    btn.addEventListener('click', () => {
        box.remove();
    })
}


function updateTaskBoxTodayLoop(todayArray, i, j, title) {
    title.textContent = `${todayArray[i].taskArray[j].title}`;
}

function createDetailsDOMTodayLoop(todayArray, i, j, afterChildDiv, title) {
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
    
    
        removeDetailsBoxTodayLoop(details_task_box);
        submitDetailsBoxTodayLoop(todayArray, i, j, details_task_box, title);
        
    }
}

function submitDetailsBoxTodayLoop(todayArray, i, j, box, title) {
    const details_btn = document.querySelector('.details_task_submit');

    details_btn.addEventListener('click', () => {
     
    todayArray[i].taskArray[j].title = document.querySelector('#details_title').value;
    todayArray[i].taskArray[j].description = document.querySelector('#details_description').value;
    todayArray[i].taskArray[j].dueDate = document.querySelector('#details_due_date').value;
    todayArray[i].taskArray[j].priority = document.querySelector('#details_priority').value;

    console.log(todayArray);

    updateTaskBoxTodayLoop(todayArray, i, j, title);

    box.remove();
    })
}