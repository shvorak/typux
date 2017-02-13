"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./info"));
var info_1 = require("./info");
var dict = {};
var HASH_KEY = Symbol('metadata.hash');
var INFO_KEY = Symbol('metadata.info');
exports.metadata = {
    getClasses: getClasses,
    getClassInfo: getClassInfo,
    getClassInfoByHash: getClassInfoByHash,
    getPropertyInfo: getPropertyInfo,
    defineClassAttribute: defineClassAttribute,
    defineMethodAttribute: defineMethodAttribute,
    definePropertyAttribute: definePropertyAttribute
};
function getClasses() {
    return Object.keys(dict).map(function (x) {
        return dict[x];
    });
}
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
        var base = getClassParent(type);
        if (base) {
            base = getClassInfo(base);
        }
        var info = type[INFO_KEY] = new info_1.ClassInfo(getRandomHash(), type, base);
        var hash = type[HASH_KEY] = info.hash;
        // Save class info in custom store by hash string
        dict[hash] = type[INFO_KEY];
    }
    return type[INFO_KEY];
}
function getClassParent(type) {
    var constructor = Object.getPrototypeOf(type.prototype).constructor;
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
function getClassInfoByHash(hash) {
    if (false === dict.hasOwnProperty(hash)) {
        throw new Error("ClassInfo with hash code " + hash + " not registered");
    }
    return dict[hash];
}
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
    return getClassInfo(target)
        .ensureProperty(property);
}
function defineClassAttribute(target, name, data) {
    getClassInfo(target).setAttribute(name, data);
}
function defineMethodAttribute(target, property, name, data) {
    getClassInfo(target).ensureMethod(property)
        .setAttribute(name, data);
}
function definePropertyAttribute(target, property, name, data) {
    getClassInfo(target).addProperty(property, false)
        .setAttribute(name, data);
}
