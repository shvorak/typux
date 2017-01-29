import {getMetaOwner, getMeta, defineMeta} from "./meta";

const ACTION  = Symbol('action');

// Class Decorator for messages
export function Action(name : string) : ClassDecorator
{
    return function (target: Function) {
        return defineMeta(target, ACTION, name);
    }
}

// Action name accessor
export function getActionName(message : any) : string {
    return getMeta<string>(message, ACTION);
}

export function getActionMessage(action : string) : any
{
    return getMetaOwner(ACTION, action);
}