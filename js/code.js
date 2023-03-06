{
  let tasks = [];
  let hideDoneTasks = false;

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { 
        ...tasks[taskIndex], done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };
  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
       ...tasks.slice(taskIndex + 1),
      ];
    render();
  };
  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const toggleHidenDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const removeEvent = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButtons, taskIndex) => {
      removeButtons.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const bindToggleDoneButtons = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButtons, taskIndex) => {
      toggleDoneButtons.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const renderTasks = () => {  
    let htmlString = "";
    for ( const task of tasks) {
      htmlString += `
    // const taskList = document.querySelector(".js-tasks");
    // const taskToHTML = task => `
      <li class="tasks__item${task.done && hideDoneTasks ? "tasks__item-hiden" : ""
       js-tasks">
      <button class="tasks__buttonDone js-done">
      ${task.done ? "✓" : ""}
      </button>
      <span class=" ${task.done ? "tasks__contentDone" : ""}">
      ${task.content}
      </span>
      <button class=" tasks__button-remove js-remove">
      🗑
      </button>
      </li>
      `;
  }
    document.querySelector(".js-task").innerHTML = htmlString;
    //  taskList.innerHTML = tasks.map(taskToHTML).join("");
  };

  document.querySelector(".js-task").innerHTML = htmlString;

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }

    buttonsElement.innerHTML = `
      <button  class="buttons__button js-toggleHideDoneTasks">
      ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukonczone
      </button>
      <button class="buttons__button js-markAllDone"
      ${tasks.every(({ done }) => done) ? "disabled" : ""}
      >
      Ukończ wszystkie
      </button>
    `;
  };

  const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDone");

    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllTasksDone);
    }
    const toggleHideDoneTasksButton = document.querySelector(
      "js-toggleHideDoneButton"
    );

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHidenDoneTasks);
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindButtonsEvents();
    removeEvent();
    bindToggleDoneButtons();
  };

  const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const newTaskElement = document.querySelector(".js-newTask");
      const newTaskContent = newTaskElement.value.trim();

      if (newTaskContent !== "") {
        addNewTask(newTaskContent);
        newTaskElement.value = "";
      }
      newTaskElement.focus();
    });
  };

  init();
};
