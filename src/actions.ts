import {getMetaOwner, getMeta, defineMeta} from "./meta";
import {defineClassAttribute, getClassInfo, definePropertyAttribute} from "./meta/meta";

const ACTION  = Symbol('action');
const TYPE  = Symbol('type');

// Class Decorator for messages
export function Action(name : string) : ClassDecorator
{
    return function (target: Function) {
        defineClassAttribute(target, ACTION, name);
    }
}

export function Type(type : any) : PropertyDecorator {
    return function (target: Object, property: string) {
        definePropertyAttribute(target, property, TYPE, type)
    }
}

// Action name accessor
export function getActionName(message : any) : string {
    return getClassInfo(message).getAttribute(ACTION);
}

export function getActionMessage(action : string) : any
{
    return getMetaOwner(ACTION, action);
}