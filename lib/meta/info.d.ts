export declare enum InfoKind {
    Class = 0,
    Property = 1,
    Method = 2,
}
export declare abstract class TypeInfo {
    readonly name: string | symbol;
    readonly kind: InfoKind;
    readonly type: any;
    readonly data: any;
    constructor(name: string | symbol, type?: any);
    setAttribute(name: symbol, data: any): void;
    hasAttribute(name: symbol, data?: any): boolean;
    getAttribute(name: symbol): any;
}
export declare class ClassInfo extends TypeInfo {
    kind: InfoKind;
    private properties;
    readonly hash: string;
    readonly parent: ClassInfo;
    constructor(hash: string, type: any, parent?: ClassInfo);
    addProperty(name: string | symbol, strict?: boolean): PropertyInfo;
    getProperties(recursive?: boolean): PropertyInfo[];
}
export declare class PropertyInfo extends TypeInfo {
    kind: InfoKind;
}
