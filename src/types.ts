/**
 * Nullable type
 * ex. let email : Nullable<string>;
 */
export type Nullable<T> = T | null | undefined;

/**
 * Constructor type
 * ex. function find<T>(type : Constructable<T>) : T;
 */
export interface Constructable<T>
{
    new(...args : any[]) : T;
    prototype : T;
}