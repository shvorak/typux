import { Constructable } from "../types";
export declare class TypeInfo {
    readonly name: string | symbol;
    readonly type: Function;
    constructor(name: string | symbol, type?: Function);
    private readonly _attributes;
    setAttribute(type: symbol | any, value?: any): void;
    hasAttribute(type: symbol | any): any;
    getAttribute(type: symbol | any): any;
    getAttributes<T>(base: Constructable<T>): T[];
}
export declare class ClassInfo extends TypeInfo {
    private readonly _token;
    private readonly _parent;
    private readonly _methods;
    private readonly _properties;
    constructor(constructor: Function, parent?: ClassInfo);
    readonly token: symbol;
    readonly parent: ClassInfo;
    readonly members: MethodInfo[];
    readonly methods: MethodInfo[];
    readonly properties: any;
    readonly ownProperties: PropertyInfo[];
}
export declare class MethodInfo extends TypeInfo {
    private readonly _parameters;
    constructor(name: string | symbol, type: Function);
    readonly parameters: ParameterInfo[];
    hasParameter(index: number): boolean;
    getParameter(index: number): ParameterInfo;
}
export declare class PropertyInfo extends TypeInfo {
    private readonly _descriptor;
    constructor(name: string | symbol, descriptor: PropertyDescriptor);
    readonly readable: boolean;
    readonly writable: boolean;
}
export declare class ParameterInfo extends TypeInfo {
    readonly index: number;
    constructor(index: number);
}
