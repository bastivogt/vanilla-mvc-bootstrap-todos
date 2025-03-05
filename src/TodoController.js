import { Helper, DOM } from "../helper.js";
export class TodoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.sortTodosByDone();

        console.log("TodoController");
    }

    // action index
    index() {
        console.log("TodoController#index");
        this.view.drawCreateForm();
        this.view.drawTodos(this.model.todos);

        this.model.onUpdated = (todos) => {
            this.model.sortTodosByDone();
            console.log("onUpdated todos: ", todos);
            DOM.clearChildren(this.view.root);
            this.view.drawCreateForm();
            this.view.drawTodos(this.model.todos);
        };

        this.view.onCreate = (e) => {
            console.log("onCreate", e);
            this.model.addTodo({
                id: Helper.uniqueId(),
                text: e.todoText,
                done: false,
            });
        };

        this.view.onDelete = (e) => {
            this.model.removeTodo(e.todo.id);
            console.log("onDelete: ", e);
        };

        this.view.onToggle = (e) => {
            console.log("onToggle", e);
            this.model.toggleTodo(e.todo.id);
        };

        this.view.onEdit = (e) => {
            console.log("onEdit");
            this.model.updateTodo(e.todo.id, e.newText);
        };
    }
}
