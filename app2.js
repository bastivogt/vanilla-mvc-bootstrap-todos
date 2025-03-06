import { TodoModel } from "./src/TodoModel.js";
import { TodoView } from "./src/TodoView.js";
import { TodoController } from "./src/TodoController.js";
import { DOM } from "./helper.js";

import { Route } from "./src/routes/Route.js";
import { RoutesManager } from "./src/routes/RoutesManager.js";
import { HashRouter } from "./src/routes/HashRouter.js";

const app = DOM.getElement("#app");

const todoController = new TodoController(new TodoModel(), new TodoView(app));

const routesManager = RoutesManager.getInstance();
routesManager.addRoute(
    new Route({
        pattern: "/",
        handler: (route) => {
            todoController.index(route);
        },
    })
);
routesManager.addRoute(
    new Route({
        pattern: "/createdby",
        handler: (route) => {
            todoController.createdBy(route);
        },
    })
);

HashRouter.onInit = HashRouter.onHashChange = (hash) => {
    console.log("hashrouter change init");
    const inputPattern = hash.substring(1);
    console.log(inputPattern);
    if (hash === "" || hash === "#") {
        HashRouter.write("#/");
    }

    const route = routesManager.getRoute(inputPattern);
    if (route) {
        console.log(route);
        route.route.handler(route);
    } else {
        console.log("404");
    }
};

HashRouter.init();
