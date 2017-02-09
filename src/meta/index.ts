export * from './info';
import {Constructable} from "../types";
import {ClassInfo, PropertyInfo} from "./info";

const dict : any = {};

const HASH_KEY = Symbol('metadata.hash');
const INFO_KEY = Symbol('metadata.info');


export const metadata = {
    getClasses,
    getClassInfo,
    getClassInfoByHash,
    getPropertyInfo,
    defineClassAttribute,
    definePropertyAttribute
};

function getClasses() : ClassInfo[]
{
    return Object.keys(dict).map(x => {
        return dict[x];
    });
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
        dict[hash] = type[INFO_KEY];
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
    if (false === dict.hasOwnProperty(hash)) {
        throw new Error(`ClassInfo with hash code ${hash} not registered`);
    }
    return dict[hash];
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
    return getClassInfo(Object.getPrototypeOf(target).constructor)
        .addProperty(property, false);
}

function defineClassAttribute(target, name : symbol, data : any)
{
    getClassInfo(target).setAttribute(name, data);
}

function definePropertyAttribute(target, property : string | symbol, name : symbol, data : any)
{
    getClassInfo(target).addProperty(property, false)
        .setAttribute(name, data);
}