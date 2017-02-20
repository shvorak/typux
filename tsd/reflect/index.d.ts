import { ClassInfo, MemberName } from "./types";
export declare class reflect {
    static readonly classes: ClassInfo[];
    static getTypeInfo(target: any, property?: MemberName, parameter?: number): any;
    static getClassInfo(target: any | symbol): any;
    static defineClassAttribute(target: any, type: MemberName, value?: any): void;
    static defineMethodAttribute(target: any, name: MemberName, type: symbol | any, value?: any): void;
    static definePropertyAttribute(target: any, name: MemberName, type: symbol | any, value?: any): void;
    static defineParameterAttribute(target: any, name: MemberName, index: number, type: symbol | any, value?: any): void;
}
