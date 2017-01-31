"use strict";
var store = {};
function getMeta(target, symbol) {
    var constructor = getConstructor(target);
    if (constructor.hasOwnProperty(symbol)) {
        return constructor[symbol];
    }
    return void 0;
}
exports.getMeta = getMeta;
function hasMeta(target, symbol) {
    return getConstructor(target).hasOwnProperty(symbol);
}
exports.hasMeta = hasMeta;
function getMetaOwner(symbol, value) {
    if (store.hasOwnProperty(symbol) && store[symbol].hasOwnProperty(value)) {
        return store[symbol][value];
    }
    return void 0;
}
exports.getMetaOwner = getMetaOwner;
function defineMeta(target, symbol, value) {
    if (store.hasOwnProperty(symbol) === false) {
        store[symbol] = {};
    }
    store[symbol][value] = target;
    target[symbol] = value;
    return target;
}
exports.defineMeta = defineMeta;
function getConstructor(input) {
    if (input == null) {
        throw new Error('Can\'t return constructor from undefined');
    }
    if (typeof input === 'function') {
        return input;
    }
    if (input.constructor) {
        return getConstructor(input.constructor);
    }
}
exports.getConstructor = getConstructor;
