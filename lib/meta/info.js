"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InfoKind;
(function (InfoKind) {
    InfoKind[InfoKind["Class"] = 0] = "Class";
    InfoKind[InfoKind["Property"] = 1] = "Property";
    InfoKind[InfoKind["Method"] = 2] = "Method";
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
    return TypeInfo;
}());
exports.TypeInfo = TypeInfo;
var ClassInfo = (function (_super) {
    __extends(ClassInfo, _super);
    function ClassInfo(hash, type, parent) {
        var _this = _super.call(this, type.name, type) || this;
        _this.kind = InfoKind.Class;
        _this.properties = [];
        _this.hash = hash;
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
    __extends(PropertyInfo, _super);
    function PropertyInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.kind = InfoKind.Property;
        return _this;
    }
    return PropertyInfo;
}(TypeInfo));
exports.PropertyInfo = PropertyInfo;
