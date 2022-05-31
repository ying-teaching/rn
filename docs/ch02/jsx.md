# JSX

## 1 Rational

JSX stands for **JavaScript XML**. It is a JavaScript syntax extension used to describe UI **elements**. In React Native, UI is inherently coupled with UI logic such as event handling and state management. Therefore JSX consists of declarative UI description and JavaScript code. JSX is a syntac sugar for JavaScript code. It makes UI description much simpler than pure JavaScript code. Using JSX, you can write XML markup inside Javascript, providing you with a superpower to write logic and markup of an element inside a single JSX file.

The JSX code, copied from [JSX in Depth](https://reactjs.org/docs/jsx-in-depth.html):

```js
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

is the same as the following pure-JavaScript code:

```js
React.createElement(MyButton, { color: 'blue', shadowSize: 2 }, 'Click Me');
```

The JSX code is simpler and more intuitive than the pure JavaScript code, especially when there are many props and nested components. The JSX code represents the **declarative** feature of React app development.

## 2 JSX Expression

A JSX expressino is used to create React elements. React elements are created by using their tags, either with or without closing tag. For example: `<Text>content</Text>` or `<Button title="Click" />` are valid JSX expressions. The tag specifies a **component** to be rendered -- it is the `type` of the element. A JSX expression uses the same HTML syntax with different tag names. The RN built-in and custom components use capitalized names.

The JSX expression can only return a single component or an array of components. The JSX expression is a regular JavaScript value that can be assigned to a variable or returned from a function call. For example:

```js
const content = <Text>content</Text>;

const Pets = () => {
  return [<Dog />, <Cat />];
};
```

Use component property names to initialize its props. A single prop without assingment has a default value of `true`. For example: `<MyTextBox autocomplete />` is the same as `<MyTextBox autocomplete={true} />`.

An element can have children elements.

```jsx
<View style={styles.container}>
  <Text>Hello World</Text>
  <StatusBar style="auto" />
</View>
```

If you assign or return a JSX component that has nested components, use a parenthse to wrap the expression. For example:

```js
const hello = (
  <View style={styles.container}>
    <Text>Hello World</Text>
    <StatusBar style="auto" />
  </View>
);
```

## 3 Embedding Expressions in JSX

JavaScript expressions inside JSX will be evaluated to a string, a RN component or a list of strings/components. You can embed JavaScripit expressions in JSX by putting them inside a pair of curly bracket `{expression}`. For example:

```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'James',
  lastName: 'Bond',
};

const element = <Text>Hello, {formatName(user)}!</Text>;
```

## 4 Compile JSX

Because RN uses `React` to compile JSX, you need to import it first as: `import React from 'react'` in your JSX file even you don't use it directly in your code. This is not required after React 17.0 but many documents and websites are outdated.

## 5 JSX Resource

- [Introducing JSX](https://reactnative.dev/docs/intro-react#jsx)
- [JSX Guide](https://www.reactnative.express/javascript/jsx)
