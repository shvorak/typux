# DANGER! Under deep development
# Typux
Core functions for best code

## Metadata

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

```