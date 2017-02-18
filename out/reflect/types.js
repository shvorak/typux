"use strict";
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
var TypeInfo = (function () {
    function TypeInfo(name, type) {
        this._attributes = {};
        this.name = name;
        this.type = type;
    }
    TypeInfo.prototype.setAttribute = function (type, value) {
        var token = utils_1.getToken(type);
        if (this._attributes.hasOwnProperty(token)) {
            throw new Error("Attribute with token " + token + " already added");
        }
        this._attributes[token] = value || type;
    };
    TypeInfo.prototype.hasAttribute = function (type) {
        return this._attributes.hasOwnProperty(utils_1.getToken(type));
    };
    TypeInfo.prototype.getAttribute = function (type) {
        var token = utils_1.getToken(type);
        if (false === this._attributes.hasOwnProperty(token)) {
            throw new Error("Attribute with token " + token + " not found.");
        }
        return this._attributes[token];
    };
    TypeInfo.prototype.getAttributes = function (base) {
        var _this = this;
        return Object.getOwnPropertySymbols(this._attributes)
            .map(function (x) { return _this._attributes[x]; })
            .filter(function (x) { return x instanceof base; });
    };
    return TypeInfo;
}());
exports.TypeInfo = TypeInfo;
var ClassInfo = (function (_super) {
    tslib_1.__extends(ClassInfo, _super);
    function ClassInfo(constructor, parent) {
        var _this = _super.call(this, constructor.name, constructor) || this;
        _this._methods = [];
        _this._properties = [];
        _this._parent = parent;
        _this._token = utils_1.getToken(constructor);
        return _this;
    }
    Object.defineProperty(ClassInfo.prototype, "token", {
        get: function () {
            return this._token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassInfo.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    ClassInfo.prototype.hasMethod = function (name) {
        return this._methods.some(function (x) { return x.name === name; });
    };
    ClassInfo.prototype.getMethod = function (name) {
        if (false === this.hasMethod(name)) {
            throw new Error("Method with name " + name + " doesn't exists");
        }
        return this._methods.find(function (x) { return x.name === name; });
    };
    ClassInfo.prototype.getMethods = function () {
        return this._methods.slice();
    };
    ClassInfo.prototype.ensureMethod = function (name) {
        if (false === this.hasMethod(name)) {
            this._methods.push(new MethodInfo(name));
        }
        return this.getMethod(name);
    };
    ClassInfo.prototype.hasProperty = function (name) {
        return this._properties.some(function (x) { return x.name === name; });
    };
    ClassInfo.prototype.getProperty = function (name) {
        if (false === this.hasProperty(name)) {
            throw new Error("Property with name " + name + " doesn't exists");
        }
        return this._properties.find(function (x) { return x.name === name; });
    };
    ClassInfo.prototype.getProperties = function () {
        return this._properties.slice();
    };
    ClassInfo.prototype.ensureProperty = function (name) {
        if (false === this.hasProperty(name)) {
            this._properties.push(new PropertyInfo(name, {}));
        }
        return this.getProperty(name);
    };
    return ClassInfo;
}(TypeInfo));
exports.ClassInfo = ClassInfo;
var MethodInfo = (function (_super) {
    tslib_1.__extends(MethodInfo, _super);
    function MethodInfo(name, type) {
        var _this = _super.call(this, name, type) || this;
        _this._parameters = []; // Replace with Reflect-Metadata
        return _this;
    }
    Object.defineProperty(MethodInfo.prototype, "parameters", {
        get: function () {
            return this._parameters.slice();
        },
        enumerable: true,
        configurable: true
    });
    MethodInfo.prototype.hasParameter = function (index) {
        return this._parameters.length > index && index > 0 && this._parameters[index] != null;
    };
    MethodInfo.prototype.getParameter = function (index) {
        return this._parameters[index];
    };
    MethodInfo.prototype.ensureParameter = function (index) {
        if (false === this.hasParameter(index)) {
            this._parameters[index] = new ParameterInfo(index);
        }
        return this.getParameter(index);
    };
    return MethodInfo;
}(TypeInfo));
exports.MethodInfo = MethodInfo;
var PropertyInfo = (function (_super) {
    tslib_1.__extends(PropertyInfo, _super);
    function PropertyInfo(name, descriptor) {
        var _this = _super.call(this, name) || this;
        _this._descriptor = descriptor;
        return _this;
    }
    Object.defineProperty(PropertyInfo.prototype, "readable", {
        get: function () {
            return this._descriptor == null || this._descriptor.get !== void 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyInfo.prototype, "writable", {
        get: function () {
            return this._descriptor == null || this._descriptor.set !== void 0;
        },
        enumerable: true,
        configurable: true
    });
    return PropertyInfo;
}(TypeInfo));
exports.PropertyInfo = PropertyInfo;
var ParameterInfo = (function (_super) {
    tslib_1.__extends(ParameterInfo, _super);
    function ParameterInfo(index) {
        var _this = _super.call(this, index.toString()) || this;
        _this.index = index;
        return _this;
    }
    return ParameterInfo;
}(TypeInfo));
exports.ParameterInfo = ParameterInfo;
