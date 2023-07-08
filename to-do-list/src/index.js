import './reset.css'
import './style.css'

import { addProject, addProjectDOM } from './project'
import { addTaskButton, revealTaskBox } from './tasks';
// require.context("../images/", true, /\.(png|svg|jpg|gif)$/);

function pageLoad() {


    addProjectDOM("add_project", "Add new project");
    addProject();

    addTaskButton();
    revealTaskBox();

    document.querySelector('.mainbar_heading').textContent = "Inbox"
}

pageLoad();
