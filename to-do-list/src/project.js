import Dots from './dot.png'
import { createNewTask, createTaskDOM, createTaskDOMLoop } from './tasks';

let projectArray = [];
let turn_counter = 1;

//add new project text
export function addProjectDOM(className, text) {
    const add_project = document.createElement('div');
    add_project.classList.add(className);

    const picture = new Image();
    picture.src = Dots;
    add_project.appendChild(picture);

    const project_text = document.createElement('p');
    project_text.textContent = text;
    add_project.appendChild(project_text);
    document.querySelector('.sidebar_projects').appendChild(add_project);
}

// function newProjectDOM(text) {
//     const add_project = document.createElement('div');
//     add_project.classList.add('new_project');

//     const picture = new Image();
//     picture.src = Dots;
//     add_project.appendChild(picture);

//     const project_text = document.createElement('p');
//     project_text.textContent = text;
//     add_project.appendChild(project_text);
//     document.querySelector('.sidebar_projects').appendChild(add_project);
// }


//add new project - turn into button
export function addProject() {
    const project_btn = document.querySelector('.add_project');

    project_btn.addEventListener('click', () => {
        turn_counter--;
        stopStartClick();
        addProjectBox();
        addProjectBtn();
        cancelProjectBtn();
    });
}

function addProjectBox() {
    const box = document.createElement('div');
    const input = document.createElement('input');
    input.setAttribute("type", "text");
    box.appendChild(input);

    const btn_container = document.createElement('div');
    const add_btn = document.createElement('div');
    const cancel = document.createElement('div');

    add_btn.textContent = "Add";
    cancel.textContent = "Cancel";

    btn_container.appendChild(add_btn);
    btn_container.appendChild(cancel);
    box.appendChild(btn_container);
    document.querySelector('.sidebar_projects').appendChild(box);


    box.classList.add('project_box');
    input.classList.add('project_input');
    btn_container.classList.add('project_btn_container');
    add_btn.classList.add('project_add_btn');
    cancel.classList.add('project_cancel_btn');
}

function addProjectBtn() {
    const add_btn = document.querySelector('.project_add_btn');
    add_btn.addEventListener('click', () => {
        if (document.querySelector('.project_input').value !== "") {
            let projectName = document.querySelector('.project_input').value;

            // const project = Project(projectName);
            // project.addProjectArray();
            // project.newProjectDOM(projectName)

            // removeProjectBox('.project_box');
            // turn_counter++;
            // stopStartClick();

            const newProject = makeProjectArray();
            newProject.addProjectArray();
            newProject.newProjectDOM(projectName)

            removeProjectBox('.project_box');
            turn_counter++;
            stopStartClick();
        }
    })
}

let currentProject;

export let currentProjectIndex;

export function makeProjectArray() {
    const project = Project(document.querySelector('.project_input').value);

    function addProjectArray() {
        projectArray.push(project);
    }

    function newProjectDOM(text) {
        const add_project = document.createElement('div');
        add_project.classList.add('new_project');
    
        const picture = new Image();
        picture.src = Dots;
        add_project.appendChild(picture);
    
        const project_text = document.createElement('p');
        project_text.textContent = text;
        add_project.appendChild(project_text);
        document.querySelector('.sidebar_projects').appendChild(add_project);

        //asign project to DOM
        project.myElement = add_project;

        function selectProject() {
            add_project.addEventListener('click', () => {
                document.querySelector('.mainbar_heading').textContent = text;

                const index = projectArray.findIndex(project => project.myElement === add_project);
                if (index !== -1) {
                    currentProjectIndex = projectArray[index];
                }
                
                //delete all tasks on screen
                removeTasksFromScreen();

                //loop through currentprojectindex.taskArray
                //check for all the tasks, then render tasks for that currentprojectindex
                renderCurrentIndexTasks();
            })
        }
        selectProject();
    }

    function dummyFunction() {
        createNewTask(project);
    }
    
    return { addProjectArray, newProjectDOM, dummyFunction, createNewTask }
}

function renderCurrentIndexTasks () {
    for (let i = 0; i < currentProjectIndex.taskArray.length; i++) {
        createTaskDOMLoop(i);
    }
}

function removeTasksFromScreen() {
    let tasks = document.querySelector('.mainbar_tasks');
    while (tasks.firstChild) {
        tasks.removeChild(tasks.firstChild);
    }
}

function removeProjectBox(className) {
    document.querySelector(className).remove();
}

function cancelProjectBtn() {
    const cancel_btn = document.querySelector('.project_cancel_btn');
    cancel_btn.addEventListener('click', () => {
        removeProjectBox('.project_box');
        turn_counter++;
        stopStartClick();
    });
}

function stopStartClick() {
    if (turn_counter === 0) {
        document.querySelector('.add_project').style.pointerEvents = "none";
    }
    else if (turn_counter === 1) {
        document.querySelector('.add_project').style.pointerEvents = "auto";
    }
}

function Project(name) {
    let taskArray = [];
    
    return { name, taskArray }
}