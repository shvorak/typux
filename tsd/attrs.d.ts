export declare const ACTION: symbol;
/**
 * Actions map
 * Used for reverse plain action object
 * data into message instance
 * @type {{}}
 */
export declare const actions: {};
/**
 * Decorator for classes
 *
 * @param {string} name Action name
 * @returns {ClassDecorator}
 */
export declare function Action(name: string): ClassDecorator;
/**
 * Get action name from message instance
 *
 * @param {Object} message
 * @returns {string|void}
 */
export declare function getActionName(message: any): string;
/**
 * Returns class constructor for message
 *
 * @param {String} action Action name
 * @returns {Function|boolean}
 */
export declare function getActionMessage(action: string): any;
