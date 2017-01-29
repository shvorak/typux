const store : any = {};

export function getMeta<T>(target : any, symbol : symbol) : T
{
    let constructor = getConstructor(target);
    if (constructor.hasOwnProperty(symbol)) {
        return constructor[symbol];
    }
    return void 0;
}

export function hasMeta(target : any, symbol : symbol) : boolean
{
    return getConstructor(target).hasOwnProperty(symbol)
}

export function getMetaOwner(symbol : symbol, value : any) : any
{
    if (store.hasOwnProperty(symbol) && store[symbol].hasOwnProperty(value)) {
        return store[symbol][value]
    }
    return void 0;
}

export function defineMeta<T extends Function>(target : any, symbol : symbol, value : any) : T
{
    if (store.hasOwnProperty(symbol) === false) {
        store[symbol] = {};
    }
    store[symbol][value] = target;
    target[symbol] = value;

    return target;
}

export function getConstructor(input : any) : Function
{
    if (input == null) {
        throw new Error('Can\'t return constructor from undefined');
    }
    if (typeof input === 'function') {
        return input;
    }
    if (input.constructor) {
        return getConstructor(input.constructor);
    }
}