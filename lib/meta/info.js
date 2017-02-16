"use strict";
var tslib_1 = require("tslib");
var InfoKind;
(function (InfoKind) {
    InfoKind[InfoKind["Class"] = 0] = "Class";
    InfoKind[InfoKind["Property"] = 1] = "Property";
    InfoKind[InfoKind["Method"] = 2] = "Method";
    InfoKind[InfoKind["Parameter"] = 3] = "Parameter";
})(InfoKind = exports.InfoKind || (exports.InfoKind = {}));
var TypeInfo = (function () {
    function TypeInfo(name, type) {
        this.data = {};
        this.name = name;
        this.type = type;
    }
    TypeInfo.prototype.setAttribute = function (name, data) {
        this.data[name] = data;
    };
    TypeInfo.prototype.hasAttribute = function (name, data) {
        return this.data.hasOwnProperty(name) && (data == null || this.data[name] == data);
    };
    TypeInfo.prototype.getAttribute = function (name) {
        if (false === this.hasAttribute(name)) {
            throw new Error("Attribute " + name.toString() + " not found in " + this.type);
        }
        return this.data[name];
    };
    TypeInfo.prototype.ensureAttribute = function (name, factory) {
        if (false === this.hasAttribute(name)) {
            this.setAttribute(name, factory());
        }
        return this.getAttribute(name);
    };
    return TypeInfo;
}());
exports.TypeInfo = TypeInfo;
var ClassInfo = (function (_super) {
    tslib_1.__extends(ClassInfo, _super);
    function ClassInfo(hash, type, parent) {
        var _this = _super.call(this, type.name, type) || this;
        _this.kind = InfoKind.Class;
        _this._methods = [];
        _this._properties = [];
        _this.hash = hash;
        _this.ctor = new MethodInfo(_this.name, type);
        _this.parent = parent;
        return _this;
    }
    Object.defineProperty(ClassInfo.prototype, "methods", {
        get: function () {
            return this._methods.slice();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassInfo.prototype, "properties", {
        get: function () {
            return this._properties.slice().concat(this.parent ? this.parent.properties : []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassInfo.prototype, "ownProperties", {
        get: function () {
            return this._properties.slice();
        },
        enumerable: true,
        configurable: true
    });
    ClassInfo.prototype.getProperty = function (name) {
        return this._properties.find(function (x) { return x.name === name; });
    };
    ClassInfo.prototype.hasProperty = function (name) {
        return this._properties.some(function (x) { return x.name === name; });
    };
    ClassInfo.prototype.ensureProperty = function (name) {
        var exists = this._properties.find(function (x) { return x.name === name; });
        if (exists) {
            return exists;
        }
        var length = this._properties.push(new PropertyInfo(name, Object.getOwnPropertyDescriptor(this.type.prototype, name)));
        return this._properties[length - 1];
    };
    ClassInfo.prototype.getMethod = function (name) {
        return this._methods.find(function (x) { return x.name === name; });
    };
    ClassInfo.prototype.hasMethod = function (name) {
        return this._methods.some(function (x) { return x.name === name; });
    };
    ClassInfo.prototype.ensureMethod = function (name) {
        var exists = this.getMethod(name);
        if (exists) {
            return exists;
        }
        var length = this._methods.push(new MethodInfo(name, this.type.prototype[name]));
        return this._methods[length - 1];
    };
    return ClassInfo;
}(TypeInfo));
exports.ClassInfo = ClassInfo;
var PropertyInfo = (function (_super) {
    tslib_1.__extends(PropertyInfo, _super);
    function PropertyInfo(name, descriptor) {
        var _this = _super.call(this, name) || this;
        _this.kind = InfoKind.Property;
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
var MethodInfo = (function (_super) {
    tslib_1.__extends(MethodInfo, _super);
    function MethodInfo(name, type) {
        var _this = _super.call(this, name, type) || this;
        _this.kind = InfoKind.Method;
        _this._parameters = [];
        return _this;
    }
    Object.defineProperty(MethodInfo.prototype, "parameters", {
        get: function () {
            return this._parameters.slice();
        },
        enumerable: true,
        configurable: true
    });
    MethodInfo.prototype.getParameter = function (index) {
        return this._parameters[index];
    };
    MethodInfo.prototype.ensureParameter = function (index) {
        var exists = this.getParameter(index);
        if (exists) {
            return exists;
        }
        return this._parameters[index] = new ParameterInfo(index);
    };
    return MethodInfo;
}(TypeInfo));
exports.MethodInfo = MethodInfo;
var ParameterInfo = (function (_super) {
    tslib_1.__extends(ParameterInfo, _super);
    function ParameterInfo(index) {
        var _this = _super.call(this, '') || this;
        _this.kind = InfoKind.Parameter;
        _this.index = index;
        return _this;
    }
    return ParameterInfo;
}(TypeInfo));
exports.ParameterInfo = ParameterInfo;
