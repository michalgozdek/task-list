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
        ${task.content}
        </li>
        `;
    }
    document.querySelector(".js-task").innerHTML = htmlString;
  };

  const init = () => {
    render();
  };
  init();
}
fu;
