---
slug: "/tech-notes/fancy-typescript"
date: "2020-10-30"
title: "Fancy Typescript"
summary: "Personal notes that I took during the Fancy Typescript Workshop that occurred during the React Conf 2020."
---

This repo contains notes taken during the Advanced, Fancy Typescript by Michel Westsrate.

## Types
How to declare a basic type with a function in it and a dynamic one:
```ts
type MyType = {
	typedFb: (arg1: string, arg2: number) => number;
	name: string;
	age: number;
	[key: string]: any;
}
```

Using tuples are cool, you can specify how many items it returns and in which position.
```ts
useState(initalizer: number) : [number, Function]
```
## Function Overloading
- You can have different signatures for the same function, e.g._
    - Function fn(value: string): string
    - Function fn(value: number): Date
    - Function fn(argument: string | number): string | date { }

## Cool types
Mixed typed array
	- cont array: (number | string) = [1, ‘franco’]

Non-null assertion operator: const f = var! ( the exclamation mark )

Intersections, like extends for Interfaces: `TypeA & TypeB` = must comply with both type specs

Discriminated Unions, you can set const keys on your Interface/Type

## Shorthand declaration for classes
```ts
class MyClass {
	constructor(public a: string, public b: Date) {}
}
```
Automatically declares classes properties a and b and assign it at the constructor level when new MyClass

## Generics
Generics, it automatically assumes a type as you call the method. If you have N args you can have N Generic types.

A funny way to use it is with extends so it can have a basic set of props, such as:
```ts
function myFn<T extends { length: number }>(var: T): T
```

## Special types
`unknown`: First you need to cast it to be able to use it

`any`: It can be ANYTHING, no type check at all

`never`: it is automatically assigned to a piece of code that is “unreachable”, like when using Union operators


## Utilities
To access SubTypes you can just access it by key, e.g.:
```ts
type NestedType = {
	name: string
	age: number
}

type SuperType = {
	nested: NestedType
}

const user = SuperType[‘nested’]
```

ReturnType utility is handful for figuring out the typeof of a method, like you are using an external method and help you to avoid copying the method return type in more than one place

KeyOf operator is a way of extracting keys of a given type to create unions
```ts
type CloneType<BASE> = {
	[PROP in keyof BASE]: BASE[PROP]
}

type Record<K extends keyof any, T> = {
	[P in K]: T
}
```

*These are just personal notes*

Exercises resolution by me: https://stackblitz.com/@FrancoSirena

Refer to the slides to see it in depth: https://ts121020.surge.sh/#1
