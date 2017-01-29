export declare function getMeta<T>(target: any, symbol: symbol): T;
export declare function hasMeta(target: any, symbol: symbol): boolean;
export declare function getMetaOwner(symbol: symbol, value: any): any;
export declare function defineMeta<T extends Function>(target: any, symbol: symbol, value: any): T;
export declare function getConstructor(input: any): Function;
