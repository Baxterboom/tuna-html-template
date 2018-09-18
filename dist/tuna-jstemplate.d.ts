declare class JSTemplate {
    private static cache;
    private static readonly textarea;
    static encode(value: string): string;
    static clear(): void;
    static parse(template: string, data: any, cache?: boolean): any;
}
