"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var tslib_1 = require("tslib");
var index_1 = require("./reflect/index");
__export(require("./attrs"));
__export(require("./meta"));
var test = Symbol('test');
var Base = (function () {
    function Base() {
    }
    return Base;
}());
var Test = (function (_super) {
    tslib_1.__extends(Test, _super);
    function Test() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Test;
}(Base));
var Validator = (function () {
    function Validator() {
    }
    return Validator;
}());
var EmailValidator = (function (_super) {
    tslib_1.__extends(EmailValidator, _super);
    function EmailValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailValidator.prototype.validate = function (value) {
    };
    return EmailValidator;
}(Validator));
var EnumValidator = (function (_super) {
    tslib_1.__extends(EnumValidator, _super);
    function EnumValidator(list) {
        var _this = _super.call(this) || this;
        _this._list = list;
        return _this;
    }
    EnumValidator.prototype.validate = function (value) {
    };
    return EnumValidator;
}(Validator));
var type = index_1.reflect.getTypeInfo(Test);
type.setAttribute(test, 1);
type.setAttribute(new EnumValidator({}));
type.setAttribute(new EmailValidator());
console.log(type == index_1.reflect.getClassInfo(type.token));
console.log(type.getAttribute(test));
console.log(type.getAttributes(Validator));
// console.log(type);
// console.log(reflect.getTypeInfo(Test.prototype));
// console.log(reflect.getTypeInfo(new Test()));
// class EmailAttribute
// {
//
// }
//
// const Type = Symbol('type');
// const Email = () => Attribute(new EmailAttribute()) as PropertyDecorator;
//
//
// class Entity
// {
//
//     @Attribute(Type, Number)
//     public id : number;
//
// }
//
// class User extends Entity
// {
//
//     @Email()
//     @Attribute(Type, String)
//     public email : string;
//
// }
// let userType = metadata.getTypeInfo(User);
// console.log(userType); 
