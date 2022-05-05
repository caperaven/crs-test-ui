export class Dialog extends crsbinding.classes.BindableElement {
    get html() {
        return import.meta.url.replace(".js", ".html");
    }

    async connectedCallback() {
        super.connectedCallback();

        await this.setWidget("new");
    }

    async close() {
        crs.call("dialog", "close", {})
    }

    async setWidget(name) {
        crs.call("dom", "set_widget", {
            "query"   : "#dialog-widget",
            "context" : "$context._dataId",
            "html"    : "$template.dialog",
            "url"     : `/app/welcome/dialog/templates/${name}.html`
        }, this);
    }

    async filterChanged(newValue) {
        crs.call("dom", "filter_children", {
            element: "#lstOptions",
            filter: newValue
        })
    }

    async filter(event) {
        const value = event.target.value;
        await this.filterChanged(value);
    }
}

customElements.define("edit-dialog", Dialog)

export class DialogSystem {
    static async perform(step, context, process, item) {
        await this[step.action](step, context, process, item);
    }

    static async show(step, context, process, item) {
        crs.call("dom", "create_element", {
            parent: document.body,
            tag_name: "edit-dialog",
            id: "edit-dialog"
        })
    }

    static async close(step, context, process, item) {
        crs.call("dom", "remove_element", {
            element: "#edit-dialog"
        })
    }
}

crs.intent.dialog = DialogSystem;