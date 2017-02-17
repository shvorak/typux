import {getConstructor, getParent, getToken} from "./utils";
import {ClassInfo} from "./types";

const classes : any = {};
const infokey = Symbol('typux.reflect.info');

export class reflect
{

    public static get classes()
    {
        return classes;
    }

    public static getTypeInfo(target : any) {
        return reflect.getClassInfo(target);
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

}