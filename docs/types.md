# TypeInfo API

## Common

- type Key = string | symbol
- enum TypeKind

## TypeInfo

- name : Key
- kind : TypeKind
- constructor(name : Key, type : Function)
- setAttribute(key : Key, data : any) : self
- getAttribute(key : Key) : any
- hasAttribute(key : Key) : bool
