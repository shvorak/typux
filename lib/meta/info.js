"use strict";
var tslib_1 = require("tslib");
var InfoKind;
(function (InfoKind) {
    InfoKind[InfoKind["Class"] = 0] = "Class";
    InfoKind[InfoKind["Property"] = 1] = "Property";
    InfoKind[InfoKind["Method"] = 2] = "Method";
    InfoKind[InfoKind["Argument"] = 3] = "Argument";
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
        _this.properties = [];
        _this.hash = hash;
        _this.ctor = new MethodInfo(type);
        _this.parent = parent;
        return _this;
    }
    ClassInfo.prototype.addProperty = function (name, strict) {
        if (strict === void 0) { strict = true; }
        var exists = this.properties.find(function (x) { return x.name == name; });
        if (exists != null) {
            if (strict === true) {
                throw new Error("Property with name " + name + " already registered");
            }
            return exists;
        }
        var property = new PropertyInfo(name);
        this.properties.push(property);
        return property;
    };
    ClassInfo.prototype.getProperties = function (recursive) {
        if (recursive === void 0) { recursive = true; }
        var result = [].concat(this.properties);
        if (recursive && this.parent) {
            result = result.concat(this.parent.getProperties(recursive));
        }
        return result;
    };
    return ClassInfo;
}(TypeInfo));
exports.ClassInfo = ClassInfo;
var PropertyInfo = (function (_super) {
    tslib_1.__extends(PropertyInfo, _super);
    function PropertyInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.kind = InfoKind.Property;
        return _this;
    }
    return PropertyInfo;
}(TypeInfo));
exports.PropertyInfo = PropertyInfo;
var MethodInfo = (function (_super) {
    tslib_1.__extends(MethodInfo, _super);
    function MethodInfo(type) {
        var _this = _super.call(this, type.name) || this;
        _this.kind = InfoKind.Method;
        return _this;
    }
    return MethodInfo;
}(TypeInfo));
exports.MethodInfo = MethodInfo;
