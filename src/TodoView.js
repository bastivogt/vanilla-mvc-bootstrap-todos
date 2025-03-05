import { DOM } from "./../helper.js";

export class TodoView {
    constructor(container) {
        this.container = container;
        this.root;
        this.todoTempText = null;
        // event callbacks
        this.onCreate = () => {};
        this.onToggle = () => {};
        this.onDelete = () => {};
        this.onEdit = () => {};
        console.log("TodoView");
        //Partials.drawCreateForm();
    }

    drawCreateForm() {
        this.root = DOM.createElement({ tag: "div", className: "todos-root" });
        const form = Partials.drawCreateForm();
        this.root.innerHTML = form;
        this.container.append(this.root);

        const inputTodo = this.root.querySelector(".input-todo");
        const buttonCreateTodo = this.root.querySelector(".create-todo");
        const todoFormTitle = this.root.querySelector(".todo-form-title");

        todoFormTitle.textContent = "Create Todo";
        buttonCreateTodo.textContent = "Create Todo";

        // inputTodo.addEventListener("input", (e) => {
        //     console.log(e.target.value);
        // });

        buttonCreateTodo.addEventListener("click", (e) => {
            e.preventDefault();
            if (inputTodo.value !== "") {
                this.onCreate({ todoText: inputTodo.value });
                inputTodo.value = "";
            }
        });
    }

    drawTodos(todos) {
        console.log("drawTodos");
        console.log("todos", todos);

        const todosContainer = DOM.createElement({
            tag: "div",
            className: "todos-container",
        });
        todosContainer.classList.add("mt-5");
        DOM.clearChildren(todosContainer);

        if (todos.length === 0) {
            const noTodos = DOM.createElement({ tag: "p" });
            noTodos.textContent = "No Todos avaiable.";
            todosContainer.append(noTodos);
        } else {
            todos.forEach((todo) => {
                const todoItem = DOM.createElement({
                    tag: "div",
                    className: "todo-item",
                });

                todoItem.innerHTML = Partials.drawTodoItem(todo);

                const todoDeleteButton = todoItem.querySelector(
                    ".todo-delete-button"
                );
                const todoDoneCB = todoItem.querySelector(".todo-done-cb");
                const todoEditable = todoItem.querySelector(".todo-editable");

                todoDeleteButton.addEventListener("click", (e) => {
                    this.onDelete({ todo });
                });

                todoDoneCB.addEventListener("change", (e) => {
                    this.onToggle({ todo });
                });

                todoEditable.addEventListener("input", (e) => {
                    //this.todoTempText = e.target.innerHTML;
                    this.todoTempText = e.target.textContent;
                });

                todoEditable.addEventListener("focusout", (e) => {
                    if (this.todoTempText) {
                        console.log(this.todoTempText);
                        this.onEdit({ todo, newText: this.todoTempText });
                    }
                    this.todoTempText = null;
                });

                todosContainer.append(todoItem);
            });
        }
        this.root.append(todosContainer);
    }
}

class Partials {
    static drawCreateForm() {
        const html =
            /*html*/
            `
                <div class="card">
                    <div class="card-header">
                        <h3 class="todo-form-title">Create Todo</h3>
                    </div>
                    <div class="card-body">
                        <form action="">
                            <div class="input-group mb-3">
                                <input
                                    class="form-control input-todo"
                                    placeholder="Todo"
                                    type="text"
                                    name=""
                                />
                                <button
                                    class="btn btn-primary create-todo"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            `;

        return html;
    }

    static drawTodoItem(todo) {
        const html =
            /*html*/
            `

            <div class="card mb-3">
                <div class="card-header">
                    <input type="checkbox" class="form-check-input todo-done-cb" ${
                        todo.done ? "checked" : ""
                    } /> <span>Done</span>
                </div>
                <div class="card-body"><div contenteditable class="todo-editable">${
                    todo.done ? "<s>" : ""
                }${todo.text}${todo.done ? "</s>" : ""}</div></div>
                <div class="card-footer">
                    <button class="btn btn-danger btn-sm todo-delete-button">Delete</button>
                </div>
            </div>
        `;

        return html;
    }
}
