export * from './info';
import { ClassInfo, TypeInfo } from "./info";
export declare const metadata: {
    getClasses: () => ClassInfo[];
    getTypeInfo: (type: any, property?: string | symbol, parameterIndex?: number) => TypeInfo;
    getClassInfoByHash: (hash: string) => ClassInfo;
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
