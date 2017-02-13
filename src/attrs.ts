import {metadata} from "./meta/index";

///////
// Symbols for define attribute in ClassInfo
///////
export const ACTION  = Symbol('typux.action');

/**
 * Generic decorator for attributes
 * @param {*} data
 * @param {symbol} symbol
 * @returns {(target:any, propertyKey:any, option:any)=>void}
 */
export function Attribute(symbol : symbol, data : any) : ClassDecorator&PropertyDecorator&MethodDecorator&ParameterDecorator
{
    return (target, name?, option?) => {

        // TODO : Add custom attribute class support (auto generated symbol)

        if (typeof target === 'function') {
            // Class decorator
            metadata.defineClassAttribute(target, symbol, data);
        } else {
            if (typeof option === 'number') {
                // Argument decorator
                throw new Error('Attribute decorator doesn\'t support arguments right now');
            } else if (option === void 0) {
                // Property decorator
                metadata.definePropertyAttribute(target, name, symbol, data);
            } else if (option === null || typeof option === 'object' && option !== null) {
                // Method decorator, Getter/Setter
                // TODO : Split methods and getters/setters definition
                metadata.defineMethodAttribute(target, name, symbol, data);
                // throw new Error('Attribute decorator doesn\'t support methods right now');
            } else {
                throw new Error('Invalid Attribute decorator call');
            }
        }
    }
}

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
 */
export function Action(name : string) : ClassDecorator
{
    return function (target : Function) {
        metadata.defineClassAttribute(target, ACTION, name);
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
    let info = metadata.getClassInfo(message);

    return info.hasAttribute(ACTION)
        ? info.getAttribute(ACTION)
        : info.name;
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
    let info = metadata.getClassInfo(actions[action]);
    if (false === info.hasAttribute(ACTION, action)) {
        return false; // Hmmm, or exception
    }
    return info.type;
}