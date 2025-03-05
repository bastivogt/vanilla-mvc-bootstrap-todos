export class Route {
    constructor({ pattern = null, handler = null }) {
        this.pattern = pattern;
        this.handler = handler;
    }
}
