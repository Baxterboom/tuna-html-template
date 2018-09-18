class JSTemplate {
  private static cache: any = {};
  private static readonly textarea: HTMLTextAreaElement = document.createElement('textarea');

  public static encode(value: string) {
    this.textarea.textContent = value;
    return this.textarea.innerHTML;
  }

  public static clear() {
    this.cache = {};
  }

  public static parse(template: string, data: any, cache?: boolean) {
    let err = "";
    try {
      let fn = cache ? this.cache[template] : null;
      if (!fn) {
        var code =
          "var p=[]," +
          "j=JSTemplate," +
          "e=j.encode.bind(j)," +
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
    return '<jstemplate title="' + this.encode(err) + '">&#8224;</jstemplate>';
  }
}