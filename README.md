# DANGER! Under deep development
# Typux
Core functions for best code

## Attributes (inline usage)

```ts
const type = Symbol('type');
const validate = Symbol('validate');

class Entity
{

    @Attribute(type, Number)
    public id : number;

}

class User extends Entity
{

    @Attribute(type, String)
    public name : string

    @Attribute(type, String)
    @Attribute(validate, Email)
    public email : string

}

const userInfo = metadata.getClassInfo(User);
console.log(userInfo.getProperties())
// [
//     PropertyInfo(id), <- Entity property
//     PropertyInfo(name), <- User property
//     PropertyInfo(email), <- User property
// ]

userInfo.getProperties(/** Recursive = true by default */).forEah(prop => {
    if (prop.hasAttribute(type /** Symbol */)) { // id = true, name = true, email = true
        prop.getAttribute(type /** Symbol */) // id = Number, name = String, email = String
    }
    if (prop.hasAttribute(validate /** Symbol */)) { // id = false, name = false, email = true
        prop.getAttribute(type /** Symbol */) // id = Error, name = Error, email = Email
    }
})

```