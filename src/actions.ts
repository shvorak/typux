import {defineClassAttribute, getClassInfo} from "./meta/meta";

/**
 * Symbol for define attribute in ClassInfo
 *
 * @type {Symbol}
 */
const ACTION  = Symbol('typux.action');

/**
 * Actions map
 * Used for reverse plain action object
 * data into message instance
 * @type {{}}
 */
export const actions = {};

/**
 * Decorator for classes
 *
 * @param {string} name Action name
 * @returns {ClassDecorator}
 * @constructor
 */
export function Action(name : string) : ClassDecorator
{
    return function (target: Function) {
        defineClassAttribute(target, ACTION, name);
        actions[name] = target;
    }
}

/**
 * Get action name from message instance
 *
 * @param {Object} message
 * @returns {string|void}
 */
export function getActionName(message : any) : string {
    return getClassInfo(message).getAttribute(ACTION);
}

/**
 * Returns class constructor for message
 *
 * @param {String} action Action name
 * @returns {Function|boolean}
 */
export function getActionMessage(action : string) : any
{
    if (false === actions.hasOwnProperty(action)) {
        return false;
    }
    let info = getClassInfo(actions[action]);
    if (false === info.hasAttribute(ACTION, action)) {
        return false; // Hmmm, or exception
    }
    return info.type;
}