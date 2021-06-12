# Effect Hook

## Introduction

When you fetch data from a web site, read from local storage, set a timer function, or subscribe to an external source to get notification of changes, you are performing a so-called `side effect`. Usually these tasks should be performed asynchronously to not freeze UI.

In a simple case, you call `useEffect` with a side-effect function as its argument like the following:

```js
useEffect(() => {
  // execute side effect
});
```

The side-effect function is a mandatory argument. Without optional second argument, the side-effect funciton is executed everytime after render. If that is not what you want, you should add second argument: an array of dependents (props or states) that should cause the side-effect execution.

TODO: example.

The side-effect function can return another function that is executed when the component is destroyed. The returned function is often used to cancel incompleted function calls or release resources. For example, you start an expensive database search operation but change your mind and quickly navigate away from the current screen. In this case, it is a good idea to cancel the search when the search screen is not longer needed. A screen subscribe to a notification should cancel the subscription when the screen is destroyed.

## To Learn More

The [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html) has detail information for each Hook.

The Youtube video [Getting Closure on React Hooks](https://youtu.be/KJP1E-Y-xyo) shows how to build a tiny Hook clone in simple JavaScript code. It helps to understanding the rules and theories of Hooks.

To gain a deep understanding, the article [The last guide to the `useEffect` Hook you’ll ever need](https://blog.logrocket.com/guide-to-react-useeffect-hook/) is a good introdcution to the key concepts of using effects. The key points are:

- `useEffect` is executed asynchronously after the first render and after every update (re-render). It doesn't block the UI rendereing.
- Use `useEffect` for asynchronous tasks.
- Effects run after every render cycle. You have options to opt out from this behavior by defining a array of dependencies.
- An effect is rerun if at least one of its values changes since the last render cycle.
- The functions defined in the body of your function component get recreated on every render cycle. It may cause [stale closures](https://dmitripavlutin.com/react-hooks-stale-closures/).
