import { Constructable } from "./types";
/**
 * Combination of all decorator types
 */
export declare type Decorators = ClassDecorator & PropertyDecorator & MethodDecorator & ParameterDecorator;
/**
 * Generic decorator for attributes
 * @param {*} data
 * @param {symbol} symbol
 * @returns {(target:any, propertyKey:any, option:any)=>void}
 */
export declare function Attribute(symbol: symbol | any, data?: any): Decorators;
export declare function TypeOf(type: Constructable): PropertyDecorator & ParameterDecorator;
export declare function ListOf(type: Constructable): PropertyDecorator & ParameterDecorator;
