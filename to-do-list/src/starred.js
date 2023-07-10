import { projectArray, removeTasksFromScreen } from "./project";
import Trash from './trash.png'
import { createTaskDOMTodayLoop } from "./today";

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