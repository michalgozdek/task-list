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

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li>
        <button class="js-remove">usuń</button>
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
  };

  const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const newTaskContent = document.querySelector(".js-newTask").value.trim();

      if (newTaskContent === "") {
        return;
      }

      tasks.push({
        content: newTaskContent,
      });
      render();
    });
  };
  init();
}
