import {getToken} from "./utils";
import {Constructable} from "../types";

export type MemberName = string | symbol;

export class TypeInfo
{

    public readonly name : string | symbol;

    public readonly type : Function;

    constructor(name : string | symbol, type? : Function) {
        this.name = name;
        this.type = type;
    }

    private readonly _attributes : any = {};

    public setAttribute(type : symbol | any, value? : any) {
        let token = getToken(type);
        if (this._attributes.hasOwnProperty(token)) {
            throw new Error(`Attribute with token ${token} already added`);
        }
        this._attributes[token] = value || type;
    }

    public hasAttribute(type : symbol | any) {
        return this._attributes.hasOwnProperty(getToken(type));
    }

    public getAttribute(type : symbol | any) {
        let token = getToken(type);
        if (false === this._attributes.hasOwnProperty(token)) {
            throw new Error(`Attribute with token ${token} not found.`)
        }
        return this._attributes[token];
    }

    public getAttributes<T>(base : Constructable<T>) : T[]
    {
        return Object.getOwnPropertySymbols(this._attributes)
            .map(x => this._attributes[x])
            .filter(x => x instanceof base)
    }

}

export class ClassInfo extends TypeInfo
{

    private readonly _token: symbol;
    private readonly _parent: ClassInfo;
    private readonly _methods : MethodInfo[] = [];
    private readonly _properties : PropertyInfo[] = [];

    constructor(constructor : Function, parent? : ClassInfo) {
        super((constructor as any).name, constructor);
        this._parent = parent;
        this._token = getToken(constructor);
    }

    public get token() {
        return this._token;
    }

    public get parent() {
        return this._parent;
    }

    public hasMethod(name : string | symbol) : boolean {
        return this._methods.some(x => x.name === name);
    }

    public getMethod(name : string | symbol) : MethodInfo {
        if (false === this.hasMethod(name)) {
            throw new Error(`Method with name ${name} doesn't exists`);
        }
        return this._methods.find(x => x.name === name);
    }

    public getMethods() : MethodInfo[] {
        return this._methods.slice();
    }

    public ensureMethod(name : string | symbol) : MethodInfo {
        if (false === this.hasMethod(name)) {
            this._methods.push(new MethodInfo(name))
        }
        return this.getMethod(name);
    }

    public hasProperty(name : string | symbol) : boolean {
        return this._properties.some(x => x.name === name);
    }

    public getProperty(name : string | symbol) : PropertyInfo {
        if (false === this.hasProperty(name)) {
            throw new Error(`Property with name ${name} doesn't exists`);
        }
        return this._properties.find(x => x.name === name);
    }

    public getProperties() : PropertyInfo[] {
        return this.getOwnProperties().concat(this.parent ? this.parent.getProperties() : []);
    }

    public getOwnProperties() : PropertyInfo[] {
        return this._properties.slice();
    }

    public ensureProperty(name : string | symbol) : PropertyInfo {
        if (false === this.hasProperty(name)) {
            this._properties.push(new PropertyInfo(name, {}))
        }
        return this.getProperty(name);
    }

    public getAttribute(type: symbol | any): any {
        if (false === this.hasAttribute(type)) {
            throw new Error(`Attribute with token ${type} not found.`)
        }
        return this.hasOwnAttribute(type) === false
            ? this.parent.getAttribute(type)
            : super.getAttribute(type)
    }

    public getAttributes<T>(base: Constructable<T>): T[] {
        return super.getAttributes(base).concat(
            this.parent ? this.parent.getAttributes(base) : []
        );
    }

    public getOwnAttributes<T>(base: Constructable<T>): T[] {
        return super.getAttributes(base);
    }

    public hasAttribute(type: symbol | any) : boolean {
        return super.hasAttribute(type) || this.parent && this.parent.hasAttribute(type);
    }

    public hasOwnAttribute(type : symbol | any) : boolean {
        return super.hasAttribute(type);
    }

}

export class MethodInfo extends TypeInfo
{

    private readonly _parameters : ParameterInfo[];

    constructor(name : string | symbol, type? : Function) {
        super(name, type);
        this._parameters = []; // Replace with Reflect-Metadata
    }

    public get parameters() {
        return this._parameters.slice();
    }

    public hasParameter(index : number) : boolean {
        return this._parameters.length > index && index > 0 && this._parameters[index] != null;
    }

    public getParameter(index : number) : ParameterInfo {
        return this._parameters[index];
    }

    public ensureParameter(index : number) : ParameterInfo {
        if (false === this.hasParameter(index)) {
            this._parameters[index] = new ParameterInfo(index);
        }
        return this.getParameter(index);
    }

}

export class PropertyInfo extends TypeInfo
{

    private readonly _descriptor: PropertyDescriptor;

    constructor(name: string | symbol, descriptor : PropertyDescriptor) {
        super(name);
        this._descriptor = descriptor;
    }

    public get readable() {
        return this._descriptor == null || this._descriptor.get !== void 0;
    }

    public get writable() {
        return this._descriptor == null || this._descriptor.set !== void 0;
    }

}

export class ParameterInfo extends TypeInfo
{

    public readonly index: number;

    constructor(index : number) {
        super(index.toString());
        this.index = index;
    }

}
