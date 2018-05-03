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
export declare const TypeOf: (type: Constructable<any>) => PropertyDecorator & ParameterDecorator;
export declare const ListOf: (type: Constructable<any>) => PropertyDecorator & ParameterDecorator;
