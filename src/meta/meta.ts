import {Constructable} from "../types";
import {ClassInfo, PropertyInfo} from "./info";

const dict : any = {};

const HASH_KEY = Symbol('meta.hash');
const INFO_KEY = Symbol('meta.info');

/**
 * Returns ClassInfo instance for passed class constructor
 *
 * @param {Function} type
 * @returns {ClassInfo}
 */
export function getClassInfo<T>(type : Constructable<T> | T) : ClassInfo {
    if (typeof type === 'object') {
        // INSTANCE
        type = type.constructor as any;
    }
    if (type[INFO_KEY] == null) {
        type[INFO_KEY] = new ClassInfo(getRandomHash(), type);
        dict[type[INFO_KEY].hash] = type[INFO_KEY];
    }
    return type[INFO_KEY];
}

/**
 * Returns existing class info by its hash value
 * @param {String} hash
 * @throws {Error}
 * @returns {ClassInfo}
 */
export function getClassInfoByHash(hash : string) : ClassInfo {
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
export function getPropertyInfo(target : Object, property : string | symbol) : PropertyInfo
{
    return getClassInfo(Object.getPrototypeOf(target).constructor)
        .addProperty(property, false);
}

export function defineClassAttribute(target, name : symbol, data : any)
{
    getClassInfo(target).setAttribute(name, data);
}

export function definePropertyAttribute(target, property : string, name : symbol, data : any)
{
    getClassInfo(target).addProperty(property, false)
        .setAttribute(name, data);
}