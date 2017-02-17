import {Constructable} from "../types";


// TODO : Find best types constraint
export type TypeKey = string | symbol;
export type AttributeKey = symbol | any;

export enum InfoKind
{
    Class,
    Property,
    Method,
    Parameter
}

export abstract class TypeInfo
{

    public readonly name : TypeKey;

    public readonly kind : InfoKind;

    public readonly type : any;

    public readonly data : any = {};

    public constructor(name : TypeKey, type? : any) {
        this.name = name;
        this.type = type;
    }

    public setAttribute(name : AttributeKey, data : any) {
        this.data[name] = data;
    }

    public hasAttribute(name : AttributeKey, data? : any) {
        return this.data.hasOwnProperty(name) && (data == null || this.data[name] == data);
    }

    public getAttribute<T>(name : symbol | Constructable<T>) {

        if (false === this.hasAttribute(name)) {
            throw new Error(`Attribute ${name.toString()} not found in ${this.type}`);
        }
        return this.data[name];
    }

    public ensureAttribute<T>(name : symbol, factory : () => T) : T
    {
        if (false === this.hasAttribute(name)) {
            this.setAttribute(name, factory());
        }
        return this.getAttribute(name);
    }

}

export class ClassInfo extends TypeInfo
{

    kind = InfoKind.Class;

    private _methods : MethodInfo[] = [];
    private _properties : PropertyInfo[] = [];

    public readonly hash : string;
    public readonly ctor : MethodInfo;
    public readonly parent: ClassInfo;

    constructor(hash: string, type: any, parent? : ClassInfo) {
        super(type.name, type);
        this.hash = hash;
        this.ctor = new MethodInfo(this.name, type);
        this.parent = parent;
    }

    public get methods() {
        return this._methods.slice();
    }

    public get properties() : PropertyInfo[] {
        return this._properties.slice().concat(
            this.parent ? this.parent.properties : []
        )
    }

    public get ownProperties() : PropertyInfo[]
    {
        return this._properties.slice()
    }

    public getProperty(name) : PropertyInfo
    {
        return this._properties.find(x => x.name === name);
    }

    public hasProperty(name) : boolean
    {
        return this._properties.some(x => x.name === name);
    }

    public ensureProperty(name) : PropertyInfo
    {
        let exists = this._properties.find(x => x.name === name);
        if (exists) {
            return exists;
        }
        let length = this._properties.push(new PropertyInfo(
            name,
            Object.getOwnPropertyDescriptor(this.type.prototype, name)
        ));

        return this._properties[length - 1];
    }


    public getMethod(name) : MethodInfo
    {
        return this._methods.find(x => x.name === name);
    }

    public hasMethod(name) : boolean
    {
        return this._methods.some(x => x.name === name);
    }

    public ensureMethod(name) : MethodInfo
    {
        let exists = this.getMethod(name);
        if (exists) {
            return exists;
        }
        let length = this._methods.push(new MethodInfo(name, this.type.prototype[name]));

        return this._methods[length - 1];
    }

}

export class MethodInfo extends TypeInfo
{

    kind = InfoKind.Method;

    private readonly _parameters : ParameterInfo[] = [];

    constructor(name : string | symbol, type : Function) {
        super(name, type);
    }

    public get parameters() {
        return this._parameters.slice();
    }

    public getParameter(index : number) : ParameterInfo
    {
        return this._parameters[index];
    }

    public ensureParameter(index : number) : ParameterInfo
    {
        let exists = this.getParameter(index);
        if (exists) {
            return exists;
        }
        return this._parameters[index] = new ParameterInfo(index);
    }

}

export class PropertyInfo extends TypeInfo
{

    kind = InfoKind.Property;

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
    kind = InfoKind.Parameter;

    public readonly index: number;

    constructor(index : number) {
        super('');
        this.index = index;
    }

}

function getKey()
{

}