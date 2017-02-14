export * from './info';
import {Constructable} from "../types";
import {ClassInfo, PropertyInfo, TypeInfo, MethodInfo, ParameterInfo} from "./info";

const HASH_MAP : any = {};

const HASH_KEY = Symbol('metadata.hash');
const INFO_KEY = Symbol('metadata.info');


export const metadata = {
    getClasses,
    getTypeInfo,
    getClassInfo,
    getClassInfoByHash,
    getPropertyInfo,
    defineClassAttribute,
    defineMethodAttribute,
    definePropertyAttribute,
    defineParameterAttribute
};

function getClasses() : ClassInfo[]
{
    return Object.keys(HASH_MAP).map(x => {
        return HASH_MAP[x];
    });
}

function getTypeInfo(type : any, property? : string | symbol, parameterIndex? : number) : TypeInfo {
    const info = getClassInfo(type);
    if (parameterIndex) {
        return info.getMethod(property).getParameter(parameterIndex);
    }
    if (property) {
        return info.hasProperty(property)
            ? info.getProperty(property)
            : info.getMethod(property)
        ;
    }
    return info;
}


/**
 * Returns ClassInfo instance for passed class constructor
 *
 * @param {Function} type
 * @returns {ClassInfo}
 */
function getClassInfo<T>(type : Constructable<T> | T) : ClassInfo {
    if (typeof type === 'object') {
        // INSTANCE
        type = type.constructor as any;
    }
    if (type[INFO_KEY] == null) {
        let base : any = getClassParent(<any>type);
        if (base) {
            base = getClassInfo(base);
        }
        let info = type[INFO_KEY] = new ClassInfo(getRandomHash(), type, base);
        let hash = type[HASH_KEY] = info.hash;
        // Save class info in custom store by hash string
        HASH_MAP[hash] = type[INFO_KEY];
    }

    return type[INFO_KEY];
}

function getClassParent<T>(type : Constructable<T>) : Function
{
    let constructor = Object.getPrototypeOf(type.prototype).constructor;
    if (constructor === Object || constructor === Function) {
        return null;
    }

    return constructor;
}

/**
 * Returns existing class info by its hash value
 * @param {String} hash
 * @throws {Error}
 * @returns {ClassInfo}
 */
function getClassInfoByHash(hash : string) : ClassInfo {
    if (false === HASH_MAP.hasOwnProperty(hash)) {
        throw new Error(`ClassInfo with hash code ${hash} not registered`);
    }
    return HASH_MAP[hash];
}

/**
 * Simple random string function
 *
 * @returns {string}
 */
export function getRandomHash()
{
    return Math.random().toString(36).substr(2);
}

/**
 * Return PropertyInfo
 * @param {Object | Function} target
 * Prototype of class (Instance property)
 * or Constructor function (Static property)
 *
 * @param {String | Symbol} property
 * @returns {PropertyInfo}
 */
function getPropertyInfo(target : Object, property : string | symbol) : PropertyInfo
{
    return getClassInfo(target)
        .ensureProperty(property);
}

function defineClassAttribute(target, name : symbol, data : any)
{
    getClassInfo(target)
        .setAttribute(name, data);
}

function defineMethodAttribute(target, property : string | symbol, name : symbol, data : any)
{
    getClassInfo(target)
        .ensureMethod(property)
        .setAttribute(name, data);
}

function definePropertyAttribute(target, property : string | symbol, name : symbol, data : any)
{
    getClassInfo(target)
        .ensureProperty(property)
        .setAttribute(name, data);
}

function defineParameterAttribute(target, property : string | symbol, index : number, name : symbol, data : any)
{
    getClassInfo(target)
        .ensureMethod(property)
        .ensureParameter(index)
        .setAttribute(name, data);
}