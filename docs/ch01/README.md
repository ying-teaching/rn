# Get Started

## 1 React

React is "a JavaScript library for building user interfaces". A typical appliation has three parts: model, view, and controller, together they are called `MVC`. Model is the data, view is the user interface, and controller is the business logic. React is the `view` of an application.

Essentially, React has two parts: a declarative component lib to build UI and a runtime rendering engine to render the UI. Different rendering runtime generates different UI.

With React Native, the slogan of react became "learn once, write anywhere". It means that you learn the same set of skills of JavaScript and React component mechanism, you can write applications using different component libraries for different UI targets. The `view` could be a web page using [ReactJS](https://reactjs.org/), a desktop application using [React Desktop](http://reactdesktop.js.org/) or a mobile app using [React Native](https://reactnative.dev).

## 2 React Native

RN reuses React's UI building mechanism and render the UI components to mobile devices. It makes mobile application development easy without losing the native UI feeling:

- Single reusable code: Instead of writing Java/Kotlin programs for Android and writing Objective-C/Swift for iOS, you use JavaScript to write apps for both platform and reuse many code.
- Simple declarative UI and functional programming paradigm: learn once, write anywhere.
- Native UI: a set of platform agnostic native components that map to platform-specific UI views.

Though RN encourages you to use different native components for different mobile operating systems (iOS and Android), it is one step closer to "write once, run anywhere" because iOS and Android has many shared React components. To make it fun, you can use render your RN application to Web thus your Web, iOS and Android can share the same code base.

Additionally, you can use RN to develop Windows or MacOS desktop applicatoins. Please check the Microsoft [React Native for Windows + macOS](https://microsoft.github.io/react-native-windows/) website for details.

## 3 Hello World

### 3.1 Initialize an App

From command line, run `expo init hello-world -t blank`. It initialized a project named `hello-world`. The `-t blank` is an abbreviation for `--template blank`. The command creates a RN project from a blank project template that has a very simple UI using JavaScript. It creates a `hello-world` folder that is the project root.

### 3.2 Run the App

Then, run the following two commands:

```sh
cd hello-world
yarn web
```

It opens two web pages:

- a Expo development tool page in `localhost: 19002`
- a web view of the app in `localhost:19006`

There is a barcode in both the command line and in the dev too page, you can scan the barcode using `Expo Go` app to check the new app in your phone.

### 3.3 Other Run Options

If you use `yarn start` instead of `yarn web`, only the dev tool page is shown. You can run the Web view uisng one of two methods:

- In the command line, press `w` to open a web view.
- In the dev page, click `Run in web browser`. to see the web version of your app.

## 4 Edit Your App

Open the `hello-world` folder in VS Code, change `<text>` element in the `app.js` as `<Text>Hello World</Text>`. Save the file.

Your web page changes.

## 5 Push to GitHub

In VS Code, open the `Command Palette`, `Ctrl+Shift+P` in Windows or `Command + Shift + P` in macOS, type `Publish to GitHub` and click the command. VS Code asks you to login and authorize accessing to your GitHub account. Publish it as a public repository thus other people can see it. Your local repository is published to GitHub.

For any following changes, you need commit locally first, then push local commits to GitHub.

## 6 Publish to Expo Snacks

To find the URL for you git repository, go to your repository in GitHub, click Code icon and click the disk icon on the right of your HTTPS url to copy the URL. a `copied` message is displayed when you click the disk icon.

Login to your `expo.io` account. Click the Snacks icon on the left panel, click the `+ New Snack` on the topright, It creates a new Snack project.

Click the ellipsis (three vertical dots) in the left project panel, select `Import git repository`. Then copy you GitHub url here.

Save your project, then you can select the tabs on the righ and the lunch icon to see you app up and running.

The URL in your Exp stack project the link when you share your project.

## 7 For Advanced User Who Want to Run a Simulator

If you want to run iOS or Android simulator in your computer, you need to install iOS or Android development toolkits. You need a Mac computer to run the iOS simulator. You can run the Android simulator using a Windows PC or a Mac. You need a powerful machine because a simulator uses a lot of resources. Following are links to installatioin instructions:

- [iOS Simulator](https://docs.expo.io/workflow/ios-simulator/).
- [Android Simulator](https://docs.expo.io/workflow/android-studio-emulator/).

If you have iOS or Android development tooklit installed, you can run iOS or Android simulation using `yarn ios` or `yarn android`.
