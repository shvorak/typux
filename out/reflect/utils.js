"use strict";
var SIGN = Symbol('typux.reflect.token');
function getToken(target) {
    if (typeof target === 'symbol') {
        return target;
    }
    var constructor = getConstructor(target);
    if (constructor == null) {
        throw new Error("Can't retrieve constructor from " + target);
    }
    if (constructor.hasOwnProperty(SIGN) === false) {
        constructor[SIGN] = Symbol("typux.reflect." + getRandomToken());
    }
    return constructor[SIGN];
}
exports.getToken = getToken;
function getRandomToken() {
    return Math.random().toString(36).substr(2);
}
exports.getRandomToken = getRandomToken;
/**
 * Returns base type except standard types
 *
 * @param {*} target
 * @returns {Function?}
 */
function getParent(target) {
    var constructor = Object.getPrototypeOf(getConstructor(target).prototype).constructor;
    if (constructor === Object || constructor === Function) {
        return void 0;
    }
    return constructor;
}
exports.getParent = getParent;
/**
 * Returns type constructor
 *
 * @param {*} target
 * @returns {Function?}
 */
function getConstructor(target) {
    if (typeof target === 'function') {
        return target;
    }
    if (typeof target === 'object' && target !== null) {
        return target.constructor;
    }
    return void 0;
}
exports.getConstructor = getConstructor;
