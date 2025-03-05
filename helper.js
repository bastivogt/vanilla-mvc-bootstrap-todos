export class DOM {
    static getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }

    static createElement({ tag, className, id }) {
        const element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }
        if (id) element.id = id;

        return element;
    }

    static clearChildren(parentElement) {
        parentElement.textContent = "";
    }
}

export class Helper {
    static uniqueId() {
        const dateString = Date.now().toString(36);
        const randomness = Math.random().toString(36).substr(2);
        return dateString + randomness;
    }
}
