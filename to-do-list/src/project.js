import Dots from './dot.png'
import { addTaskButton, revealTaskBox, createTaskBox, createNewTask } from './tasks';

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

    addProjectArray(add_project, "text");
    selectProject(add_project, text);
}


export function addProjectArray(variable, text, callback) {
    let projectName = text;
    const project = Project(projectName);
    project.myElement = variable;

    projectArray.push(project);
    console.log(projectArray);

    setTimeout(() => {
        callback(project);
    }, 2000);
}
        

// export function addProjectArray(variable, text, createNewTask) {
//     let projectName = text;
//     const project = Project(projectName);
//     project.myElement = variable;

//     projectArray.push(project);
//     console.log(projectArray);

//     createNewTask(project);
// }

function selectProject(vari, txt) {
    console.log(vari);
    console.log(txt);

    vari.addEventListener('click', () => {
        document.querySelector('.mainbar_heading').textContent = txt;

        if (!document.querySelector('.add_task_btn')) {
            addTaskButton();
        }
        createTaskBox();
        revealTaskBox();

        console.log("I was clicked in selectProject");
    });
}

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
            
            removeProjectBox('.project_box');
            newProjectDOM(projectName);
            addProjectArray(projectName, (project) => {
                createNewTask(project);
              });            
            selectProject(projectName);

            turn_counter++;
            stopStartClick();
        }
    })
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
    
    return {name, taskArray};
}