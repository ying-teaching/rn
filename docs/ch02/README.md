# Web Page and JSX

In this section, we introduct the relationship among Web page, React and React Native. Then we give a quick introduction to each underlying technogogy: JavaScript, HTML, CSS, and JSX.

## 1 The Big Picture: Web Page, React and React Native

In WWW, when you type an URL or click a web link, the HTTPS protocol will return a web page. A web page is an user interface to a Web site, also called a Web application.

[React](https://reactjs.org/) is a JavaScript library for **building user interfaces**. It is a component-based framework that simplifies Web development. A component is a reusable, composable UI construct that consists of low level HTML elements, CSS styles and JavaScript functions.

[React Native](https://reactnative.dev/) combines the best parts of mobile app native development with React for building cross-platform user interfaces. It extends the React web-based UI to run in Web, smart phones (iOS and Android) and desktops. In the future, the list may include game consoles, TVs and more.

## 2 Web Page

A web page has three parts: data, style and behaior.

- The data is constructed using HTML. Please check [HTML Bascis](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics).
- The style is define using CSS. Please check [CSS Bascis](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics)
- The behavior is created using JavaScript. Please check [JavaScript Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics).

React and React Native use JavaScript or TypeScript (JS with Type) as its programming language. It uses the CSS to style UI components. JSX is a special syntax to mix JavaScript, UI components and styles together.

Following are some new JavaScript features commonly used in modern apps.

- [Arrow functions](https://www.reactnative.express/javascript/features/arrow_functions)
- [Destructuing](https://www.reactnative.express/javascript/features/destructuring)
- [Spread](https://www.reactnative.express/javascript/features/spread)
- [Async and Await](https://www.reactnative.express/javascript/features/async_and_await)

## 3 JSX

In React Native, you don't use HTML + CSS + JavaScript the same way you develop web page. You use a specical syntax called **JavaScript XML (JSX)** to create UI elements. It is described in a separate [jsx document](./jsx.md) for easy reference in the future.

## 4 Resources

### 4.1 HTML & CSS

- [Learn to Code HTML & CSS](https://learn.shayhowe.com/html-css/). In React Native, the HTML elements will be replaced by React Native elements and the CSS styles have different names.

- [Learn CSS](https://web.dev/learn/css/)

### 4.2 Javascript

For a quick tutorial, please check [MDN JS tutorial](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript).

For basic JavaScript programming, please check the [The JavaScript Way](https://github.com/thejsway/thejsway) Part 1.

For more details and advanced JavaScript features, check [The Modern JavaScript Tutorial](https://javascript.info/) Part 1.
