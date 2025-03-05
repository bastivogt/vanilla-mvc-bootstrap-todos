export class RoutesManager {
    static _instance = null;
    static getInstance() {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }
    constructor() {
        this._routes = [];
    }

    hasRoute(pattern) {
        for (const item of this._routes) {
            if (item.pattern === pattern) {
                return true;
            }
        }
        return false;
    }

    addRoute(route) {
        if (!this.hasRoute(route.pattern)) {
            this._routes.push(route);
            return true;
        }
        return false;
    }

    getMatchTokens() {
        return this._routes.map((route) => {
            return route.pattern.replace(/\/:.*/g, "");
        });
    }

    getRoute(pattern) {
        const matchTokens = this.getMatchTokens();
        const index = matchTokens.findIndex((item) => {
            console.log(item);
            if (
                item === "/" &&
                pattern.startsWith(item) &&
                pattern.length < 2
            ) {
                return true;
            }
            return pattern.startsWith(item) && item !== "/";
        });
        if (index === -1) return false;
        console.log("mt, p", matchTokens[index], pattern);
        if (matchTokens[index].length > pattern.length) return false;

        const routePatternSplitted = this._routes[index].pattern.split("/");
        const matchTokenSplitted = matchTokens[index].split("/");
        const patternSplitted = pattern.split("/");
        const paramsPattern = routePatternSplitted.slice(
            matchTokenSplitted.length,
            routePatternSplitted.length
        );
        const params = patternSplitted.slice(
            matchTokenSplitted.length,
            routePatternSplitted.length
        );
        const paramsObj = {};
        for (const prop in paramsPattern) {
            paramsObj[paramsPattern[prop].slice(1)] = params[prop];
        }

        return {
            route: this._routes[index],
            matchToken: matchTokens[index],
            params: paramsObj,
        };
    }

    get routes() {
        return this._routes;
    }
}
