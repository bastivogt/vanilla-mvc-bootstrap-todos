import { TodoModel } from "./src/TodoModel.js";
import { TodoView } from "./src/TodoView.js";
import { TodoController } from "./src/TodoController.js";
import { DOM } from "./helper.js";

const app = DOM.getElement("#app");

const todoController = new TodoController(new TodoModel(), new TodoView(app));
todoController.index();
