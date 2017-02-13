export * from './info';
import { Constructable } from "../types";
import { ClassInfo, PropertyInfo } from "./info";
export declare const metadata: {
    getClasses: () => ClassInfo[];
    getClassInfo: <T>(type: T | Constructable<T>) => ClassInfo;
    getClassInfoByHash: (hash: string) => ClassInfo;
    getPropertyInfo: (target: Object, property: string | symbol) => PropertyInfo;
    defineClassAttribute: (target: any, name: symbol, data: any) => void;
    defineMethodAttribute: (target: any, property: string | symbol, name: symbol, data: any) => void;
    definePropertyAttribute: (target: any, property: string | symbol, name: symbol, data: any) => void;
    defineParameterAttribute: (target: any, property: string | symbol, index: number, name: symbol, data: any) => void;
};
/**
 * Simple random string function
 *
 * @returns {string}
 */
export declare function getRandomHash(): string;
