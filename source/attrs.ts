import {reflect, typeKey} from "./reflect";
import {Type} from "./reflect/types";
import {Constructable} from "./types";

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
        if (typeof target === 'function') {
            if (name) {
                // Static property decorator
                reflect.definePropertyAttribute(target, name, symbol, data);
            } else {
                // Class decorator
                reflect.defineClassAttribute(target, symbol, data);
            }
        } else {
            if (typeof option === 'number') {
                // Parameter decorator
                reflect.defineParameterAttribute(target, name, option, symbol, data);
            } else if (option === void 0) {
                // Property decorator
                reflect.definePropertyAttribute(target, name, symbol, data);
            } else if (option === null || typeof option === 'object' && option !== null) {
                // Method decorator or Getter/Setter
                if (typeof option.value === 'function') {
                    reflect.defineMethodAttribute(target, name, symbol, data);
                } else {
                    reflect.definePropertyAttribute(target, name, symbol, data);
                }
            } else {
                throw new Error('Invalid Attribute decorator call');
            }
        }
    }
}


export function TypeOf(type: Constructable) : PropertyDecorator & ParameterDecorator {
    return Attribute(typeKey, new Type(type));
}

export function ListOf(type : Constructable) : PropertyDecorator & ParameterDecorator {
    return Attribute(typeKey, new Type(type, true));
}