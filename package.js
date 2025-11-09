function getHtmlElement(element, scope = document) {
    /**
     * Returns the Html element of the given parameter, weither it is the direct element, an Id or a class.
     */
    let elementSearchResult;
    if (element instanceof HTMLElement) return element;
    else {
        const base = scope.content || scope;
        elementSearchResult =
            base.querySelector(`#${element}`) ||
            base.querySelector(`.${element}`) ||
            base.querySelector(element);
        if (elementSearchResult && elementSearchResult instanceof HTMLElement) return elementSearchResult;
    }
    console.error("The given element could not be found in the HTML file.");
    return null;
}

class TemplateElement {
    constructor(template, element) {
        this.template = template;
        this.element = element;
    }

    setInnerHtml(content) {
        this.element.innerHTML = content;
        void this.save();
        return this.template;
    }

    setValue(value) {
        this.element.value = value;
        void this.save();
        return this.template;
    }

    setPlaceholder(placeholder) {
        this.element.placeholder = placeholder;
        void this.save();
        return this.template;
    }

    setHref(link) {
        this.element.href = link;
        void this.save();
        return this.template;
    }

    setTarget(target){
        this.element.target = target;
        void this.save();
        return this.template;
    }

    setSrc(imgSrc) {
        this.element.src = imgSrc;
        void this.save();
        return this.template;
    }

    

    save() {
        const parentClone = this.template.clone;
        const elementQuerySelector = this.element.id || this.element.className;
        const target = getHtmlElement(elementQuerySelector, parentClone);
        if (target) target.replaceWith(this.element);
    }
}


class Template {
    /**
     * The given template can be an HTMLTemplateElement or the ID/class of the template.
     */
    constructor(template) {
        if (template instanceof HTMLTemplateElement) this.template = template;
        else {
            this.template = getHtmlElement(template);
        }
        this.clone = this.template.content.cloneNode(true);
    }

    getElement(el) {
        const element = getHtmlElement(el, this.template);
        return new TemplateElement(this, element);
    }

    addInHtml(destination) {
        const dest = getHtmlElement(destination);
        dest.appendChild(this.clone);
    }
}

window.Template = Template;
window.TemplateElement = TemplateElement;