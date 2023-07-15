import { projectArray, removeTasksFromScreen } from "./project";
import empty_star from "./emptyStar.png";
import FullStar from "./fullStar.png";
import Pencil from "./pencil.png";

import { addInactiveClass, removeInactiveClass } from "./tasks.js";

import Trash from "./trash.png";

export function selectToday() {
  const today_btn = document.querySelector(".today");
  today_btn.addEventListener("click", () => {
    document.querySelector(".mainbar_heading").textContent = "Today";
    document.querySelector(".mainbar_btn").classList.remove("active");
    removeTasksFromScreen();

    let initial_todayArray = JSON.parse(JSON.stringify(projectArray));
    const currentDate = new Date().toISOString().split("T")[0];

    let todayArray = createTodayArray(initial_todayArray);

    for (let i = 0; i < todayArray.length; i++) {
      for (let j = 0; j < todayArray[i].taskArray.length; j++) {
        createTaskDOMTodayLoop(currentDate, todayArray, i, j);
      }
    }
  });
}

function createTodayArray(initial_todayArray) {
  const currentDate = new Date().toISOString().split("T")[0];
  for (let i = 0; i < initial_todayArray.length; i++) {
    for (let j = 0; j < initial_todayArray[i].taskArray.length; j++) {
      if (initial_todayArray[i].taskArray[j].dueDate !== currentDate) {
        delete initial_todayArray[i].taskArray[j];
      }
    }
  }

  let todayArray = initial_todayArray.map((project) => {
    const filteredValues = project.taskArray.filter(
      (value) => value !== undefined
    );
    return { ...project, taskArray: filteredValues };
  });

  for (let i = 0; i < todayArray.length; i++) {
    if (
      todayArray[i].taskArray === undefined ||
      todayArray[i].taskArray.length === 0
    ) {
      todayArray.splice(i, 1);
    }
  }

  return todayArray;
}

export function createTaskDOMTodayLoop(targetDate, todayArray, i, j) {
  const task_box = document.createElement("div");
  todayArray[i].taskArray[j].myElement = task_box;

  const title = document.createElement("div");
  title.textContent = `${todayArray[i].taskArray[j].title}`;

  task_box.appendChild(title);

  const button_container = document.createElement("div");
  button_container.classList.add("task_button_container");
  const details = document.createElement("div");
  const pencil = new Image();
  pencil.src = Pencil;
  pencil.classList.add("pencil");
  details.appendChild(pencil);

  const date_btn = document.createElement("div");
  date_btn.classList.add("task_date");
  date_btn.textContent = `${todayArray[i].taskArray[j].dueDate}`;

  const trash = new Image();
  trash.src = Trash;

  const star = document.createElement("div");
  star.classList.add("star");

  const emptyStar = new Image();
  emptyStar.src = empty_star;
  emptyStar.classList.add("empty_star");

  const fullStar = new Image();
  fullStar.src = FullStar;
  fullStar.classList.add("full_star");

  if (todayArray[i].taskArray[j].priority === true) {
    star.appendChild(fullStar);
  } else {
    star.appendChild(emptyStar);
  }

  star.addEventListener("click", () => {
    const index = todayArray[i].taskArray.findIndex(
      (newTask) => newTask.myElement === task_box
    );
    const changedObject = todayArray[i].taskArray[index];

    if (todayArray[i].taskArray[index].priority === true) {
      star.removeChild(fullStar);
      star.appendChild(emptyStar);
      todayArray[i].taskArray[index].priority = false;

      for (let i = 0; i < projectArray.length; i++) {
        for (let j = 0; j < projectArray[i].taskArray.length; j++) {
          if (
            changedObject.id_value === projectArray[i].taskArray[j].id_value
          ) {
            projectArray[i].taskArray[j].priority = false;
          }
        }
      }
    } else {
      star.removeChild(emptyStar);
      star.appendChild(fullStar);
      todayArray[i].taskArray[index].priority = true;

      for (let i = 0; i < projectArray.length; i++) {
        for (let j = 0; j < projectArray[i].taskArray.length; j++) {
          if (
            changedObject.id_value === projectArray[i].taskArray[j].id_value
          ) {
            projectArray[i].taskArray[j].priority = true;
          }
        }
      }
    }
  });

  button_container.appendChild(star);
  button_container.appendChild(date_btn);
  button_container.appendChild(details);
  button_container.appendChild(trash);
  task_box.appendChild(button_container);

  document.querySelector(".mainbar_tasks").appendChild(task_box);

  details.classList.add("task_details");
  task_box.classList.add("task_box");
  title.classList.add("task_title");
  trash.classList.add("task_remove");

  revealDetailsBoxTodayLoop(
    targetDate,
    todayArray,
    i,
    j,
    details,
    task_box,
    title,
    date_btn,
    trash,
    star
  );

  // function assignObjToDOMToday() {
  //     projectArray[i].taskArray[j].myElement = task_box;

  function removeTaskButtonLoopToday() {
    trash.addEventListener("click", () => {
      const index = todayArray[i].taskArray.findIndex(
        (newTask) => newTask.myElement === task_box
      );

      if (index !== -1) {
        const removedObject = todayArray[i].taskArray.splice(index, 1)[0];

        for (let i = 0; i < projectArray.length; i++) {
          for (let j = 0; j < projectArray[i].taskArray.length; j++) {
            if (
              removedObject.id_value === projectArray[i].taskArray[j].id_value
            ) {
              projectArray[i].taskArray.splice(j, 1);
            }
          }
        }

        removedObject.myElement.remove();
      }

      // if (todayArray[i].taskArray.splice(j, 1)[0] === undefined) {
      //     const last = todayArray.pop();
      //     last.myElement.remove();
      // }
      //     else if (todayArray[i].taskArray.splice(j, 1)[0] === undefined) {
      //         const removedObject = todayArray[i].taskArray.splice(j, 1)[0];
      //         removedObject.myElement.remove();
      //         console.log(todayArray);
      //     }
    });
  }
  removeTaskButtonLoopToday(task_box, i, j);
  // }

  // assignObjToDOMToday(task_box);
}

function revealDetailsBoxTodayLoop(
  targetDate,
  todayArray,
  i,
  j,
  variable,
  box,
  title,
  date_btn,
  trash,
  star
) {
  const btn = variable;
  btn.addEventListener("click", () => {
    if (!document.querySelector(".details_task_box")) {
      createDetailsDOMTodayLoop(
        targetDate,
        todayArray,
        i,
        j,
        box,
        title,
        date_btn,
        trash,
        star
      );
      populateDetailsBoxTodayLoop(todayArray, i, j, box);

      addInactiveClass(trash, star);
    }
  });
}

function populateDetailsBoxTodayLoop(todayArray, i, j, task_box) {
  // let currentArrayIndex = currentProjectIndex.taskArray.length - 1;
  const index = todayArray[i].taskArray.findIndex(
    (task) => task.myElement === task_box
  );
  if (index !== -1) {
    document.querySelector(
      "#details_title"
    ).value = `${todayArray[i].taskArray[index].title}`;
    document.querySelector(
      "#details_description"
    ).value = `${todayArray[i].taskArray[index].description}`;
    document.querySelector(
      "#details_due_date"
    ).value = `${todayArray[i].taskArray[index].dueDate}`;
  }
}

function removeDetailsBoxTodayLoop(box, trash, star) {
  const btn = document.querySelector(".details_close_button");
  btn.addEventListener("click", () => {
    box.remove();

    removeInactiveClass(trash, star);
  });
}

function updateTaskBoxTodayLoop(todayArray, i, index, title) {
  title.textContent = `${todayArray[i].taskArray[index].title}`;
}

function createDetailsDOMTodayLoop(
  targetDate,
  todayArray,
  i,
  j,
  afterChildDiv,
  title,
  date_btn,
  trash,
  star
) {
  if (!document.querySelector(".details_task_box")) {
    const details_task_box = document.createElement("div");

    const close_btn = document.createElement("div");
    const left_container = document.createElement("div");
    const details_duedate = document.createElement("div");
    const details_title = document.createElement("div");
    const container = document.createElement("div");
    const submit = document.createElement("div");
    const details_description = document.createElement("div");

    container.appendChild(left_container);
    container.appendChild(details_description);

    left_container.appendChild(details_title);
    left_container.appendChild(details_duedate);

    close_btn.innerHTML = `<button class="details_close_button">&times;</button>`;
    details_title.innerHTML = `<label for="details_title">Title</label>
        <input type="text" id="details_title" name="task_title">`;
    details_duedate.innerHTML = `<label for="details_due_date">Due Date</label>
        <input type="date" id="details_due_date" name="task_due_date">`;

    details_description.innerHTML = `<label for="details_description">Description</label>
        <input type="text" id="details_description" name="task_description">`;
    submit.innerHTML = `<div class="parent_task_submit">
        <button class="details_task_submit">Submit</button></div>`;

    left_container.classList.add("details_left_container");
    details_task_box.classList.add("details_task_box");
    details_title.classList.add("details_title");
    details_duedate.classList.add("details_duedate");
    details_description.classList.add("details_description");
    container.classList.add("details_container");
    close_btn.classList.add("details_close_button");

    details_task_box.appendChild(close_btn);
    details_task_box.appendChild(container);
    details_task_box.appendChild(submit);

    const parentDiv = document.querySelector(".mainbar_tasks");
    parentDiv.insertBefore(details_task_box, afterChildDiv.nextSibling);

    removeDetailsBoxTodayLoop(details_task_box, trash, star);
    submitDetailsBoxTodayLoop(
      targetDate,
      todayArray,
      i,
      j,
      afterChildDiv,
      details_task_box,
      title,
      date_btn,
      trash,
      star
    );
  }
}

function submitDetailsBoxTodayLoop(
  targetDate,
  todayArray,
  i,
  j,
  task_box,
  details_box,
  title,
  date_btn,
  trash,
  star
) {
  const details_btn = document.querySelector(".details_task_submit");

  details_btn.addEventListener("click", () => {
    const index = todayArray[i].taskArray.findIndex(
      (task) => task.myElement === task_box
    );
    if (index !== -1) {
      todayArray[i].taskArray[index].title =
        document.querySelector("#details_title").value;
      todayArray[i].taskArray[index].description = document.querySelector(
        "#details_description"
      ).value;
      todayArray[i].taskArray[index].dueDate =
        document.querySelector("#details_due_date").value;
    }

    updateTaskBoxTodayLoop(todayArray, i, index, title);
    updateProjectArrayDetails(todayArray, i, index);

    date_btn.textContent = `${todayArray[i].taskArray[index].dueDate}`;

    if (todayArray[i].taskArray[index].dueDate !== targetDate) {
      todayArray[i].taskArray.splice(index, 1);
    }

    details_box.remove();
    removeTasksFromScreen();
    removeInactiveClass(trash, star);

    for (let i = 0; i < todayArray.length; i++) {
      for (let j = 0; j < todayArray[i].taskArray.length; j++) {
        createTaskDOMTodayLoop(targetDate, todayArray, i, j);
      }
    }
  });
}

function updateProjectArrayDetails(todayArray, i, index) {
  for (let k = 0; k < projectArray.length; k++) {
    for (let l = 0; l < projectArray[k].taskArray.length; l++) {
      // console.log(projectArray[k].taskArray[l]);
      // console.log(todayArray[i].taskArray[j]);

      // console.log(projectArray[k].taskArray[l].id_value);
      // console.log(todayArray[i].taskArray[j].id_value);

      if (
        projectArray[k].taskArray[l].id_value ===
        todayArray[i].taskArray[index].id_value
      ) {
        projectArray[k].taskArray[l] = todayArray[i].taskArray[index];
      }
    }
  }
}
