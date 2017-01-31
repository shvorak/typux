"use strict";
var meta_1 = require("./meta");
var meta_2 = require("./meta/meta");
var ACTION = Symbol('action');
var TYPE = Symbol('type');
// Class Decorator for messages
function Action(name) {
    return function (target) {
        meta_2.defineClassAttribute(target, ACTION, name);
    };
}
exports.Action = Action;
function Type(type) {
    return function (target, property) {
        meta_2.definePropertyAttribute(target, property, TYPE, type);
    };
}
exports.Type = Type;
// Action name accessor
function getActionName(message) {
    return meta_2.getClassInfo(message).getAttribute(ACTION);
}
exports.getActionName = getActionName;
function getActionMessage(action) {
    return meta_1.getMetaOwner(ACTION, action);
}
exports.getActionMessage = getActionMessage;
