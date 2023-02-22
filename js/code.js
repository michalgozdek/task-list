{
  const tasks = [
    {
      content: "zrób prace domową",
      done: false,
    },
    {
      content: "obejrzyj następny dział",
      done: true,
    },
  ];

  const toggleTaskDone = (tasksIndex) => {
    tasks[tasksIndex].done = !tasks[tasksIndex].done;
    render();
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li 
        ${task.done ? ' class="js-done"' : ""}
        >
        <button class="js-buttonDone">zrobione</button>
        <button class="js-remove">usuń</button
        >
        ${task.content}
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

    const toggleDoneButtons = document.querySelectorAll(".js-buttonDone");

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
