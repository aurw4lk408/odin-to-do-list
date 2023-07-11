import { projectArray, removeTasksFromScreen } from "./project";
import Trash from './trash.png'
// import { createTaskDOMTodayLoop } from "./today";

export function selectStarred() {
    const starred_btn = document.querySelector('.important');
    starred_btn.addEventListener('click', () => {
        document.querySelector('.mainbar_heading').textContent = "Starred";
        document.querySelector('.mainbar_btn').classList.remove('active');
        removeTasksFromScreen();

        let initial_starredArray = JSON.parse(JSON.stringify(projectArray));

        let starredArray = createStarredArray(initial_starredArray);

        for (let i = 0; i < starredArray.length; i++) {
            for (let j = 0; j < starredArray[i].taskArray.length; j++) {
                createTaskDOMTodayLoop(starredArray, i, j);
            }
        }
    })
}

function createStarredArray(array) {
    
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].taskArray.length; j++) {
            if (array[i].taskArray[j].priority === false) {
                delete array[i].taskArray[j];
            }
        }
    }

    let starredArray = array.map(project => {
        const filteredValues = project.taskArray.filter(value => value !== undefined);
        return { ...project, taskArray: filteredValues };
    });

    for (let i = 0; i < starredArray.length; i++) {
        if (starredArray[i].taskArray === undefined || starredArray[i].taskArray.length === 0) {
            starredArray.splice(i, 0);
        }
    }

    return starredArray;
}

export function createTaskDOMTodayLoop(weekArray, i, j) {
    const task_box = document.createElement('div');
    weekArray[i].taskArray[j].myElement = task_box;


    const title = document.createElement('div');
    title.textContent = `${weekArray[i].taskArray[j].title}`;

    task_box.appendChild(title);

    const button_container = document.createElement('div');
    button_container.classList.add('task_button_container')
    const details = document.createElement('div');
    details.textContent = "details";
    const date_btn = document.createElement('div');
    date_btn.classList.add('task_date');
    date_btn.textContent = `${weekArray[i].taskArray[j].dueDate}`;

    revealDetailsBoxTodayLoop(weekArray, i, j, details, task_box, title, date_btn);

    const trash = new Image();
    trash.src = Trash;
    button_container.appendChild(date_btn);
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
                    const index = weekArray[i].taskArray.findIndex(newTask => newTask.myElement === task_box);
                    if (index !== -1) {
                        const removedObject = weekArray[i].taskArray.splice(index, 1)[0];
                        removedObject.myElement.remove();
                        for (let k = 0; k < projectArray.length; k++) {        
                            for (let l = 0; l < projectArray[k].taskArray.length; l++) {
                                if (projectArray[k].taskArray[l].id_value === removedObject.id_value) {
                                    projectArray[k].taskArray.splice(l, 1);

                                    console.log(weekArray);
                                    console.log(projectArray);
                                }
                            }
                        }
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



function revealDetailsBoxTodayLoop(weekArray, i, j, variable, box, title, date_btn) {
    const btn = variable;
    btn.addEventListener('click', () => {
        if(!document.querySelector('.details_task_box')) {
            createDetailsDOMTodayLoop(weekArray, i, box, title, date_btn)
            populateDetailsBoxTodayLoop(weekArray, box, i);
        }

        console.log(weekArray);
    })
}

function populateDetailsBoxTodayLoop(weekArray, box, i) {
    const index = weekArray[i].taskArray.findIndex(newTask => newTask.myElement === box);
        if (index !== -1) {
            document.querySelector('#details_title').value = `${weekArray[i].taskArray[index].title}`;
            document.querySelector('#details_description').value = `${weekArray[i].taskArray[index].description}`;
            document.querySelector('#details_due_date').value = `${weekArray[i].taskArray[index].dueDate}`;
            document.querySelector('#details_priority').value = `${weekArray[i].taskArray[index].priority}`;
        }
}

function removeDetailsBoxTodayLoop(box) {
    const btn = document.querySelector('.details_close_button');
    btn.addEventListener('click', () => {
        box.remove();
    })
}


function updateTaskBoxTodayLoop(weekArray, i, index, title) {
    title.textContent = `${weekArray[i].taskArray[index].title}`;
}

function createDetailsDOMTodayLoop(weekArray, i, afterChildDiv, title, date_btn) {
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
        submitDetailsBoxTodayLoop(weekArray, i, afterChildDiv, details_task_box, title, date_btn);
        
    }
}

function submitDetailsBoxTodayLoop(weekArray, i, task_box, details_box, title, date_btn) {
    const details_btn = document.querySelector('.details_task_submit');

    details_btn.addEventListener('click', () => {
    
    const index = weekArray[i].taskArray.findIndex(newTask => newTask.myElement === task_box);
        if (index !== -1) {
            weekArray[i].taskArray[index].title = document.querySelector('#details_title').value;
            weekArray[i].taskArray[index].description = document.querySelector('#details_description').value;
            weekArray[i].taskArray[index].dueDate = document.querySelector('#details_due_date').value;
                
            if (!document.querySelector('#details_priority').checked) {
                weekArray[i].taskArray[index].priority = false;
            }
            else {
                weekArray[i].taskArray[index].priority = true;
            }       
        }

    updateTaskBoxTodayLoop(weekArray, i, index, title);
    updateProjectArrayDetails(weekArray, i, index);

    date_btn.textContent = `${weekArray[i].taskArray[index].dueDate}`;

    if (weekArray[i].taskArray[index].priority === false || weekArray[i].taskArray[index].priority === "false") {
        weekArray[i].taskArray.splice(index, 1)
    }

    details_box.remove();
    removeTasksFromScreen();

    for(let i = 0; i < weekArray.length; i++) {
        for(let j = 0; j < weekArray[i].taskArray.length; j++) {
            createTaskDOMTodayLoop(weekArray, i, j);
        }
    }
    })
}

function updateProjectArrayDetails(weekArray, i, index) {
    for (let k = 0; k < projectArray.length; k++) {        
        for (let l = 0; l < projectArray[k].taskArray.length; l++) {
            if (projectArray[k].taskArray[l].id_value === weekArray[i].taskArray[index].id_value) {  
                projectArray[k].taskArray[l] = weekArray[i].taskArray[index];
            }
        }
    }

}