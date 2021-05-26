# Node and Expo

## 1 Node.js

Node.js, often called node, is a JavaScript engine that executes JavaScript code from your operating system. There are two installers you can download from the [node.js download site](https://nodejs.org/en/download/): a LTS (Long Term Support) version or a current version. Please download and run the LTS installer, you should be able to run the following command:

- `node -v`: shows the current node.js verison
- `npm -v`: shows the node pacakge managerment version

[`npm`](https://docs.npmjs.com/) is JavaScript's package management system. It has two components: a world's largest software registry and a client CLI tool. As a developer, you just the `npm` CLI tool to download JS packages. Facebook develops another client CLI tool called [`yarn`](https://classic.yarnpkg.com/en/). Because React and React Native are developed by Faceboo, many React developers use `yarn` to manage JS packages. To install it and verify the installation, run the following CLI commands:

```sh
npm install --global yarn
yarn -v
```

Resources:

- [What is npm](https://youtu.be/ZNbFagCBlwo)

## 2 Expo

[Expo](https://docs.expo.io/) is a set of tools and services to help you develop RN apps.

Expo is a Node.js packaged that can be installed by `npm`. Run `npm i expo-cli --global` to install it as a global package thus you can run it from any project.

Run `expo --version` to verify the installation.

## 3 Expo Go App

You can use the `Expo Go` app to debug your RN apps. Check the [Expo Go document](https://docs.expo.io/get-started/installation/#2-expo-go-app-for-ios-and) to install the app in your phone if you want to debug the app from your smart phone.

## 4 Create an Expo Account

Please goto [Expo](https://expo.io/) to sign up an account. You need an account to publish your apps thus we can check them.
