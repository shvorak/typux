"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var tslib_1 = require("tslib");
var attrs_1 = require("./attrs");
__export(require("./attrs"));
__export(require("./meta"));
var EmailAttribute = (function () {
    function EmailAttribute() {
    }
    return EmailAttribute;
}());
var Type = Symbol('type');
var Email = function () { return attrs_1.Attribute(new EmailAttribute()); };
var Entity = (function () {
    function Entity() {
    }
    return Entity;
}());
tslib_1.__decorate([
    attrs_1.Attribute(Type, Number),
    tslib_1.__metadata("design:type", Number)
], Entity.prototype, "id", void 0);
var User = (function (_super) {
    tslib_1.__extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(Entity));
tslib_1.__decorate([
    Email(),
    attrs_1.Attribute(Type, String),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
