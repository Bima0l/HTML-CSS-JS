document.addEventListener("DOMContentLoaded", function () {
    var taskInput = document.getElementById("taskInput");
    var addTaskBtn = document.getElementById("addTaskBtn"); // Corrigido para 'addTaskBtn'
    var taskList = document.getElementById("taskList");

    addTaskBtn.addEventListener("click", function() {
        addTask();
    });

    function addTask() {
        var taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Por favor, insira uma tarefa válida.");
            return;
        }

        var li = document.createElement("li");
        li.textContent = taskText;

        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Excluir";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() {
            li.remove();
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        taskInput.value = "";  // Limpa o campo de entrada
    }
});
