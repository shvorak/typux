export declare function getToken(target: any): symbol;
export declare function getRandomToken(): string;
/**
 * Returns base type except standard types
 *
 * @param {*} target
 * @returns {Function?}
 */
export declare function getParent(target: any): any;
/**
 * Returns type constructor
 *
 * @param {*} target
 * @returns {Function?}
 */
export declare function getConstructor(target: any): any;
