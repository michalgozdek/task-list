{
  const tasks = [];

  const toggleTaskDone = (tasksIndex) => {
    tasks[tasksIndex].done = !tasks[tasksIndex].done;
    render();
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li 
        class="tasks__item js-tasks">
        <button class="tasks__button tasks__buttonDone js-done">

        ${task.done ? "✓" : ""}
        </button>
        <span class="tasks__content${task.done ? "tasks__contentDone" : ""}">
        ${task.content}
        </span>
        <button class"tasks__button tasks__button-remove js-remove">
        🗑
        </button>
        </li>
        `;
    }
    document.querySelector(".js-task").innerHTML = htmlString;

    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButtons, index) => {
      removeButtons.addEventListener("click", () => {
        tasks.splice(index, 1);
        render();
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButtons, index) => {
      toggleDoneButtons.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
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
