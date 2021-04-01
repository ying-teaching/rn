# Component

A component is an individual resualble piece of UI. You can define a component using a class or a function, corresponding to class component and functional component. You should use functional component because it is simpler and more reusable than a class component.

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
```

The above code defines two components: `<Hello>` and `<Hello2>` that can be composed into other components.

```js

```
