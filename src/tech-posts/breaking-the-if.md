---
slug: "/tech-notes/breaking-the-if-chain"
date: "2020-12-01"
title: "Breaking the IF chain"
summary: "Just a nicer way of dealing with conditions when it comes to ternaries hell."
---

I can only assume that *all* already came across some super "complex" code that had a whole bunch of if and elses, to get from data from A or B or C or D or even to render a ComponentA or ComponentB or even a ComponentC.

The more users we have the more complex our permission system and our feature system will get, what will then be reflected in our UI in some way or the other.

Just to illustrate what I am going to cover here
```tsx
function Component({ accessLevel }: ComponentProps) {
  return accessLevel === "restricted" ? (
    <ComponentA />
  ) : accessLevel === "regular" ? (
    <ComponentB />
  ) : (
    <ComponentC />
  );
}
```

As you can see this can get messy super fast, and understanding when a ternary ends and when the following one starts is a bit of a challenge.

## Looking it from a different angle

What if we stop seeing our use cases as conditions and boolean expressions but rather different types of the same view, and what do I mean by that?

I mean that we can see the `accessLevel` *restricted* being a named view and not wrapped in if/else statements.

That way we could end up with something like this:
```ts
const accessViews: { [key as string]: ReactComponent } = {
  'restricted': ComponentA,
  'regular': ComponentB,
  'full-access': ComponentC,
}
```

And then our component would get a more readable and easy to understand return:
```tsx
function Component({ accessLevel }: ComponentProps) {
  const { [accessLevel]: ComponentView }: ReactComponent = accessViews;
  return <ComponentView />
  );
}
```
That way we don't really need to use conditions but rather a key value pair based on our different access levels, that way we can introduce a lot more access level variations and our code would handle them in the same manner.

As this an `object` the we access those values is extremely fast because that is hash based access, so a direct access, so it as fast as the previous code.

## What about specific arguments

One can only trust that all those variations have the same API, and that would be definitely never happen. So how to get around that in this particular example of ours.

The way I purpose to tackle this is to create a method, something like `getProps` in each of those components, but the focal point here is that the method should live in the consumer file and not in the Component file, because as I am going to use that component in multiple places that method will vary for sure.

Let's make our first example a little more brittle
```tsx
import ComponentA from './ComponentA'
import ComponentB from './ComponentB'
import ComponentC from './ComponentC'

function Component({
  accessLevel,
  age,
  birthday,
  name,
  lastname,
  city,
  region,
  country,
}: ComponentProps) {
  return accessLevel === "restricted" ? (
    <ComponentA
      age={age}
      name={name}
      backgroundColor={country === "BR" ? "green" : "grey"}
    />
  ) : accessLevel === "regular" ? (
    <ComponentB
      age={age}
      name={name}
      lastname={lastname}
      country={flags[country]}
      icon={age > 55 ? OwlIcon : PuppyIcon}
    />
  ) : (
    <ComponentC
      age={age}
      name={name}
      lastname={lastname}
      city={city}
      region={region}
      country={flags[country]}
    />
  );
}
```

As we can see now we have all these variants in terms of props, our return statement clearly got way more noisy and now I need to figure out a way to incorporate that with my object based view system.

Let's experiment the `[key]: value` approach that I suggested with the new `getProps` method.

```tsx
import ComponentA from "./ComponentA";
import ComponentB from "./ComponentB";
import ComponentC from "./ComponentC";

const accessViews: { [key as string]: ReactComponent } = {
  restricted: ComponentA,
  regular: ComponentB,
  "full-access": ComponentC,
};

ComponentA.getProps = ({ age, name, country }: ComponentProps): : ComponentAProps => ({
  age,
  name,
  backgroundColor: country === "BR" ? "green" : "grey",
});

ComponentB.getProps = ({ age, name, lastname, country }: ComponentProps): : ComponentBProps => ({
  age,
  name,
  lastname,
  country: flags[country],
  icon: age > 55 ? OwlIcon : PuppyIcon,
});

ComponentC.getProps = ({ age, name, lastname, country, region, city }: ComponentProps): ComponentCProps => ({
  age,
  name,
  lastname,
  country,
  region,
  city,
  country: flags[country],
});

function Component({ accessLevel, ...props }: ComponentProps) {
  const { [accessLevel]: ComponentView }: ReactComponent = accessViews;
  return <ComponentView {...ComponentView.getProps(props)} />
}
```

As you can see each of those `Components` got its own `getProps` method, which will result on its ows specific props that are not relevant to the other components.

Our return statement is still super small, a one liner, and we moved all the logic that we had there to a specific place that is related just to that component.

Of course this is a bit more to process than just an in/else which for a lot of situations will be the perfect fit, but *if/else* statement cannot hold more complex use cases where we have a lot of different views for the same Component.

## Disclosure

This is by no means the ideal solution for all your views, but it definitely can make them scale a little better.
Of course there are even more we can do to this to make it even smarter, but for the purpose of this article I tried to keep it simple.

Hope you enjoyed it :) 