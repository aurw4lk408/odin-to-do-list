import Dots from './dot.png'

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
            addProjectArray();
            removeProjectBox('.project_box');
            addProjectDOM("new_project", projectName);
            turn_counter++;
            stopStartClick();
        }
    })
}

function addProjectArray() {
    const project_name = Project(document.querySelector('.project_input').value);
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
    return {name};
}