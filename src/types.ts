export type Nullable<T> = T | null | undefined;

export interface Constructable<T>
{
    new(...args : any[]) : T;
    prototype : T;
}