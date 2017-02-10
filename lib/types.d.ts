/**
 * Nullable type
 * ex. let email : Nullable<string>;
 */
export declare type Nullable<T> = T | null | undefined;
export interface Dictionary<TValue> {
    [index: string]: TValue;
}
/**
 * Constructor type
 * ex. function find<T>(type : Constructable<T>) : T;
 */
export interface Constructable<T> {
    new (...args: any[]): T;
    prototype: T;
}
