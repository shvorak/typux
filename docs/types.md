# TypeInfo API

## Common

- type Key = String | Symbol
- enum TypeKind
  - Class
  - Method
  - Propperty
  - Parameter
- type Nullable\<T\>
- interface Constructable\<T\>

## TypeInfo

- name : Key
- kind : TypeKind
- constructor(name : Key, type : Function)
- setAttribute(key : Key, data : Any) : self
- getAttribute(key : Key) : Any
- hasAttribute(key : Key) : Boolean
- ensureAttribute\<T\>(name : key, factory : () => T) : T

### ClassInfo : TypeInfo

- kind : TypeKind.Class
- ctor : Function
- hash : String
- parent : Nullable\<ClassInfo\>
- members : TypeInfo[]
- methods : MethodInfo[]
- ownMethods : MethodInfo[]
- properties : PropertyInfo[]
- ownProperties : PropertyInfo[]
- constructor(ctor : Constructable\<any\>)
- hasMethod(name : Key) : Boolean
- getMethod(name : Key) : MethodInfo
- ensureMethod(name : Key) : MethodInfo
- hasProperty(name : Key) : Boolean
- getProperty(name : Key) : PropertyInfo
- ensureProperty(name : Key) : PropertyInfo

### MethodInfo : TypeInfo

- kind : TypeKind.Method
- parameters : ParameterInfo[]
- constructor(name : Key, type : Function)
- getParameter(index : Number) : ParameterInfo
- hasParameter(index : Number) : Boolean
- ensureParameter(index : Number) : ParameterInfo

### PropertyInfo : TypeInfo

- kind : TypeKind.Property
- readable : Boolean
- writable : Boolean
- constructor(name : Key, descriptor : Nullable\<PropertyDescriptor\>)

### ParameterInfo : TypeInfo
- kind : TypeKind.Parameter
- index : Number
- constructor(index : Number)
 
