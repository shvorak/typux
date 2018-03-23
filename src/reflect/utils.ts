const SIGN = Symbol('typux.reflect.token');

export function getToken(target : any) : symbol
{
    if (typeof target === 'symbol') {
        return target;
    }
    let constructor = getConstructor(target);
    if (constructor == null) {
        throw new Error(`Can't retrieve constructor from value "${target}"`);
    }

    if (constructor.hasOwnProperty(SIGN) === false) {
        constructor[SIGN] = Symbol(`typux.reflect.${getRandomToken()}`)
    }
    return constructor[SIGN];
}

export function getRandomToken()
{
    return Math.random().toString(36).substr(2);
}

/**
 * Returns base type except standard types
 *
 * @param {*} target
 * @returns {Function?}
 */
export function getParent(target : any)
{
    let constructor = Object.getPrototypeOf(getConstructor(target).prototype).constructor;
    if (constructor === Object || constructor === Function) {
        return void 0;
    }

    return constructor;
}

/**
 * Returns type constructor
 *
 * @param {*} target
 * @returns {Function?}
 */
export function getConstructor(target : any)
{
    if (typeof target === 'function') {
        return target;
    }
    if (typeof target === 'object' && target !== null) {
        return target.constructor;
    }
    return void 0;
}