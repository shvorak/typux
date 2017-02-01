import {metadata} from "./index";

export enum InfoKind
{
    Class,
    Property,
    Method
}

export abstract class TypeInfo
{

    public readonly name : string | symbol;

    public readonly kind : InfoKind;

    public readonly type : any;

    public readonly data : any = {};

    public constructor(name : string | symbol, type? : any) {
        this.name = name;
        this.type = type;
    }

    public setAttribute(name : symbol, data : any) {
        this.data[name] = data;
    }

    public hasAttribute(name : symbol, data? : any) {
        return this.data.hasOwnProperty(name) && (data == null || this.data[name] == data);
    }

    public getAttribute(name : symbol) {
        if (false === this.hasAttribute(name)) {
            throw new Error(`Attribute ${name.toString()} not found in ${this.type}`);
        }
        return this.data[name];
    }

}

export class ClassInfo extends TypeInfo
{

    kind = InfoKind.Class;

    private properties : PropertyInfo[] = [];

    public readonly hash : string;

    constructor(hash: string, type: any) {
        super(type.name, type);
        this.hash = hash;
    }

    public getParent()
    {
        let ctor = Object.getPrototypeOf(this.type.prototype).constructor;
        if (ctor === Object || ctor === Function) {
            return null
        }
        return ctor;
    }

    public addProperty(name : string | symbol, strict = true) : PropertyInfo
    {
        let exists = this.properties.find(x => x.name == name);
        if (exists != null) {
            if (strict === true) {
                throw new Error(`Property with name ${name} already registered`);
            }
            return exists;
        }
        let property = new PropertyInfo(name);
        this.properties.push(property);
        return property;
    }

    public getProperties(recursive = true) : PropertyInfo[]
    {
        let result = [].concat(this.properties);
        let parent;
        if (recursive && (parent = this.getParent())) {
            result = result.concat(metadata.getClassInfo(parent).getProperties(recursive))
        }

        return result;
    }

}


export class PropertyInfo extends TypeInfo
{

    kind = InfoKind.Property;

}