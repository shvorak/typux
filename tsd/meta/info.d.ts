import { Constructable } from "../types";
export declare type TypeKey = string | symbol;
export declare type AttributeKey = symbol | any;
export declare enum InfoKind {
    Class = 0,
    Property = 1,
    Method = 2,
    Parameter = 3,
}
export declare abstract class TypeInfo {
    readonly name: TypeKey;
    readonly kind: InfoKind;
    readonly type: any;
    readonly data: any;
    constructor(name: TypeKey, type?: any);
    setAttribute(name: AttributeKey, data: any): void;
    hasAttribute(name: AttributeKey, data?: any): boolean;
    getAttribute<T>(name: symbol | Constructable<T>): any;
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
    getProperty(name: any): PropertyInfo;
    hasProperty(name: any): boolean;
    ensureProperty(name: any): PropertyInfo;
    getMethod(name: any): MethodInfo;
    hasMethod(name: any): boolean;
    ensureMethod(name: any): MethodInfo;
}
export declare class MethodInfo extends TypeInfo {
    kind: InfoKind;
    private readonly _parameters;
    constructor(name: string | symbol, type: Function);
    readonly parameters: ParameterInfo[];
    getParameter(index: number): ParameterInfo;
    ensureParameter(index: number): ParameterInfo;
}
export declare class PropertyInfo extends TypeInfo {
    kind: InfoKind;
    private readonly _descriptor;
    constructor(name: string | symbol, descriptor: PropertyDescriptor);
    readonly readable: boolean;
    readonly writable: boolean;
}
export declare class ParameterInfo extends TypeInfo {
    kind: InfoKind;
    readonly index: number;
    constructor(index: number);
}
