"use strict";
var utils_1 = require("./utils");
var types_1 = require("./types");
var classes = {};
var infokey = Symbol('typux.reflect.info');
var reflect = (function () {
    function reflect() {
    }
    Object.defineProperty(reflect, "classes", {
        get: function () {
            return Object.getOwnPropertySymbols(classes).map(function (x) { return classes[x]; });
        },
        enumerable: true,
        configurable: true
    });
    reflect.getTypeInfo = function (target, property, parameter) {
        var info = reflect.getClassInfo(target);
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
    };
    reflect.getClassInfo = function (target) {
        // TODO : Refactor
        var token = utils_1.getToken(target);
        if (classes.hasOwnProperty(token)) {
            return classes[token];
        }
        var type = utils_1.getConstructor(target);
        if (type == null) {
            throw new Error("Invalid class type");
        }
        if (type.hasOwnProperty(infokey)) {
            return type[infokey]; // Already have info
        }
        var baseInfo;
        var baseType = utils_1.getParent(type);
        if (baseType) {
            baseInfo = reflect.getClassInfo(baseType);
        }
        //     Global store     In-type store
        return classes[token] = type[infokey] = new types_1.ClassInfo(type, baseInfo);
    };
    reflect.defineClassAttribute = function (target, type, value) {
        reflect.getClassInfo(target)
            .setAttribute(type, value);
    };
    reflect.defineMethodAttribute = function (target, name, type, value) {
        reflect.getClassInfo(target)
            .ensureMethod(name)
            .setAttribute(type, value);
    };
    reflect.definePropertyAttribute = function (target, name, type, value) {
        reflect.getClassInfo(target)
            .ensureProperty(name)
            .setAttribute(type, value);
    };
    reflect.defineParameterAttribute = function (target, name, index, type, value) {
        reflect.getClassInfo(target)
            .ensureMethod(name).ensureParameter(index)
            .setAttribute(type, value);
    };
    return reflect;
}());
exports.reflect = reflect;
