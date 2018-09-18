declare module Tuna { }
declare class JSTemplate {
    static cacheTimeout: number;
    private static cache;
    private static readonly textarea;
    static init(): void;
    static encode(value: string): string;
    static parse(template: string, data: any, cache?: boolean): any;
}
