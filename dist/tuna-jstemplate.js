"use strict";
var JSTemplate = /** @class */ (function () {
    function JSTemplate() {
    }
    JSTemplate.init = function () {
        var _this = this;
        setInterval(function () { return _this.cache = {}; }, this.cacheTimeout);
    };
    JSTemplate.encode = function (value) {
        this.textarea.textContent = value;
        return this.textarea.innerHTML;
    };
    JSTemplate.parse = function (template, data, cache) {
        if (cache === void 0) { cache = true; }
        var err = "";
        try {
            var fn = cache ? this.cache[template] : null;
            if (!fn) {
                var code = "var p=[],w=write=function(){p.push.apply(p,arguments);};" +
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
                if (cache)
                    this.cache[template] = fn;
            }
            return fn(data);
        }
        catch (e) {
            err = "[JSTemplate] parse failed due to: " + e.message;
        }
        console.error(err);
        return '<jstemplate title=' + this.encode(err) + '">&#8224;</jstemplate>';
    };
    JSTemplate.cacheTimeout = 5000 * 60;
    JSTemplate.cache = {};
    JSTemplate.textarea = document.createElement('textarea');
    return JSTemplate;
}());
JSTemplate.init();
