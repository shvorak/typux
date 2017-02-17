import {metadata} from "./meta/index";

/**
 * Combination of all decorator types
 */
export type Decorators = ClassDecorator&PropertyDecorator&MethodDecorator&ParameterDecorator;

/**
 * Generic decorator for attributes
 * @param {*} data
 * @param {symbol} symbol
 * @returns {(target:any, propertyKey:any, option:any)=>void}
 */
export function Attribute(symbol : symbol | any, data? : any) : Decorators
{
    return (target, name?, option?) => {

        // TODO : Add custom attribute class support (auto generated symbol)
        if (typeof target === 'function') {
            // Class decorator
            metadata.defineClassAttribute(target, symbol, data);
        } else {
            if (typeof option === 'number') {
                // Parameter decorator
                metadata.defineParameterAttribute(target, name, option, symbol, data);
            } else if (option === void 0) {
                // Property decorator
                metadata.definePropertyAttribute(target, name, symbol, data);
            } else if (option === null || typeof option === 'object' && option !== null) {
                // Method decorator or Getter/Setter
                if (typeof option.value === 'function') {
                    metadata.defineMethodAttribute(target, name, symbol, data);
                } else {
                    metadata.definePropertyAttribute(target, name, symbol, data);
                }
            } else {
                throw new Error('Invalid Attribute decorator call');
            }
        }
    }
}