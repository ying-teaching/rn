# Hooks

## Introduction

Hooks are new features introduced in React 16.8 on February 6, 2019 and Reactive Native 0.59 on March 12, 2019. They help to eanble functional programming paradigm, i.e., writing applications without using a class.

As a result, there are two ways of writing components in RN: functional components and class components. Functional components without states are easy to write and simple to reuse because they are fully defined once the function parameters are provided. The so-called presentational components are primarily concerned with displaying data. They are best implmented using functional components.

The primary benefits of class components are state management and component lifecycle methods. Hooks are used to provide the similar features to functional components. The motivation of hooks are:

- A stateful logic can be implmented and tested independently and reused. The stateful behavior can be `hooked` into a functional component.
- Hooks make it possible to write small functions in different categroies: local state management, data subscription or data fetching.
- Classes are confusing for several reasons: verbose syntax, meanings of `this`, class hierarchy etc. Functions are much simpler in writing and understanding.

Essentially, hooks are functions that let you "hook into" functional components to provide state and lifecycle features. Two types of commonly used built-in hooks are:

- State hook: a state hook adds a local state to a component. You can have multiple state hook for multiple local states.
- Effect hook: an effect hook is used for a "side effect" operation. Data fetching, data subscription and DOM manipulation operations are "side effects" because they are not belong to component rendering but need to be performed when a component is mounted, updated or dismounted.

In addition to the built-in hooks, you can create custom hooks that manage stateful logic and resue them in different components. Due to the functional nature of the hooks, hooks are reused for their logic, not their states. The state of each component is independent.

## Lifecycle and Mind Model

A good way to think about hooks and functional components is to think that hooks add some extra hidden contextual varaibles to functional components. Every time there is a change in the props/states of a functional component, the component is called and rendered with new contextual variables. It simulates memory for functional components.

## Effect Hook

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

TODO: example.

## Context Hook

## Rules of Hooks

The [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html) documents the rules and reasons behind the rules. Make sure that you follow the rules. Specifically, you must:

- Only Call Hooks at the Top Level
- Only Call Hooks from React Functions
- Use ESLint Plugin to enforce the above two rules.

## To Learn More

The [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html) has detail information for each Hook.

The Youtube video [Getting Closure on React Hooks](https://youtu.be/KJP1E-Y-xyo) shows how to build a tiny Hook clone in simple JavaScript code. It helps to understanding the rules and theories of Hooks.

To gain a deep understanding, the article [The last guide to the `useEffect` Hook you’ll ever need](https://blog.logrocket.com/guide-to-react-useeffect-hook/) is a good introdcution to the key concepts of using effects. The key points are:

- `useEffect` is executed asynchronously after the first render and after every update (re-render). It doesn't block the UI rendereing.
- Use `useEffect` for asynchronous tasks.
- Effects run after every render cycle. You have options to opt out from this behavior by defining a array of dependencies.
- An effect is rerun if at least one of its values changes since the last render cycle.
- The functions defined in the body of your function component get recreated on every render cycle. It may cause [stale closures](https://dmitripavlutin.com/react-hooks-stale-closures/).
