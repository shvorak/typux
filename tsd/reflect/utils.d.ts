export declare function getToken(target: any): symbol;
export declare function getRandomToken(): string;
/**
 * Returns base type except standard types
 *
 * @param {*} target
 * @returns {Function?}
 */
export declare function getParent(target: any): any;
export declare function hasMetadata(name: string, target: any, property: string | symbol): boolean;
export declare function getMetadata(name: string, target: any, property: string | symbol): any;
/**
 * Returns type constructor
 *
 * @param {*} target
 * @returns {Function?}
 */
export declare function getConstructor(target: any): any;
