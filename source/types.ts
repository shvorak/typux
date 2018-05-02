
export type Func0<TOut> = () => TOut;
export type Func1<TOne, TOut> = (value1 : TOne) => TOut;
export type Func2<TOne, TTwo, TOut> = (value1 : TOne, value2 : TTwo) => TOut;

export type Action<T> = (value : T) => any;

/**
 * Nullable type
 * ex. let email : Nullable<string>;
 */
export type Nullable<T> = T | null | undefined;

/**
 * Simple dictionary interface
 */
export interface Dictionary<TValue>
{
    [index : string] : TValue;
}

/**
 * Constructor type
 * ex. function find<T>(type : Constructable<T>) : T;
 */
export interface Constructable<T>
{
    new(...args : any[]) : T;

    prototype : T;
}