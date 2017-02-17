import {getToken} from "./utils";
import {Constructable} from "../types";

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
    private readonly _methods : MethodInfo[];
    private readonly _properties : PropertyInfo[];

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

    public get members() {
        return this.methods.concat(this.properties);
    }

    public get methods() {
        return this._methods.slice();
    }

    public get properties() {
        return this._properties.slice()
            .concat(this.parent ? this.parent.properties : [])
        ;
    }

    public get ownProperties() {
        return this._properties.slice();
    }

}

export class MethodInfo extends TypeInfo
{

    private readonly _parameters : ParameterInfo[];

    constructor(name : string | symbol, type : Function) {
        super(name, type);
        this._parameters = []; // Replace with Reflect-Metadata
    }

    public get parameters() {
        return this._parameters.slice();
    }

    public hasParameter(index : number) : boolean {
        return this._parameters.length > index && index > 0
    }

    public getParameter(index : number) : ParameterInfo {
        return this._parameters[index];
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
