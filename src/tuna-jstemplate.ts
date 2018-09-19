class JSTemplateClass {
  public cache: any = {};
  public static encode: (value: string) => string;

  constructor() {
    if (JSTemplateClass.encode) return;
    const t: HTMLTextAreaElement = document.createElement('textarea');
    JSTemplateClass.encode = (value: string) => {
      t.textContent = value;
      return t.innerHTML;
    }
  }

  public parse(template: string, data: any, cache?: boolean) {
    let err = "";
    try {
      let fn = cache ? this.cache[template] : null;
      if (!fn) {
        var code =
          "var p=[]," +
          "c=JSTemplateClass," +
          "e=c.encode.bind(c)," +
          "w=write=p.push.bind(p);" +
          "with(o){w('" +
          template
            .replace(/[\r\t\n]/g, " ")
            .replace(/'(?=[^#]*%>)/g, "\t")
            .split("'").join("\\'")
            .split("\t").join("'")
            .replace(/<%=(.+?)%>/g, "'+e($1)+'")
            .split("<%").join("');\n")
            .split("%>").join("w('")
            .replace(/\s+/g, " ")
          + "');}return p.join('');";

        // console.log(code);
        // console.log(code.length);
        fn = new Function("o", code);
        if (cache) this.cache[template] = fn;
      }
      return fn(data);
    } catch (e) { err = e.message; }
    console.error(err);
    return '<jstemplate title="' + JSTemplateClass.encode(err) + '">&#8224;</jstemplate>';
  }
}

const JSTemplate = new JSTemplateClass();