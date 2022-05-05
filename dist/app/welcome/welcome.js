import "./dialog/dialog.js"
import "./test-steps/test-steps.js"

export default class Welcome extends crsbinding.classes.ViewBase {
    async connectedCallback() {
        await super.connectedCallback();

        requestAnimationFrame(() => {
            this.loadTools("#tpl-load");
        })
    }

    loadTools(name) {
        const template = this.element.querySelector(name);
        const html = template.innerHTML;

        crsbinding.events.emitter.postMessage("#tools-widget", {
            context: this,
            html: html
        })
    }

    openFolder() {
        console.log("open folder")
    }

    openFile() {
        console.log("open file")
    }

    new() {
        console.log("new")
    }

}