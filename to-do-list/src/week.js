import { projectArray, removeTasksFromScreen } from "./project";
import Trash from './trash.png'
import empty_star from './emptyStar.png'
import FullStar from './fullStar.png'
import { addInactiveClass, removeInactiveClass } from './tasks.js';


// import { createTaskDOMTodayLoop } from "./today";

export function selectWeek() {
    const week_btn = document.querySelector('.week');
    week_btn.addEventListener('click', () => {
        document.querySelector('.mainbar_heading').textContent = "This Week";
        document.querySelector('.mainbar_btn').classList.remove('active');
        removeTasksFromScreen();

        let initial_weekArray = JSON.parse(JSON.stringify(projectArray));

        let weekArray = createWeekArray(initial_weekArray);

        for(let i = 0; i < weekArray.length; i++) {
            for(let j = 0; j < weekArray[i].taskArray.length; j++) {
                createTaskDOMTodayLoop(weekArray, i, j);
            }
        }
    })
}

function createWeekArray(initial_weekArray) {

    const currentDate = new Date();


    for (let i = 0; i < initial_weekArray.length; i++) {
        for (let j = 0; j < initial_weekArray[i].taskArray.length; j++) {
            const project_date = new Date(initial_weekArray[i].taskArray[j].dueDate);

            const timeDiff = project_date.getTime() - currentDate.getTime();
            const daysDiff = timeDiff / (24 * 60 * 60 * 1000);

            if (!(daysDiff <= 7)) {
                delete initial_weekArray[i].taskArray[j];
            }
        }
    }

    
    let weekArray = initial_weekArray.map(project => {
        const filteredValues = project.taskArray.filter(value => value !== undefined);
        return { ...project, taskArray: filteredValues };
    });


    for (let i = 0; i < weekArray.length; i++) {
        if (weekArray[i].taskArray === undefined || weekArray[i].taskArray.length === 0) {
            weekArray.splice(i, 1);
        }
    }
    
    return weekArray;
}

export function createTaskDOMTodayLoop(weekArray, i, j) {
    const task_box = document.createElement('div');
    // projectArray[i].taskArray[j].myElement = task_box;
    
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
    
    if (weekArray[i].taskArray[j].priority === true) {
        star.appendChild(fullStar);
    }
    else {
        star.appendChild(emptyStar);
    }

    star.addEventListener('click', () => {
        const index = weekArray[i].taskArray.findIndex(newTask => newTask.myElement === task_box);
        const changedObject = weekArray[i].taskArray[index];

        if (weekArray[i].taskArray[index].priority === true) {
            star.removeChild(fullStar);
            star.appendChild(emptyStar);
            weekArray[i].taskArray[index].priority = false;

            for (let i = 0; i < projectArray.length; i++) {
                for (let j = 0; j < projectArray[i].taskArray.length; j++) {
                    if (changedObject.id_value === projectArray[i].taskArray[j].id_value) {
                        projectArray[i].taskArray[j].priority = false;
                    }
                }
            }
        }
        else {
            star.removeChild(emptyStar);
            star.appendChild(fullStar);
            weekArray[i].taskArray[index].priority = true;

            for (let i = 0; i < projectArray.length; i++) {
                for (let j = 0; j < projectArray[i].taskArray.length; j++) {
                    if (changedObject.id_value === projectArray[i].taskArray[j].id_value) {
                        projectArray[i].taskArray[j].priority = true;
                    }
                }
            }
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

    revealDetailsBoxTodayLoop(weekArray, i, details, task_box, title, date_btn, trash, star);

    
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


                    // const index = weekArray[i].taskArray.findIndex(newTask => newTask.myElement === task_box);
                    // if (index !== -1) {
                    //     const removedObject = weekArray[i].taskArray.splice(index, 1)[0];
                    //     removedObject.myElement.remove();
                    //     for (let k = 0; k < projectArray.length; k++) {        
                    //         for (let l = 0; l < projectArray[k].taskArray.length; l++) {
                    //             if (projectArray[k].taskArray[l].id_value === removedObject.id_value) {
                    //                 projectArray[k].taskArray.splice(l, 1);

                    //                 console.log(weekArray);
                    //                 console.log(projectArray);
                    //             }
                    //         }
                    //     }
                    // }

                })
            }
        removeTaskButtonLoopToday(task_box, i, j);
    // }
        
    // assignObjToDOMToday(task_box);
}



function revealDetailsBoxTodayLoop(weekArray, i, variable, box, title, date_btn, trash, star) {
    const btn = variable;
    btn.addEventListener('click', () => {
        if(!document.querySelector('.details_task_box')) {
            createDetailsDOMTodayLoop(weekArray, i, box, title, date_btn, trash, star)
            populateDetailsBoxTodayLoop(weekArray, box, i);

            addInactiveClass(trash, star);
        }
    })
}

function populateDetailsBoxTodayLoop(weekArray, box, i) {
    
    const index = weekArray[i].taskArray.findIndex(newTask => newTask.myElement === box);
    console.log(index);
        if (index !== -1) {
                document.querySelector('#details_title').value = `${weekArray[i].taskArray[index].title}`;
                document.querySelector('#details_description').value = `${weekArray[i].taskArray[index].description}`;
                document.querySelector('#details_due_date').value = `${weekArray[i].taskArray[index].dueDate}`;
                document.querySelector('#details_priority').value = `${weekArray[i].taskArray[index].priority}`;
            }


    // for (let i = 0; i < weekArray.length; i++) {
    //     for (let j = 0; j < weekArray[i].taskArray.length; j++) {
    //         if (weekArray[i].taskArray[j].myElement === box) {
    //             document.querySelector('#details_title').value = `${weekArray[i].taskArray[j].title}`;
    //             document.querySelector('#details_description').value = `${weekArray[i].taskArray[j].description}`;
    //             document.querySelector('#details_due_date').value = `${weekArray[i].taskArray[j].dueDate}`;
    //             document.querySelector('#details_priority').value = `${weekArray[i].taskArray[j].priority}`;
    //         }

    //     }
    // }

        // document.querySelector('#details_title').value = `${weekArray[i].taskArray[j].title}`;
        // document.querySelector('#details_description').value = `${weekArray[i].taskArray[j].description}`;
        // document.querySelector('#details_due_date').value = `${weekArray[i].taskArray[j].dueDate}`;
        // document.querySelector('#details_priority').value = `${weekArray[i].taskArray[j].priority}`;
}

function removeDetailsBoxTodayLoop(box, trash, star) {
    const btn = document.querySelector('.details_close_button');
    btn.addEventListener('click', () => {
        box.remove();

        removeInactiveClass(trash, star);
    })
}


function updateTaskBoxTodayLoop(weekArray, i, index, title) {
    title.textContent = `${weekArray[i].taskArray[index].title}`;
    // document.querySelector('.task_title').textContent = `${weekArray[i].taskArray[index].title}`;

}

function createDetailsDOMTodayLoop(weekArray, i, afterChildDiv, title, date_btn, trash, star) {
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
    
    
        removeDetailsBoxTodayLoop(details_task_box, trash, star);
        submitDetailsBoxTodayLoop(weekArray, i, afterChildDiv, details_task_box, title, date_btn, trash, star);
        
    }
}

function submitDetailsBoxTodayLoop(weekArray, i, task_box, details_box, title, date_btn, trash, star) {
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


    const currentDate = new Date();
    const project_date = new Date(weekArray[i].taskArray[index].dueDate);

    const timeDiff = project_date.getTime() - currentDate.getTime();
    const daysDiff = timeDiff / (24 * 60 * 60 * 1000);

    if (!(daysDiff <= 7)) {
        weekArray[i].taskArray.splice(index, 1)
    }

    details_box.remove();
    removeTasksFromScreen();

    removeInactiveClass(trash, star);

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