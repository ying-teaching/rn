# Components

## Introduction

A component is an individual resualble piece of UI. A component has one or more elements. An element is the smallest renderable unit available in React. You can define a component using a class or a function, corresponding to class component and functional component. You should use functional component because it is simpler and more reusable than a class component.

## Component and Props

To define a functional component (hereafter simply component), you define a function that return some UI building block.

```js
// named function
function Hello(props) {
  return <Text>Hello, {props.name}</Text>;
}

// or arrow-function
const Hello2 = (props) => {
  return <Text>Hello2, {props.name}</Text>;
};

export default function App() {
  return (
    <View>
      <Hello name="Alice" />
      <Hello2 name="Bob" />
    </View>
  );
}
```

The above code defines two components: `<Hello>` and `<Hello2>` that can be composed into other components. It is a good idea to split a complex UI into small parts called components. A small component is easy to design, code, debug and reuse.

In the above code, the two components `<Hello>` and `Hello2` are defined by two functions. Each function has a `props` parameter. It is an object whose properties are provided by a component that use it. In RN, the `props` parameter is called `Props`, short for properties.

There are two important rules for a component:

- Props are read only. They are used to initialize the component. Don't change any property value.
- A components must act like a pure function with respect to its props.

A `pure` function means for the same input of `props`, it always returns the same output. A pure function doesn't return different values for the same input. For exmaple, `Math.sqrt(x)` is a pure function while `Math.random()` is not a pure funciton.

## States

There are two types of data that control a component: props and state. props are set by the parent and they are fixed throughout the lifetime of a component. For data that is going to change, we have to use state.

In general, you should initialize state in the constructor, and then call `setState` when you want to change it. A hook is a special function that lets you “hook into” a component. The `useState` function is a hook that lets you add state to components.

```js
import React, { useState } from "react";
import { Button, Text, View } from "react-native";

const Cat = (props) => {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>
        You pet {props.name} the cat {count} times!
      </Text>
      <Button
        title="Pet Cat"
        onPress={() => {
          setCount(count + 1);
        }}
      />
    </View>
  );
};

const Cafe = () => {
  return (
    <>
      <Cat name="Alice" />
      <Cat name="Bob" />
    </>
  );
};

export default Cafe;
```

The above `useState(0)` call does two things:

- it creates a state variable `count` with an initial value of `0`.
- it creates a function to set that state variable’s value— `setCount`.

The pattern of using `setState` is `[<value-refence>, <setter-function>] = useState(<initialValue>)`. The `useState` returns a pair of value in an array. The assignment is an array destructuring. The left is a name of a state variable, the right is a function name that can set a new value to the state variable. The two names doens't matter, you can name them whatever make sense in the context.

Whenever you call the `<setter-function>` such as `setCount(newValue)`, the component is re-rendered with updated values, i.e., the `<value-reference>` has the current value after applying updates. The `setter-function` can take a simple value or take a function as its arugment. The function argument takes the current value as it argument and returns a new value.

You can use multiple state variables. For example, the following code snippet defines three states:

```js
const [age, setAge] = useState(42);
const [fruit, setFruit] = useState("banana");
const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);
```
