# JSX

JSX is a JavaScript syntax extension used to describe UI components. RN is designed with the view that rendering logic is inherently coupled with UI logic such as event handling and state management. Therefore JSX consists of declarative UI description and JavaScript code. JSX is a syntac sugar for JavaScript code. It makes UI description much simpler than pure JavaScript code.

## Basic Usage

Because RN uses `React` to compile JSX, you need to import it first as: `import React from 'react'` even you don't use it directly in your code.

React components are created by using their tags, either with or without closing tag. For example: `<Text>content</Text>` or `<Button title="Click" />`. It uses the same HTML syntax with different tag anames. The RN built-in and custom components use capitalized names.

The JavaScript expression are put into `{}` inside a tag. JavaScript expressions inside JSX will be evaluated to a string, a RN component or a list of strings/components.

Use component property names to initialize its props. A single prop without assingment has a default value of `true`. For example: `<MyTextBox autocomplete />` is the same as `<MyTextBox autocomplete={true} />`.

## Children in JSX

If a component has both opening and closing tags, you can put text or chilc components between the tags. The text will become a string. The nested content and children components are set as `props.children` in the parent component.

A RN component can return an array of elements.

`false`, `null`, `undefined`, and `true` are valid children that are not rendered. If you want to display them, use `String(myVariable)` to dispaly those varaibles.

You can use boolean variable to conditionally render elements. For example: `{showText && <Text>Hello</Text>}`.

## Resource

[Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
[JSX in Depth](https://reactjs.org/docs/jsx-in-depth.html)