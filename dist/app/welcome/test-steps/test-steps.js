class TestSteps extends crsbinding.classes.BindableElement {
    get html() {
        return import.meta.url.replace(".js", ".html");
    }

    async showDialog() {
        crs.call("dialog", "show", {})
    }
}

customElements.define("test-steps", TestSteps)