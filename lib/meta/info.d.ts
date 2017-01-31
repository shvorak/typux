export declare enum InfoKind {
    Class = 0,
    Property = 1,
    Method = 2,
}
export declare abstract class Info {
    readonly name: string | symbol;
    readonly kind: InfoKind;
    readonly type: any;
    readonly data: any;
    constructor(name: string | symbol, type?: any);
    setAttribute(name: symbol, data: any): void;
    hasAttribute(name: symbol, data?: any): boolean;
    getAttribute(name: symbol): any;
}
export declare class ClassInfo extends Info {
    kind: InfoKind;
    private properties;
    readonly hash: string;
    constructor(hash: string, type: any);
    getParent(): any;
    addProperty(name: string | symbol, strict?: boolean): PropertyInfo;
    getProperties(recursive?: boolean): PropertyInfo[];
}
export declare class PropertyInfo extends Info {
    kind: InfoKind;
}
