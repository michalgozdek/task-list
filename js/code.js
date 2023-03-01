{
  const tasks = [];

  const toggleTaskDone = (tasksIndex) => {
    tasks[tasksIndex].done = !tasks[tasksIndex].done;
    render();
  };
  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
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

  const render = () => {
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
      const addNewTask = (newTaskContent) => {
        tasks.push({
          content: newTaskContent,
        });
        render();
      };

      if (newTaskContent !== "") {
        addNewTask(newTaskContent);
        newTaskElement.value = "";
      }
      newTaskElement.focus();
    });
  };

  init();
}
