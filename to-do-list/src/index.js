import "./reset.css";
import "./style.css";

import { addProject, addProjectDOM } from "./project";
import { revealTaskBox } from "./tasks";
import { selectInbox } from "./inbox";
import { selectToday } from "./today";
import { selectWeek } from "./week";
import { selectStarred } from "./starred";

function pageLoad() {
  selectInbox();
  selectToday();
  selectWeek();
  selectStarred();

  addProjectDOM("add_project", "Add new project");
  addProject();

  revealTaskBox();

  document.querySelector(".mainbar_heading").textContent = "Inbox";
}

pageLoad();
