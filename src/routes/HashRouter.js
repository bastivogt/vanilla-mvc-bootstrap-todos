export class HashRouter2 {
    static _instance = null;

    static getInstance() {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }
    constructor() {
        this.onHashChange = () => {};
        this.onInit = () => {};
    }

    init() {
        this.onInit(window.location.hash);
        window.addEventListener("hashchange", (e) => {
            const hash = e.target.location.hash;
            this.onHashChange(hash);
        });
    }

    read() {
        const hash = window.location.hash;
        return hash;
    }

    write(str) {
        window.location.hash = str;
    }
}

export class HashRouter {
    static onHashChange = () => {};
    static onInit = () => {};

    static init() {
        this.onInit(window.location.hash);
        window.addEventListener("hashchange", (e) => {
            const hash = e.target.location.hash;
            this.onHashChange(hash);
        });
    }
    static read() {
        const hash = window.location.hash;
        return hash;
    }

    static write(str) {
        window.location.hash = str;
    }
}
