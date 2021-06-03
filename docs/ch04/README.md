# Components and Hooks

Resources:

- [Intro to Component](https://reactnative.dev/docs/intro-react)
- [Native Components](https://reactnative.dev/docs/intro-react-native-components)
- [Core Component APIs](https://reactnative.dev/docs/components-and-apis)
- [Intro to Hooks](https://reactjs.org/docs/hooks-intro.html)
- [RN State Guide](https://reactnative.dev/docs/intro-react#state)
- [Core Components](https://reactnative.dev/docs/components-and-apis)

## 1 Components

A component is an individual resualble piece of UI. A component has one or more elements. An element is the smallest renderable unit available in React. You can define a component using a class or a function, corresponding to class component and functional component. You should use functional component because it is simpler and more reusable than a class component.

[Intro to Component](https://reactnative.dev/docs/intro-react) has some component examples.

You can define a functional component using a fat arrow function or a normal named function. A named function is recommended because you can define and export the function in a single statement. When you install the VS Code extension `ES7 React/Redux/React-Native/JS snippets`, you can use `rnf + tab` to generate a functional component template.

### 1.1 A Simple Component

For example, you can create a `Cat.js` file that defines a `Cat` component as the following:

```jsx
import React from "react";
import { Text } from "react-native";

export default function Cat() {
  // no need to use () for a single element without nested elements
  return <Text>Hello, I am your cat!</Text>;
}
```

Then you can use it in your `App.js` as the following:

```jsx
// ... the rest of App.js is generated from expo init

import Cat from "./Cat";

export default function App() {
  return (
    <View style={styles.container}>
      <Cat />
    </View>
  );
}
```

### 1.2 JSX

You use JSX syntax to define a functional component that creates a component using a regular JavaScript function. Except the `<Component>` tag syntax and `{expression}` for JavaScript expression, a JSX file is a regular JavaScript file that you can write any regular JavaScript code. The following is a revised version of `Cat.js` that defines a function and two variables and uses them in the `<Text>` element.

```jsx
import React from "react";
import { Text } from "react-native";

function getFullname(first, last) {
  return first + " " + last;
}

const first = "James";
const last = "Bond";

export default function Cat() {
  return <Text>Hello, {getFullname(first, last)}'s cat</Text>;
}
```

### 1.3 Composite Component

A component can be composed from multiple components. For any non-trivial project, tt is a good practice to organize components and their styles into different folders. For example, create `styles.js` and `Cat.js` as following in `components` folder in the project root:

```js
// file: components/styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  catInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default styles;
```

```jsx
// file: components/cat.js
import React from "react";
import { Text, TextInput, View } from "react-native";
import styles from "./styles";

export default function Cat() {
  return (
    <View>
      <Text>Hello, I am ...</Text>
      <TextInput style={styles.catInput} defaultValue="Name me!"></TextInput>
    </View>
  );
}
```

Then you can use the `Cat` component in `App.js` as a regular component such as `<Text>`.

```jsx
// partial file: app.js

import Cat from "./comonents/Cat";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Cat />
      <Cat />
      <Cat />
    </View>
  );
}
```

## 2 Component Props

### 2.1 Core Component Props

You use props to customize RN components. Props is short for “properties" that are passed as function arguments to a component. In JSX syntax, prop values are passed as attribute values. Most RN built-in components can be customized by different props.

```jsx
// partial app.js

// import Image
import { StyleSheet, Text, View, Image } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://reactnative.dev/docs/assets/p_cat1.png" }}
        style={{ width: 200, height: 200 }}
      />
      <Text>Hello, I am your cat!</Text>
    </View>
  );
}
```

### 2.2 Custom Component

To define a customizable functional component (hereafter simply component), you define a function with a `props` parameter.

```js
// partial app.js

function Hello(props) {
  return <Text>Hello, {props.name}</Text>;
}

// arrow-function
const Hello2 = (props) => {
  return <Text>Hello2, {props.name}</Text>;
};

// destruct a prop
function Hello3({ name }) {
  return <Text>Hello3, {name}</Text>;
}

export default function App() {
  return (
    <View style={styles.container}>
      <Hello name="Alice" />
      <Hello2 name="Bob" />
      <Hello3 name="Cindy" />
    </View>
  );
```

The above code defines three components: `Hello`, `Hello2` and `Hello3` that can be composed into other components. It is a good idea to split a complex UI into small parts called components. A small component is easy to design, code, debug and reuse.

In the above code, the two components `Hello` and `Hello2` are defined by two functions. Each function has a `props` parameter. It is an object whose properties are provided by a component that use it. In `Hello3` component, the function argument `({ name })` retrieves the `name` property from the `<Hello3 name="Cindy" />` component. Therefoe the `name` can be used in the component function body directly without the `props` prefix.

### 2.3 Props and Pure Functions

There are two important rules for a component:

- Props are read only. They are used to initialize the component. Don't change any property value.
- A components must act like a pure function with respect to its props.

A `pure` function means for the same input of `props`, it always returns the same output. A pure function doesn't return different values for the same input. For exmaple, `Math.sqrt(x)` is a pure function while `Math.random()` is not a pure funciton.

## 3 Hooks

### 3.1 Motivation

Hooks are new features introduced in React 16.8 on February 6, 2019 and Reactive Native 0.59 on March 12, 2019. They help to eanble functional programming paradigm, i.e., writing applications without using a class.

As a result, They make it possible to write functional components in additional to the traditional class components. Functional components without states are easy to write and simple to reuse because they are fully defined once the function parameters are provided. The so-called presentational components are primarily concerned with displaying data. They are best implmented using functional components.

The primary benefits of class components are state management and component lifecycle methods. Hooks are used to provide the similar features to functional components. The motivation of hooks are:

- A stateful logic can be implmented and tested independently and reused. The stateful behavior can be `hooked` into a functional component.
- Hooks make it possible to write small functions in different categroies: local state management, data subscription or data fetching.
- Classes are confusing for several reasons: verbose syntax, confusing meanings of `this`, complex class hierarchy etc. Functions are much simpler in writing and understanding.

### 3.2 State and Effect

Essentially, hooks are functions that let you "hook into" functional components to provide state and lifecycle features. Two types of commonly used built-in hooks are:

- State hook: a state hook adds a local state to a component. You can have multiple state hook for multiple local states.
- Effect hook: an effect hook is used for a "side effect" operation. Data fetching, data subscription and UI manipulation operations are "side effects" because they are not belong to component rendering but need to be performed when a component is mounted, updated or dismounted.

In addition to the built-in hooks, you can create custom hooks that manage stateful logic and resue them in different components. Due to the functional nature of the hooks, hooks are reused for their logic, not their states. The state of each component is independent.

### 3.3 Lifecycle and Mind Model

A good way to think about hooks and functional components is to think that hooks add some extra hidden contextual varaibles to functional components. **Every time there is a change in the props/states of a functional component, the component is called and rendered with new contextual variables**. It simulates memory for functional components.

## 4 States

There are two common types of data that control a component: `props` and `state`. `props` are set by the parent and they are fixed throughout the lifetime of a component. For data that is going to change, we have to use `state`.

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

The [RN State Guide](https://reactnative.dev/docs/intro-react#state) has more information and an example of a stateful component.

## 5 Core Components

### 5.1 Core Component Caegories

RN provides a set of commonly used [Core Components](https://reactnative.dev/docs/components-and-apis). The core components can be classified into the following categories:

- Basic Components: `<View>`, `<Text>`, `<Image>`, `<TextInput>`, `<ScrollView>` and `<StyleSheet>`.
- User Interface: `<Button>` and `<Switch>`.
- List Views: `<FlatList>`, `<SectoinList>`.
- Android-specific Components.
- iOS Components.
- Others: such as `<Alert>`, `<Modal>`, `StatusBar` etc.

### 5.2 Core Component Examples

- [`<View>`](https://reactnative.dev/docs/view): A container that supports layout with flexbox, style, some touch handling, and accessibility controls. View maps directly to the native view equivalent on whatever platform React Native is running on, whether that is a UIView (iOS), `<div>` (Web), android.view (Android), etc.
- [`<Text>`](https://reactnative.dev/docs/text): a component for display text. It supports nesting, sytling and touch handling.
- [Handling Text Input](https://reactnative.dev/docs/handling-text-input).
- [`<Button>`](https://reactnative.dev/docs/button): A simple clickable button. If you want a cusotmized button, check [Custom Button](https://docs.expo.io/tutorial/button/) to create a custom button using `<TouchableOpacity>`.

In handling text input and button, you define event handlers to handle UI events. It is a common pattern for most UI applications.
