"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var actions_1 = require("./actions");
var meta_1 = require("./meta/meta");
__export(require('./meta'));
__export(require('./actions'));
__export(require('./meta/meta'));
__export(require('./actions'));
var User = (function () {
    function User() {
    }
    __decorate([
        actions_1.Type(String)
    ], User.prototype, "name", void 0);
    return User;
}());
var UserLogin = (function (_super) {
    __extends(UserLogin, _super);
    function UserLogin() {
        _super.apply(this, arguments);
    }
    UserLogin = __decorate([
        actions_1.Action('USER_LOGIN')
    ], UserLogin);
    return UserLogin;
}(User));
var user = new User();
var userLogin = new UserLogin();
//
// console.log(Object.getPrototypeOf(User.prototype).constructor);
// console.log(Object.getPrototypeOf(UserLogin.prototype).constructor);
//
// console.log(getClassInfo(User), getClassInfo(user));
var props = meta_1.getClassInfo(userLogin).getProperties();
console.log(props);
