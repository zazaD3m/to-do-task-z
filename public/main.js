const addTaskButton = document.querySelector(".addTask");
const deleteButton = document.querySelectorAll(".delete");

addTaskButton.addEventListener("click", addTask);
deleteButton.forEach((btn) => btn.addEventListener("click", deleteTask));

async function addTask() {
    const title = document
        .querySelector(".titleForm")
        .querySelector("input").value;
    const content = document
        .querySelector(".contentForm")
        .querySelector("input").value;
    try {
        const response = await fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                content: content,
            }),
        });
        location.reload();
    } catch (error) {
        console.error(error);
    }
}

async function deleteTask(e) {
    const id = e.target.id;
    const data = JSON.stringify({ _id: id });
    try {
        const response = await fetch(`/api`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });
        const json = await response.json();
        location.reload();
    } catch (error) {
        console.error(error);
    }
}
