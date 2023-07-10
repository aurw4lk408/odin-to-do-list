import './reset.css'
import './style.css'

import { addProject, addProjectDOM } from './project'
import { addTaskButton, revealTaskBox } from './tasks';
import { selectInbox } from './inbox';
import { selectToday } from './today';
// require.context("../images/", true, /\.(png|svg|jpg|gif)$/);

function pageLoad() {
    selectInbox();
    selectToday();

    addProjectDOM("add_project", "Add new project");
    addProject();

    // addTaskButton();
    revealTaskBox();

    document.querySelector('.mainbar_heading').textContent = "Inbox"
}

pageLoad();
