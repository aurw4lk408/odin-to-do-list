import './reset.css'
import './style.css'
import Dots from './dot.png'
// require.context("../images/", true, /\.(png|svg|jpg|gif)$/);

function Task(title, description, dueDate, priority) {
    return { title, description, dueDate, priority }
}

function pageLoad() {


    addProjectDOM("add_project", "Add new project");
    addProject();

    document.querySelector('.mainbar_heading').textContent = "Inbox"
}

let projectArray = [];

pageLoad();


//add new project text
function addProjectDOM(className, text) {
    const add_project = document.createElement('div');
    add_project.classList.add(className);

    const dot = new Image();
    dot.src = Dots;
    add_project.appendChild(dot);

    const project_text = document.createElement('p');
    project_text.textContent = text;
    add_project.appendChild(project_text);
    document.querySelector('.sidebar_projects').appendChild(add_project);
}


//add new project - turn into button
function addProject() {
    const project_btn = document.querySelector('.add_project');
    project_btn.addEventListener('click', () => {
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
            addProjectArray();
            removeProjectBox('.project_box');
            addProjectDOM("new_project", projectName)
        }
    })
}


function addProjectArray() {
    const project_name = document.querySelector('.project_input').value;
    projectArray.push(project_name);

    console.log(projectArray);
}

function removeProjectBox(className) {
    document.querySelector(className).remove();
}

function cancelProjectBtn() {
    const cancel_btn = document.querySelector('.project_cancel_btn');
    cancel_btn.addEventListener('click', () => {
        removeProjectBox('.project_box');
    });
}