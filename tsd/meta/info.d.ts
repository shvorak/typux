export declare enum InfoKind {
    Class = 0,
    Property = 1,
    Method = 2,
    Parameter = 3,
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
    ensureAttribute<T>(name: symbol, factory: () => T): T;
}
export declare class ClassInfo extends TypeInfo {
    kind: InfoKind;
    private _methods;
    private _properties;
    readonly hash: string;
    readonly ctor: MethodInfo;
    readonly parent: ClassInfo;
    constructor(hash: string, type: any, parent?: ClassInfo);
    readonly methods: MethodInfo[];
    readonly properties: PropertyInfo[];
    readonly ownProperties: PropertyInfo[];
    ensureProperty(name: any): PropertyInfo;
    ensureMethod(name: any): MethodInfo;
}
export declare class PropertyInfo extends TypeInfo {
    kind: InfoKind;
    private readonly _descriptor;
    constructor(name: string | symbol, descriptor: PropertyDescriptor);
    readonly readable: boolean;
    readonly writable: boolean;
}
export declare class MethodInfo extends TypeInfo {
    kind: InfoKind;
    private readonly _parameters;
    constructor(name: string | symbol, type: Function);
    readonly parameters: ParameterInfo[];
    ensureParameter(index: number): ParameterInfo;
}
export declare class ParameterInfo extends TypeInfo {
    kind: InfoKind;
    readonly index: number;
    constructor(index: number);
}
