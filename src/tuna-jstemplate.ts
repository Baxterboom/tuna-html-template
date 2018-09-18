module Tuna { }

class JSTemplate {
  public static cacheTimeout: number = 5000 * 60;

  private static cache: any = {};
  private static readonly textarea = document.createElement('textarea') as HTMLTextAreaElement;

  static init() {
    setInterval(() => this.cache = {}, this.cacheTimeout);
  }

  public static encode(value: string) {
    this.textarea.textContent = value;
    return this.textarea.innerHTML;
  }

  public static parse(template: string, data: any, cache: boolean = true) {
    let err = "";
    try {
      let fn = cache ? this.cache[template] : null;
      if (!fn) {
        var code =
          "var p=[],w=write=function(){p.push.apply(p,arguments);};" +
          "with(obj){w('" +
          template
            .replace(/[\r\t\n]/g, "")
            .replace(/'(?=[^#]*%>)/g, "\t")
            .split("'").join("\\'")
            .split("\t").join("'")
            .replace(/<%=(.+?)%>/g, "'+ JSTemplate.encode($1) +'")
            .split("<%").join("');\n")
            .split("%>").join("w('")
          + "');}return p.join('');";

        console.log(code);
        console.log(code.length);
        fn = new Function("obj", code);
        if (cache) this.cache[template] = fn;
      }
      return fn(data);
    } catch (e) { err = "[JSTemplate] parse failed due to: " + e.message; }
    console.error(err);
    return '<jstemplate title=' + this.encode(err) + '">&#8224;</jstemplate>';
  }
}

JSTemplate.init();