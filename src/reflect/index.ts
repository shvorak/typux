import {getConstructor, getParent, getToken} from "./utils";
import {ClassInfo, MemberName} from "./types";

const classes : any = {};
const infokey = Symbol('typux.reflect.info');

export class reflect
{

    public static get classes() : ClassInfo[]
    {
        return Object.getOwnPropertySymbols(classes).map(x => classes[x]);
    }

    public static getTypeInfo(target : any, property? : MemberName, parameter? : number) {
        let info = reflect.getClassInfo(target);
        if (arguments.length === 1) {
            return info;
        }
        if (arguments.length === 2) {
            return info.hasProperty(property) ? info.getProperty(property) : info.getMethod(property);
        }
        if (arguments.length === 3) {
            return info.getMethod(property).getParameter(parameter);
        }
        throw new Error('Invalid arguments');
    }

    public static getClassInfo(target : any | symbol) {
        // TODO : Refactor
        let token = getToken(target);
        if (classes.hasOwnProperty(token)) {
            return classes[token];
        }

        let type = getConstructor(target);

        if (type == null) {
            throw new Error(`Invalid class type`);
        }

        if (type.hasOwnProperty(infokey)) {
            return type[infokey]; // Already have info
        }

        let baseInfo;
        let baseType = getParent(type);
        if (baseType) {
            baseInfo = reflect.getClassInfo(baseType);
        }

        //     Global store     In-type store
        return classes[token] = type[infokey] = new ClassInfo(type, baseInfo);
    }

    public static defineClassAttribute(target : any, type : MemberName, value? : any) {
        reflect.getClassInfo(target)
            .setAttribute(type, value);
    }

    public static defineMethodAttribute(target : any, name : MemberName, type : symbol|any, value? : any) {
        reflect.getClassInfo(target)
            .ensureMethod(name)
            .setAttribute(type, value);
    }
    public static definePropertyAttribute(target : any, name : MemberName, type : symbol|any, value? : any) {
        reflect.getClassInfo(target)
            .ensureProperty(name)
            .setAttribute(type, value);
    }
    public static defineParameterAttribute(target : any, name : MemberName, index : number, type : symbol|any, value? : any) {
        reflect.getClassInfo(target)
            .ensureMethod(name).ensureParameter(index)
            .setAttribute(type, value);
    }
}