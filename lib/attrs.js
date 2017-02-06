"use strict";
var index_1 = require("./meta/index");
///////
// Symbols for define attribute in ClassInfo
///////
exports.ACTION = Symbol('typux.action');
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
 */
function Action(name) {
    return function (target) {
        index_1.metadata.defineClassAttribute(target, exports.ACTION, name);
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
    var info = index_1.metadata.getClassInfo(message);
    return info.hasAttribute(exports.ACTION)
        ? info.getAttribute(exports.ACTION)
        : info.name;
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
    if (false === info.hasAttribute(exports.ACTION, action)) {
        return false; // Hmmm, or exception
    }
    return info.type;
}
exports.getActionMessage = getActionMessage;
