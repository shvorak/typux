"use strict";
var meta_1 = require("./meta");
var ACTION = Symbol('action');
// Class Decorator for messages
function Action(name) {
    return function (target) {
        return meta_1.defineMeta(target, ACTION, name);
    };
}
exports.Action = Action;
// Action name accessor
function getActionName(message) {
    return meta_1.getMeta(message, ACTION);
}
exports.getActionName = getActionName;
function getActionMessage(action) {
    return meta_1.getMetaOwner(ACTION, action);
}
exports.getActionMessage = getActionMessage;
