function getHtmlElement(element, scope = document) {
    /**
     * Returns the Html element of the given parameter, weither it is the direct element, an Id or a class.
     */
    let elementSearchResult;
    if (element instanceof HTMLElement) return element;
    else {
        const base = scope.content || scope;
        elementSearchResult =
            base.querySelector(element) ||
            base.querySelector(`#${element}`) ||
            base.querySelector(`.${element}`);
        if (elementSearchResult && elementSearchResult instanceof HTMLElement) return elementSearchResult;
    }
    console.error("The given element could not be found in the HTML file.");
    return null;
}

function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export class EventManager {
    constructor(element) {
        this.templateElement = element;
        const possibleEventsArray = [
            "click",
            "dblclick",
            "mouseenter",
            "mouseleave",
            "mouseover",
            "mouseout",
            "keydown",
            "keyup",
            "keypress",
            "input",
            "change",
            "focus",
            "load",
            "DOMContentLoaded"
        ];
        possibleEventsArray.forEach((event) => {
            this["on" + capitalize(event)] = (onEventTrigger) => {
                this.templateElement.eventsCache[event] = onEventTrigger;
                return this.templateElement.template;
            }
        })
    }

    addEventListener(event, onEventTrigger) {
        /**
         * onEventTrigger has to be a reachable function.
         */
        this.element.eventsCache[event] = onEventTrigger;
    }

     get apply(){
            return this.template;
        }
}

export class TemplateElement {
    constructor(template, element) {
        this.template = template;
        this.element = element;
        this.eventsCache = {};
    }

    setInnerHtml(content) {
        this.element.innerHTML = content;
        void this.#apply();
        return this;
    }

    setValue(value) {
        this.element.value = value;
        void this.#apply();
        return this;
    }

    setPlaceholder(placeholder) {
        this.element.placeholder = placeholder;
        void this.#apply();
        return this;
    }

    setHref(link) {
        this.element.href = link;
        void this.#apply();
        return this;
    }

    setTarget(target) {
        this.element.target = target;
        void this.#apply();
        return this;
    }

    setSrc(imgSrc) {
        this.element.src = imgSrc;
        void this.#apply();
        return this;
    }

    get apply(){
        return this.template;
    }

    get events() {
        return new EventManager(this);
    }

    loadEvent() {
        Object.keys(this.eventsCache).forEach(event => {
            this.element.addEventListener(event, this.eventsCache[event]);
        });

    }

    #apply() {
        const parentClone = this.template.clone;
        const elementQuerySelector = this.element.id || this.element.className;
        const target = getHtmlElement(elementQuerySelector, parentClone);
        if (target) target.replaceWith(this.element);
    }
}


export class Template {
    /**
     * The given template can be an HTMLTemplateElement or the ID/class of the template.
     */
    constructor(template) {
        if (template instanceof HTMLTemplateElement) this.template = template;
        else {
            this.template = getHtmlElement(template);
        }
        this.clone = this.template.content.cloneNode(true);
        this.templateElementsCache = [];
    }

    getElement(el) {
        const element = getHtmlElement(el, this.template);
        const TE = new TemplateElement(this, element);
        this.templateElementsCache.push(TE);
        return TE;
    }

    addInHtml(destination) {
        const dest = getHtmlElement(destination);
        dest.appendChild(this.clone);

        this.templateElementsCache.forEach((te) => {
            const elementInDest = getHtmlElement(te.element.id || `.${te.element.className}`, dest);
            te.element = elementInDest;
            te.loadEvent();
        });
    }
}
