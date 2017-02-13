export enum InfoKind
{
    Class,
    Property,
    Method,
    Argument
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

    private methods : MethodInfo[] = [];
    private properties : PropertyInfo[] = [];

    public readonly hash : string;
    public readonly ctor : MethodInfo;
    public readonly parent: ClassInfo;

    constructor(hash: string, type: any, parent? : ClassInfo) {
        super(type.name, type);
        this.hash = hash;
        this.ctor = new MethodInfo(this.name, type);
        this.parent = parent;
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
        if (recursive && this.parent) {
            result = result.concat(this.parent.getProperties(recursive))
        }
        return result;
    }

    public ensureProperty(name) : PropertyInfo
    {
        let exists = this.properties.find(x => x.name === name);
        if (exists) {
            return exists;
        }
        let length = this.properties.push(new PropertyInfo(name));

        return this.properties[length - 1];
    }

    public ensureMethod(name) : MethodInfo
    {
        let exists = this.methods.find(x => x.name === name);
        if (exists) {
            return exists;
        }
        let length = this.methods.push(new MethodInfo(name, this.type.prototype[name]));

        return this.methods[length - 1];
    }

}


export class PropertyInfo extends TypeInfo
{

    kind = InfoKind.Property;

}


export class MethodInfo extends TypeInfo
{

    kind = InfoKind.Method;

    constructor(name : string | symbol, type : Function) {
        super(name, type);
    }

}