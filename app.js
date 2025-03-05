import { DOM, Helper } from "./helper.js";
import { TodoModel } from "./src/TodoModel.js";
import { TodoView } from "./src/TodoView.js";
import { TodoController } from "./src/TodoController.js";

function drawForm() {
    const html =
        /*html*/
        `
        <div class="card">
            <div class="card-header">
                <h3>Create Todo</h3>
            </div>
            <div class="card-body">
                <form action="">
                    <div class="input-group mb-3">
                        <input
                            class="form-control"
                            placeholder="Todo"
                            type="text"
                            name=""
                            id="input-todo"
                        />
                        <button
                            class="btn btn-primary"
                            id="create-todo"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    const container = DOM.createElement({ tag: "div" });
    container.innerHTML = html;
    const btn = container.querySelector("#create-todo");
    const input = container.querySelector("#input-todo");
    return [container, input, btn];
}

function drawTodo(todo) {
    const html =
        /*html*/
        `
    <div><span><input class="cb-todo-done form-check-input" type="checkbox" ${
        todo.done ? "checked" : ""
    } /></span>${todo.done ? "<s>" : ""}${todo.text}${
            todo.done ? "</s>" : ""
        } <span><button class="btn btn-danger btn-sm delete-button">Delete</button></span></div>   
    `;
    return html;
}

const todoModel = new TodoModel();

function showTodos(container) {
    DOM.clearChildren(container);
    todoModel.todos.forEach((todo) => {
        const li = DOM.createElement({ tag: "li" });
        li.innerHTML = drawTodo(todo);
        const deleteButton = li.querySelector(".delete-button");
        const cb = li.querySelector(".cb-todo-done");
        deleteButton.addEventListener("click", (e) => {
            console.log("DELETE CLICKED", todo.id);
            todoModel.removeTodo(todo.id);
        });

        cb.addEventListener("change", (e) => {
            todoModel.toggleTodo(todo.id);
        });
        container.append(li);
    });
}

const app = DOM.getElement("#app");
const todoList = DOM.createElement({ tag: "ul", id: "display-todos" });

const [todoForm, todoInput, todoCreateButton] = drawForm();
console.log(todoForm);

app.append(todoForm);
let todoText = "";
todoInput.addEventListener("input", (e) => {
    console.log(e.target.value);
    todoText = e.target.value;
});

todoCreateButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (todoInput.value !== "") {
        todoModel.addTodo({
            id: Helper.uniqueId(),
            text: todoText,
            done: false,
        });
    }

    todoInput.value = "";
});

showTodos(todoList);
app.append(todoList);

todoModel.onUpdated = () => {
    console.log("onUpdated");
    showTodos(todoList);
};

const todoView = new TodoView();
console.log(Helper.uniqueId());
