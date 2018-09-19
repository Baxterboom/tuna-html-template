declare class JSTemplateClass {
    cache: any;
    static encode: (value: string) => string;
    constructor();
    parse(template: string, data: any, cache?: boolean): any;
}
declare const JSTemplate: JSTemplateClass;
