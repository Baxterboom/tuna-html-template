"use strict";
var Index = /** @class */ (function () {
    function Index() {
    }
    Index.onload = function () {
        Index.add();
    };
    Index.timer = function (fn) {
        var start = new Date().valueOf();
        fn();
        var end = new Date().valueOf();
        return end - start;
    };
    Index.add = function () {
        var json = Index.get("json").value || "";
        var template = Index.get("template").value || "";
        var result = "";
        var elapsed = Index.timer(function () {
            result = JSTemplate.parse(template, JSON.parse(json.trim()));
        });
        Index.write("<demo>" + result + "<hr><i>render time: " + elapsed + "ms</i></demo>");
    };
    Index.get = function (id) {
        var target = document.getElementById(id);
        if (!target)
            throw new Error("debug does not exist");
        return target;
    };
    Index.getTextContent = function (id) {
        var target = Index.get(id);
        return target.textContent;
    };
    Index.write = function (html) {
        var target = Index.get("debug");
        target.innerHTML += html;
    };
    Index.clear = function () {
        var target = Index.get("debug");
        target.innerHTML = "";
    };
    return Index;
}());
