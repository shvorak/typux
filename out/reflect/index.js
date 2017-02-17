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
            return classes;
        },
        enumerable: true,
        configurable: true
    });
    reflect.getTypeInfo = function (target) {
        return reflect.getClassInfo(target);
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
    return reflect;
}());
exports.reflect = reflect;
