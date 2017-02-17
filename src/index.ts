import {Attribute} from "./attrs";
export * from './attrs';
export * from './types';
export * from './meta';

class EmailAttribute
{

}

const Type = Symbol('type');
const Email = () => Attribute(new EmailAttribute()) as PropertyDecorator;


class Entity
{

    @Attribute(Type, Number)
    public id : number;

}

class User extends Entity
{

    @Email()
    @Attribute(Type, String)
    public email : string;

}