import {reflect} from "./reflect/index";
import {getParent} from "./reflect/utils";
export * from './attrs';
export * from './types';
export * from './meta';

const test = Symbol('test');

class Base
{

}

class Test extends Base
{


}

abstract class Validator
{
    abstract validate(value : any);
}
class EmailValidator extends Validator
{
    validate(value: any) {
    }
}
class EnumValidator extends Validator
{

    private _list: Object;

    constructor(list : Object) {
        super();
        this._list = list;
    }

    validate(value: any) {
    }
}

let type = reflect.getTypeInfo(Test);

type.setAttribute(test, 1);
type.setAttribute(new EnumValidator({}));

type.setAttribute(new EmailValidator());

console.log(type == reflect.getClassInfo(type.token));
console.log(type.getAttribute(test));
console.log(type.getAttributes(Validator));
// console.log(type);
// console.log(reflect.getTypeInfo(Test.prototype));
// console.log(reflect.getTypeInfo(new Test()));

// class EmailAttribute
// {
//
// }
//
// const Type = Symbol('type');
// const Email = () => Attribute(new EmailAttribute()) as PropertyDecorator;
//
//
// class Entity
// {
//
//     @Attribute(Type, Number)
//     public id : number;
//
// }
//
// class User extends Entity
// {
//
//     @Email()
//     @Attribute(Type, String)
//     public email : string;
//
// }
// let userType = metadata.getTypeInfo(User);
// console.log(userType);