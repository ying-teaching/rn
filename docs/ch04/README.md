# Components and Hooks

Resources:

- [Intro to Component](https://reactnative.dev/docs/intro-react)
- [Native Components](https://reactnative.dev/docs/intro-react-native-components)
- [Core Component APIs](https://reactnative.dev/docs/components-and-apis)

## 1 Introduction

A component is an individual resualble piece of UI. A component has one or more elements. An element is the smallest renderable unit available in React. You can define a component using a class or a function, corresponding to class component and functional component. You should use functional component because it is simpler and more reusable than a class component.

[Intro to Component](https://reactnative.dev/docs/intro-react) has some component examples.

## 2 Hooks

### 2.1 Motivation

Hooks are new features introduced in React 16.8 on February 6, 2019 and Reactive Native 0.59 on March 12, 2019. They help to eanble functional programming paradigm, i.e., writing applications without using a class.

As a result, there are two ways of writing components in RN: functional components and class components. Functional components without states are easy to write and simple to reuse because they are fully defined once the function parameters are provided. The so-called presentational components are primarily concerned with displaying data. They are best implmented using functional components.

The primary benefits of class components are state management and component lifecycle methods. Hooks are used to provide the similar features to functional components. The motivation of hooks are:

- A stateful logic can be implmented and tested independently and reused. The stateful behavior can be `hooked` into a functional component.
- Hooks make it possible to write small functions in different categroies: local state management, data subscription or data fetching.
- Classes are confusing for several reasons: verbose syntax, meanings of `this`, class hierarchy etc. Functions are much simpler in writing and understanding.

### 2.2 State and Effect

Essentially, hooks are functions that let you "hook into" functional components to provide state and lifecycle features. Two types of commonly used built-in hooks are:

- State hook: a state hook adds a local state to a component. You can have multiple state hook for multiple local states.
- Effect hook: an effect hook is used for a "side effect" operation. Data fetching, data subscription and DOM manipulation operations are "side effects" because they are not belong to component rendering but need to be performed when a component is mounted, updated or dismounted.

In addition to the built-in hooks, you can create custom hooks that manage stateful logic and resue them in different components. Due to the functional nature of the hooks, hooks are reused for their logic, not their states. The state of each component is independent.

### 2.3 Lifecycle and Mind Model

A good way to think about hooks and functional components is to think that hooks add some extra hidden contextual varaibles to functional components. Every time there is a change in the props/states of a functional component, the component is called and rendered with new contextual variables. It simulates memory for functional components.

## 3 Component and Props

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

## 4 States

There are two types of data that control a component: `props` and `state`. `props` are set by the parent and they are fixed throughout the lifetime of a component. For data that is going to change, we have to use `state`.

In general, you should initialize state at the top of a function component, and then call `setState` when you want to change it. A hook is a special function that lets you “hook into” a component. The `useState` function is a hook that lets you add state to components.

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

## 5 Core Components

RN provides a set of commonly used [Core Components](https://reactnative.dev/docs/components-and-apis). The core components can be classified into the following categories:

- Basic Components: `<View>`, `<Text>`, `<Image>`, `<TextInput>`, `<ScrollView>` and `<StyleSheet>`.
- User Interface: `<Button>` and `<Switch>`.
- List Views: `<FlatList>`, `<SectoinList>`.
- Android-specific Components.
- iOS Components.
- Others: such as `<Alert>`, `<Modal>`, `StatusBar` etc.

## 6 Core Component Examples

Below are some commonly used core components.

- [`<View>`](https://reactnative.dev/docs/view): A container that supports layout with flexbox, style, some touch handling, and accessibility controls. View maps directly to the native view equivalent on whatever platform React Native is running on, whether that is a UIView (iOS), `<div>` (Web), android.view (Android), etc.
- [`<Text>`](https://reactnative.dev/docs/text): a component for display text. It supports nesting, sytling and touch handling.
- [`<TextInput>`](https://reactnative.dev/docs/textinput). [Handling Text Input](https://reactnative.dev/docs/handling-text-input) has another example.
- [`<Image>`](https://reactnative.dev/docs/image): A React component for displaying different types of images, including network images, static resources, temporary local images, and images from local disk, such as the camera roll.
- [`<Button>`](https://reactnative.dev/docs/button): A simple clickable button. If you want a cusotmized button, check [Custom Button](https://docs.expo.io/tutorial/button/) to create a custom button using `<TouchableOpacity>`.
