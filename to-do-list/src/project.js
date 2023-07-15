import Dots from './dot.png'
import Plus from './plus.png'
import List from './list.png'
import { createNewTask, createTaskDOMLoop } from './tasks';

export let projectArray = [];
let turn_counter = 1;



//add new project text
export function addProjectDOM(className, text) {
    const add_project = document.createElement('div');
    add_project.classList.add(className);

    const picture = new Image();
    picture.src = Plus;
    picture.classList.add('plus');
    add_project.appendChild(picture);

    const project_text = document.createElement('p');
    project_text.textContent = text;
    add_project.appendChild(project_text);
    document.querySelector('.sidebar_projects').appendChild(add_project);
}

function renameProjectBox(add_project) {
    const box = document.createElement('div');
    const input = document.createElement('input');
    input.setAttribute("type", "text");
    box.appendChild(input);

    const btn_container = document.createElement('div');
    const add_btn = document.createElement('div');
    const cancel = document.createElement('div');

    add_btn.textContent = "Rename";
    cancel.textContent = "Cancel";

    btn_container.appendChild(add_btn);
    btn_container.appendChild(cancel);
    box.appendChild(btn_container);

    const parentDiv = document.querySelector('.sidebar_projects');
    parentDiv.insertBefore(box, add_project.nextSibling);

    box.classList.add('rename_project_box');
    input.classList.add('rename_project_input');
    btn_container.classList.add('rename_project_btn_container');
    add_btn.classList.add('rename_project_add_btn');
    cancel.classList.add('rename_project_cancel_btn');

    return { add_btn, cancel, box, input };
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

            const newProject = makeProjectArray();
            newProject.addProjectArray();
            newProject.newProjectDOM(projectName)

            removeProjectBox('.project_box');
            turn_counter++;
            stopStartClick();
        }
    })
}

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
        picture.src = List;
        picture.classList.add('list');
    
        const project_text = document.createElement('p');
        project_text.textContent = text;

        const project_left_container = document.createElement('div');
        project_left_container.appendChild(picture);
        project_left_container.appendChild(project_text);
        project_left_container.classList.add('project_left_container');

        const dot_container = document.createElement('div');
        const picture1 = new Image();
        picture1.src = Dots;
        picture1.classList.add('dot');
        dot_container.append(picture1);
        dot_container.classList.add('dot_container');
        
        add_project.appendChild(project_left_container);
        add_project.appendChild(dot_container);
        document.querySelector('.sidebar_projects').insertBefore(add_project, document.querySelector('.add_project'));

        //asign project to DOM
        project.myElement = add_project;

        dot_container.addEventListener('click', (event) => {
            event.stopPropagation();

            if (!document.querySelector('.edit_window')) {
                const edit_window = document.createElement('div');
                const rename = document.createElement('div');
                rename.textContent = "Edit"
    
                const remove = document.createElement('div');
                remove.textContent = "Remove";
    
                rename.classList.add('rename_window');
                remove.classList.add('remove_window');
                edit_window.classList.add('edit_window');
    
                edit_window.append(rename, remove);
                dot_container.append(edit_window);

                rename.addEventListener('click', () => {
                    const buttons = renameProjectBox(add_project)

                    const project_box = buttons.box;
                    const add_btn = buttons.add_btn;
                    const cancel = buttons.cancel;
                    const input = buttons.input;

                    add_btn.addEventListener('click', () => {
                        const index = projectArray.findIndex(project => project.myElement === add_project);

                        if (index !== -1) {
                            const renamedProject = projectArray[index];
                            renamedProject.name = input.value;
                            project_text.textContent = input.value;
                            document.querySelector('.mainbar_heading').textContent = input.value;

                            console.log(projectArray);
                            project_box.remove();
                        }
                    })

                    cancel.addEventListener('click', () => {
                        project_box.remove();
                    })
                    // edit_window.remove();
                })

                remove.addEventListener('click', () => {
                    const index = projectArray.findIndex(project => project.myElement === add_project);
                    if (index !== -1) {
                        const removedProject = projectArray.splice(index, 1)[0];
                        removedProject.myElement.remove();
                        removeTasksFromScreen();
                        document.querySelector('.mainbar_heading').textContent = "Select a project!"
                    }
                })

                document.addEventListener('click', (event) => {
                    const clickedElement = event.target;
                    const edit_window = document.querySelector('.edit_window');
                    if ((edit_window && clickedElement !== edit_window) && !edit_window.contains(clickedElement)) {
                      edit_window.remove();
                    }
                  });            
            }
            else {
                document.querySelector('.edit_window').remove();
            }
        })

        function selectProject() {
            add_project.addEventListener('click', () => {
                document.querySelector('.mainbar_btn').classList.add('active');

                const index = projectArray.findIndex(project => project.myElement === add_project);

                document.querySelector('.mainbar_heading').textContent = `${projectArray[index].name}`;

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

export function removeTasksFromScreen() {
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