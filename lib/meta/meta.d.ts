import { Constructable } from "../types";
import { ClassInfo, PropertyInfo } from "./info";
/**
 * Returns ClassInfo instance for passed class constructor
 *
 * @param {Function} type
 * @returns {ClassInfo}
 */
export declare function getClassInfo<T>(type: Constructable<T> | T): ClassInfo;
/**
 * Returns existing class info by its hash value
 * @param {String} hash
 * @throws {Error}
 * @returns {ClassInfo}
 */
export declare function getClassInfoByHash(hash: string): ClassInfo;
/**
 * Simple random string function
 *
 * @returns {string}
 */
export declare function getRandomHash(): string;
/**
 * Return PropertyInfo
 * @param {Object | Function} target
 * Prototype of class (Instance property)
 * or Constructor function (Static property)
 *
 * @param {String | Symbol} property
 * @returns {PropertyInfo}
 */
export declare function getPropertyInfo(target: Object, property: string | symbol): PropertyInfo;
export declare function defineClassAttribute(target: any, name: symbol, data: any): void;
export declare function definePropertyAttribute(target: any, property: string, name: symbol, data: any): void;
