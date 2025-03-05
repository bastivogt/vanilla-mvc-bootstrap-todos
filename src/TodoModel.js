export class TodoModel {
    constructor() {
        this._todos = [
            { id: "1", text: "First Todo", done: true },
            { id: "2", text: "Second Todo", done: false },
            { id: "3", text: "Third Todo", done: false },
        ];
        this.onUpdated = () => {};
    }

    addTodo(todo) {
        this._todos.unshift(todo);
        this.onUpdated(this._todos);
    }

    removeTodo(id) {
        this._todos = this._todos.filter((todo) => todo.id !== id);
        this.onUpdated(this._todos);
    }

    toggleTodo(id) {
        this._todos = this._todos.map((todo) => {
            if (todo.id === id) {
                return { id: todo.id, text: todo.text, done: !todo.done };
            }
            return todo;
        });
        this.onUpdated(this._todos);
    }

    updateTodo(id, text) {
        this._todos = this._todos.map((todo) => {
            if (todo.id === id) {
                return { id: todo.id, text: text, done: todo.done };
            }
            return todo;
        });
        this.onUpdated(this._todos);
    }

    sortTodosByDone() {
        console.log("sort");
        this._todos.sort((a, b) => {
            const doneA = a.done;
            const doneB = b.done;
            if (doneA < doneB) {
                return -1;
            }
            if (doneA > doneB) {
                return 1;
            }
            return 0;
        });
    }

    get todos() {
        return this._todos;
    }
}
