# Атрибуты
Typux предоставляет единый функционал для добавления метаданных к классам, свойствам, методам и аргументам методов (далее - элементы ООП)
благодаря чему добавление мета информации страновиться очень простым.

Существует два способа добавления атрибутов:
- используя символы (Symbol) - простые атрибуты
- используя собственные классы - комплексные

## Простые атрибуты
Для указания добавления атрибута к элементам ООП используется единый декоратор

```ts
import {Attribute} from 'typux';

const NAME = Symbol('my.name');
const TYPE = Symbol('my.type');

@Attribute(NAME, 'User')
class User
{

    @Attribute(TYPE, String)
    public email : string;
    
    @Attribute(TYPE, Number)
    public id : number;
   
    public constructor(@Attribte(TYPE, String) name : string) {
    
    }
    
}

```

Для упрощения написания кода и ограничения использования тех или иных типов аттрибутов можно использовать собственные (уточненные) декораторы

```ts
import {Attribute} from 'typux';

const TYPE = Symbol('my.type');
const Type = (type : Function) => Attribute(TYPE, type) as PropertyDecorator&ParameterDecorator

class User
{

    ....
    
    @Type(String)
    public email : string;

    ....
}
```

## Комплексные 
Для более сложного функционала можно использовать Комплексные аттрибуты что позволяет давать разработчику расширять изначальный функционал атрибутов.
Рассмотрим пример реализации валидации свойств класса

validator.ts
```ts
export abstract class Validator
{
    abstract validate(value : any) : boolean;
}
```

rules.ts
```ts
import {isEmail} from './utils';
import {Validator} from './validator';

// Класс атрибута
export class EmailValidator extends Validator
{
    validate(value : any) : boolean {
        return isEmail(value);
    }
}

// Экспортируем наш декоратор
export const Email = Attribute(new EmailValidator()) as PropertyDecorator;
```

И теперь используем его в наших классах

```ts
import {Email} from './rules';

class User
{
    ....
    @Email
    public email : string;
    ....
}
```

Теперь мы можем реализовать базовый функционал валидатора используя `reflect`

```ts
import {reflect} from 'typux';

const user = new User('admin@admin.com');

// Получаем информацию о классе по его инстансу 
// (в качестве аргумента можно использовать прототип класса, его конструктор или инстанс)
const info = reflect.getClassInfo(user);

// Фильтруем свойства класса
const props = info.getProperties().filter(x => x.hasAttribute(Validator));

// Производим валидацию
props.forEach(prop => {
    let isValidProp = prop.getAttributes(Validator)
        .reduce((valid, validator) => valid & validator.validate(user[prop.name]), true);
})
```

