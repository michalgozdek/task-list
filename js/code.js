{
  let tasks = [];
  let hideDoneTasks = false;

  const toggleTaskDone = (tasksIndex) => {
    tasks = [
      ...tasks.slice(0, tasksIndex),
      { ...tasks[tasksIndex], done: !tasks[tasksIndex].done },
      ...tasks.slice(tasksIndex + 1),
    ];
    render();
  };
  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];

    render();
  };
  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const markAllTasksDone = () => {
    task = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render;
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

    toggleDoneButtons.forEach((toggleDoneButtons, index) => {
      toggleDoneButtons.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li 
      class="tasks__item js-tasks">
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
  };

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
      <button class="buttons__button js-markAllTasksDone"
      ${tasks.every(({ done }) => done) ? "disabled" : ""}
      >
      Ukończ wszystkie
      </button>
    `;
  };

  const bindButtonsEvents = () => {};

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
}
