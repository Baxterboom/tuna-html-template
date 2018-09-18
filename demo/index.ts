class Index {

    static onload() {
        Index.add();
    }

    static timer(fn: () => void) {
        const start = new Date().valueOf();
        fn();
        const end = new Date().valueOf();
        return end - start;
    }

    static add() {
        const json = Index.get<HTMLInputElement>("json").value || "";
        const template = Index.get<HTMLTextAreaElement>("template").value || "";
        let result = "";

        const elapsed = Index.timer(() => {
            result = JSTemplate.parse(template, JSON.parse(json.trim()));
        });

        Index.write(`<demo>${result}<hr><i>render time: ${elapsed}ms</i></demo>`);
    }

    static get<T extends HTMLElement>(id: string) {
        const target = document.getElementById(id);
        if (!target) throw new Error("debug does not exist");
        return target as T;
    }

    static getTextContent(id: string) {
        const target = Index.get(id);
        return target.textContent;
    }

    static write(html: string) {
        const target = Index.get("debug");
        target.innerHTML += html;
    }

    static clear() {
        const target = Index.get("debug");
        target.innerHTML = "";
    }
}