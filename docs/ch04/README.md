# Components and Hooks

## 1 Components

A component defines an individual resualble piece of UI. A component is composable that it can have one or more sub components. A component is the smallest renderable unit available in React. You can define a component using a class or a function, corresponding to **class component** and **functional component**. You should use functional component because it is simpler and more reusable than a class component.

You can define a functional component using a fat arrow function or a normal named function. They are equivalent definitions.

When you install the VS Code extension `ES7 React/Redux/React-Native/JS snippets`, you can use `rnf + tab` to generate a functional component template. To generate a functional component template with a style, use `rnfs + tab`.

### 1.1 A Simple Component

For example, you can create a `Cat.js` file that defines a `Cat` component as the following:

```jsx
import React from 'react';
import { Text } from 'react-native';

export default function Cat() {
  // no need to use () for a single element without nested elements
  return <Text>Hello, I am your cat!</Text>;
}
```

Then you can use it in your `App.js` as the following:

```jsx
// ... the rest of App.js is generated from expo init

import Cat from './Cat';

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
import React from 'react';
import { Text } from 'react-native';

function getFullname(first, last) {
  return first + ' ' + last;
}

const first = 'James';
const last = 'Bond';

export default function Cat() {
  return <Text>Hello, {getFullname(first, last)}'s cat</Text>;
}
```

### 1.3 Composite Component

A component can be composed from multiple components. For any non-trivial project, it is a good practice to organize components and their styles into different folders. For example, create `styles.js` and `Cat.js` as following in `components` folder in the project root:

```js
// file: components/styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  catInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default styles;
```

```jsx
// file: components/cat.js
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from './styles';

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

import Cat from './comonents/Cat';

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

### 1.4 Component Props

You use props to customize RN components. Props is short for “properties" that are passed as function arguments to a component. In JSX syntax, prop values are passed as attribute values. Most RN built-in components can be customized by different props.

```jsx
// partial app.js

// import Image
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://reactnative.dev/docs/assets/p_cat1.png' }}
        style={{ width: 200, height: 200 }}
      />
      <Text>Hello, I am your cat!</Text>
    </View>
  );
}
```

There are two important rules for props of a component:

- Props are read only. They are used to initialize the component. Don't change any property value.
- A components must act like a pure function with respect to its props.

A `pure` function means for the same input of `props`, it always returns the same output. A pure function doesn't return different values for the same input. For exmaple, `Math.sqrt(x)` is a pure function while `Math.random()` is not a pure funciton.

## 2 Core Component

RN provides a set of commonly used [Core Components](https://reactnative.dev/docs/components-and-apis). The community has many open source UI libraries. [React Native Elements](https://reactnativeelements.com/) and [NativeBase](https://nativebase.io/) have many good cross-platform components.

### 2.1 Core Component Caegories

The core components can be classified into the following categories:

- Basic Components: `<View>`, `<Text>`, `<Image>`, `<TextInput>`, `<ScrollView>` and `<StyleSheet>`.
- User Interface: `<Button>` and `<Switch>`.
- List Views: `<FlatList>`, `<SectoinList>`.
- Android-specific Components.
- iOS Components.
- Others: such as `<Alert>`, `<Modal>`, `StatusBar` etc.

### 2.2 Core Component Examples

- [`<View>`](https://reactnative.dev/docs/view): A container that supports layout with flexbox, style, some touch handling, and accessibility controls. View maps directly to the native view equivalent on whatever platform React Native is running on, whether that is a UIView (iOS), `<div>` (Web), android.view (Android), etc.
- [`<Text>`](https://reactnative.dev/docs/text): a component for display text. It supports nesting, sytling and touch handling.
- [Image](https://reactnative.dev/docs/image).
- [`<Button>`](https://reactnative.dev/docs/button): A simple clickable button. If you want a cusotmized button, use [Pressable](https://reactnative.dev/docs/pressable).

To handle button click, you define event handlers to handle UI events. It is a common pattern for most UI applications.

### 2.3 Custom Component

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

## 3 Hook Concept

### 3.1 Props and States

To understand the hook concept, you need to understand what constitute a component. The primary purpose of a component is to render data to a screen. A component has two kinds of data: the data passed by its parent and the data used internally. Props are data passed by its parent when it is created and stay the same unless it is changed by its parent.

The second type of data is the data used/managed internally, called **states** and may be changed by user interaction, API calls, time elapse or other events. There are two sources of state data:

- created and managed internally. For example, a click counter component may increase the counter whenever a user clicks a button. This value should not be passed by its parent because it is the responsibility for the click counter component to manage the conter.
- fetched from outside but managed internally. A commmon example is that a component may fetch data from an external web site and display the result.

Once created by its paranet and rendered as a nested element, the component gets immutable props from its parent but manages its states independently. This independency is an essential feature of composable component. Two important benefits are:

- For developers, components can be development and used easilly like a Lego block.
- For apps, components are re-rendered only when their states change. This signficantly improves the runtime performance because there is no need to re-rendere components whose states are not changed.

It is important to remember this fact: **every time there is a change in any prop/state of a functional component, the component is called and rendered with changed value**.

### 3.2 Use States in Functions

A good way to think about hooks and functional components is to think that hooks add some extra hidden contextual varaibles (the states) to functional components.

Hooks are new features introduced in React 16.8 on February 6, 2019 and Reactive Native 0.59 on March 12, 2019. They help to eanble functional programming paradigm, i.e., writing applications without using a class.

As a result, They make it possible to write functional components in additional to the traditional class components. Functional components without states are easy to write and simple to reuse because they are fully defined once the function parameters are provided. The so-called presentational components are primarily concerned with displaying data. They are best implmented using functional components.

The primary benefits of class components are state management and component lifecycle methods. Hooks are used to provide the similar features to functional components. The motivation of hooks are:

- A stateful logic can be implmented and tested independently and reused. The stateful behavior can be `hooked` into a functional component.
- Hooks make it possible to write small functions in different categroies: local state management, data subscription or data fetching.
- Classes are confusing for several reasons: verbose syntax, confusing meanings of `this`, complex class hierarchy etc. Functions are much simpler in writing and understanding.

### 3.2 State and Effect

Essentially, hooks are functions that let you "hook into" functional components to provide state management and lifecycle operations. In a simplified view, a component lifecycle has three stages: `mounting`, `updating` and `unmounting` as shown below:

![lifecycle image](./lifecycle.png)

- `mounting`: when the component is mounted to the element tree and is rendered.
- `updating`: when props/states change, the component is re-rendered with new changes.
- `unmounting`: when the component is removed from the screen.

Two types of commonly used built-in hooks are:

- State hook: a state hook adds a local state to a component. You can have multiple state hook for multiple local states. Any state change triggers the component to `updating` stage.
- Effect hook: an effect hook is used to define operations triggered by component lifecyle stage changes. It is for a "side effect" operation. Data fetching, data subscription and UI manipulation operations are "side effects" because they are not belong to component rendering but need to be performed when a component is in `mounting` and `updating` stages, i.e., it runs after the first render and after every update. Effects don't block UI because they run asynchronously. In `unmouting` stage, an effect must free any resources that it uses.

Because a component is defined by its props and state, **data fected by effect hook will be applied to component using the state hook to change the component UI**.

In addition to the built-in hooks, you can create custom hooks that manage stateful logic and resue them in different components. Due to the functional nature of the hooks, hooks are reused for their logic, not their states. The state of each component is independent.

## 4 State Hooks

There are two common types of data that control a component: `props` and `states`. `props` are set by the parent and they are fixed throughout the lifetime of a component. For data that is going to change, you have to use `states`.

You should initialize state at the top of a function component, and then call `setState` when you want to change it. A hook is a special function that lets you “hook into” a component. The `useState` function is a hook that lets you add state to components.

### 4.1 A Counter Example

```js
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

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

- it creates a **read-only** state variable `count` with an initial value of `0`.
- it creates a function to set that state variable’s value— `setCount`.

The pattern of using `setState` is `[<value-refence>, <setter-function>] = useState(<initialValue>)`. The `useState` returns a pair of value in an array. The assignment is an array destructuring. The left is a name of a state variable, the right is a function name that can set a new value to the state variable. The two names doens't matter, you can name them whatever make sense in the context.

Whenever you call the `<setter-function>` such as `setCount(newValue)`, the component is re-rendered with updated values, i.e., the `<value-reference>` has the current value after applying updates. The `setter-function` can take a simple value or take a function as its arugment. The function argument takes the current value as it argument and returns a new value.

You can use multiple state variables. For example, the following code snippet defines three states:

```js
const [age, setAge] = useState(42);
const [fruit, setFruit] = useState('banana');
const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```

### 4.2 An Input Example

The following is an example that takes a user input number and print the squared resulte.

```jsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [numberText, setNumberText] = useState('');
  const [message, setMessage] = useState('');

  function calcSquare() {
    const number = parseInt(numberText);
    if (number) {
      const squared = number * number;
      setMessage(squared.toString());
    } else {
      setMessage('invalid input.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Input a Number</Text>
      <TextInput style={styles.textInput} onChangeText={setNumberText} />
      <Pressable style={styles.pressable} onPress={calcSquare}>
        <Text>Calc square</Text>
      </Pressable>
      <Text style={styles.title}>The square is {message}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 50,
  },
  title: {
    fontSize: 20,
    color: 'blue',
  },
  pressable: {
    marginVertical: 10,
    borderWidth: 2,
    borderColor: 'green',
    padding: 5,
  },
  textInput: {
    borderWidth: 1,
    width: 60,
    padding: 10,
    marginVertical: 10,
  },
});
```

## 5 Effect Hook

### 5.1 Introduction

When you

- fetch data from a web site
- read from local storage
- write to a file or a database
- set a timer function
- subscribe to an external source to get notification of changes

you are performing a so-called `side effect`. Usually these tasks should be performed asynchronously to not freeze UI.

You should know the following facts about effect hook:

- `useEffect` is executed asynchronously after the first render (actually when the component is mounted) and possibly after every update (re-render). It doesn't block the UI rendereing.
- Use `useEffect` for all asynchronous tasks.
- Effects run after every render cycle by default. You have options to opt out from this behavior by defining a array of dependencies.
- An effect is rerun if any of its dependencies changes since the last render cycle.

`useEffect` usage is a little complex because it can optionally specifies two important behaviors:

- when to run it. By default it runs for every re-rendering. However, you can specify the dependencies that it should run.
- clean used resources. The clean-up code runs when the component is dismounted or before the execution of the next scheduled effect.

Once you understand the timing/clean-up concepts, `useEffect` is easy to use.

### 5.2 Declare Dependency

In a simple case, you call `useEffect` with a side-effect function as its only rgument like the following:

```js
// runs after every render
useEffect(() => {
  console.log('Effect ran');
});
```

The side-effect function is a mandatory argument. With only one argument, the side-effect funciton is executed after **every** rendering operation. Usually that is not what you want -- you should add second argument: an array of dependencies (props or states) that cause the side-effect execution. If the array of dependencies is empty, the effect runs only once in the `mounting` stage.

```jsx
// this code runs only at the initial render
useEffect(() => {
  console.log('Effect ran');
}, []);

// runs whenever the state changes
useEffect(() => {
  console.log('Effect ran');
}, [state]);
```

### 5.3 Cancel Operation

The side-effect function can return another function that is executed when the component is destroyed. The returned function is often used to cancel incompleted function calls or release resources. For example, you start an expensive database search operation but change your mind and quickly navigate away from the current screen. In this case, it is a good idea to cancel the search when the search screen is not longer needed. A screen subscribe to a notification should cancel the subscription when the screen is destroyed.

### 5.4 An Example

The following code fetch data from a remote server by calling its REST API. To make the code easy to read, we put the `useEffect` code in a saprate file.

```js
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import { useState, useEffect } from 'react';
import { render } from 'react-dom';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchData(page) {
    console.log(`fetching data for page: ${page}`);
    setLoading(true);

    const apiURL = `http://jsonplaceholder.typicode.com/todos?_limit=10&_page=${page}`;

    try {
      const result = await fetch(apiURL, { method: 'get' });
      const jsonValue = await result.json();
      setData(data.concat(jsonValue));
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  console.log('render screen');

  function renderItem({ item }) {
    return (
      <View style={styles.item}>
        <Text
          style={styles.itemText}
        >{`User Id: ${item.id}, title: ${item.title} `}</Text>
      </View>
    );
  }

  function handleMore() {
    setCurrentPage(currentPage + 1);
  }

  function renderFooter() {
    return (
      { loading } && (
        <SafeAreaView>
          <ActivityIndicator size="large" />
        </SafeAreaView>
      )
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>User List</Text>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index}
        onEndReached={handleMore}
        onEndReachedThreshold={0}
        ListFooterComponent={renderFooter()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginTop: 20,
    backgroundColor: '#f5fcff',
  },
  item: {
    borderBottomColor: '#ccc',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    padding: 5,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});
```

## 6 Resources

### 6.1 Components

- [Intro to Component](https://reactnative.dev/docs/intro-react)
- [Native Components](https://reactnative.dev/docs/intro-react-native-components)
- [Core Components](https://reactnative.dev/docs/components-and-apis)
- [Core Component APIs](https://reactnative.dev/docs/components-and-apis)

### 6.2 Hooks

- [Intro to Hooks](https://reactjs.org/docs/hooks-intro.html)
- [RN State Guide](https://reactnative.dev/docs/intro-react#state)
- [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)

To gain a deep understanding of hook:

- [The last guide to the `useEffect` Hook you’ll ever need](https://blog.logrocket.com/guide-to-react-useeffect-hook/): a good in-depth introudction to effect.
- Youtube video [Getting Closure on React Hooks](https://youtu.be/KJP1E-Y-xyo) shows how to build a tiny Hook clone in simple JavaScript code.
- [Awesome React Hooks Resources](https://github.com/rehooks/awesome-react-hooks): a list of good hook resources.
