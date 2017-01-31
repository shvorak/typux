"use strict";
var info_1 = require("./info");
var dict = {};
var HASH_KEY = Symbol('meta.hash');
var INFO_KEY = Symbol('meta.info');
/**
 * Returns ClassInfo instance for passed class constructor
 *
 * @param {Function} type
 * @returns {ClassInfo}
 */
function getClassInfo(type) {
    if (typeof type === 'object') {
        // INSTANCE
        type = type.constructor;
    }
    if (type[INFO_KEY] == null) {
        type[INFO_KEY] = new info_1.ClassInfo(getRandomHash(), type);
        dict[type[INFO_KEY].hash] = type[INFO_KEY];
    }
    return type[INFO_KEY];
}
exports.getClassInfo = getClassInfo;
/**
 * Returns existing class info by its hash value
 * @param {String} hash
 * @throws {Error}
 * @returns {ClassInfo}
 */
function getClassInfoByHash(hash) {
    if (false === dict.hasOwnProperty(hash)) {
        throw new Error("ClassInfo with hash code " + hash + " not registered");
    }
    return dict[hash];
}
exports.getClassInfoByHash = getClassInfoByHash;
/**
 * Simple random string function
 *
 * @returns {string}
 */
function getRandomHash() {
    return Math.random().toString(36).substr(2);
}
exports.getRandomHash = getRandomHash;
/**
 * Return PropertyInfo
 * @param {Object | Function} target
 * Prototype of class (Instance property)
 * or Constructor function (Static property)
 *
 * @param {String | Symbol} property
 * @returns {PropertyInfo}
 */
function getPropertyInfo(target, property) {
    return getClassInfo(Object.getPrototypeOf(target).constructor)
        .addProperty(property, false);
}
exports.getPropertyInfo = getPropertyInfo;
function defineClassAttribute(target, name, data) {
    getClassInfo(target).setAttribute(name, data);
}
exports.defineClassAttribute = defineClassAttribute;
function definePropertyAttribute(target, property, name, data) {
    getClassInfo(target).addProperty(property, false)
        .setAttribute(name, data);
}
exports.definePropertyAttribute = definePropertyAttribute;
