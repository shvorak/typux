"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reflect_1 = require("./reflect");
/**
 * Generic decorator for attributes
 * @param {*} data
 * @param {symbol} symbol
 * @returns {(target:any, propertyKey:any, option:any)=>void}
 */
function Attribute(symbol, data) {
    return function (target, name, option) {
        if (typeof target === 'function') {
            if (name) {
                // Static property decorator
                reflect_1.reflect.definePropertyAttribute(target, name, symbol, data);
            }
            else {
                // Class decorator
                reflect_1.reflect.defineClassAttribute(target, symbol, data);
            }
        }
        else {
            if (typeof option === 'number') {
                // Parameter decorator
                reflect_1.reflect.defineParameterAttribute(target, name, option, symbol, data);
            }
            else if (option === void 0) {
                // Property decorator
                reflect_1.reflect.definePropertyAttribute(target, name, symbol, data);
            }
            else if (option === null || typeof option === 'object' && option !== null) {
                // Method decorator or Getter/Setter
                if (typeof option.value === 'function') {
                    reflect_1.reflect.defineMethodAttribute(target, name, symbol, data);
                }
                else {
                    reflect_1.reflect.definePropertyAttribute(target, name, symbol, data);
                }
            }
            else {
                throw new Error('Invalid Attribute decorator call');
            }
        }
    };
}
exports.Attribute = Attribute;
//# sourceMappingURL=attrs.js.map