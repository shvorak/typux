"use strict";
var index_1 = require("./meta/index");
/**
 * Symbol for define attribute in ClassInfo
 *
 * @type {Symbol}
 */
var ACTION = Symbol('typux.action');
/**
 * Actions map
 * Used for reverse plain action object
 * data into message instance
 * @type {{}}
 */
exports.actions = {};
/**
 * Decorator for classes
 *
 * @param {string} name Action name
 * @returns {ClassDecorator}
 * @constructor
 */
function Action(name) {
    return function (target) {
        index_1.metadata.defineClassAttribute(target, ACTION, name);
        exports.actions[name] = target;
    };
}
exports.Action = Action;
/**
 * Get action name from message instance
 *
 * @param {Object} message
 * @returns {string|void}
 */
function getActionName(message) {
    return index_1.metadata.getClassInfo(message).getAttribute(ACTION);
}
exports.getActionName = getActionName;
/**
 * Returns class constructor for message
 *
 * @param {String} action Action name
 * @returns {Function|boolean}
 */
function getActionMessage(action) {
    if (false === exports.actions.hasOwnProperty(action)) {
        return false;
    }
    var info = index_1.metadata.getClassInfo(exports.actions[action]);
    if (false === info.hasAttribute(ACTION, action)) {
        return false; // Hmmm, or exception
    }
    return info.type;
}
exports.getActionMessage = getActionMessage;
