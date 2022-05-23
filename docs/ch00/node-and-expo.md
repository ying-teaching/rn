# Node and Expo

## 1 Node.js

Node.js, often called **node**, is a JavaScript engine that executes JavaScript code from our operating system. There are two installers we can download from the [node.js download site](https://nodejs.org/en/download/): a LTS (Long Term Support) version or a current version. Please download and run the **LTS** installer, we should be able to run the following command:

- `node -v`: shows the current node.js verison, a LTS version has an even nubmer like `V16`.
- `npm -v`: shows the node pacakge managerment version

[`npm`](https://docs.npmjs.com/) is JavaScript's package management system. It has two components: a world's largest software registry and a client CLI tool. As a developer, we use the `npm` CLI tool to download JS packages used in our applications. Facebook develops another "better" client CLI tool called [`yarn`](https://classic.yarnpkg.com/en/) to manage JS packages. Because React and React Native are developed by Faceboo, many React developers use `yarn` to manage JS packages. It has slightly different syntax than `npm`. As a RN developer, we use `yarn`.

- To install `yarn`, use command `npm install --global yarn`.
- Check the installation, run `yarn --version`.
- To install a package, run `yarn add [package-name]` where the `[package-name]` is the name of JS package that we want to install.

Resources:

- [What is npm](https://youtu.be/ZNbFagCBlwo)
- [`yarn` usage](https://classic.yarnpkg.com/en/docs/usage)

## 2 Expo

[Expo](https://docs.expo.io/) is a set of tools and services to help us develop and deploy RN apps. Expo is a Node.js package that can be installed by `yarn`.

Run `yarn global add expo-cli` to install it as a global package thus we can run it from any project. A global package is a JS package used by all projects. Wihtout the `global` option, the package is only installed for a local project.

Run `expo --version` to verify the installation.

## 3 Expo Go App for iOS and Android

We can use the `Expo Go` app to debug our RN apps. Please install it from [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS App Store](https://apps.apple.com/app/expo-go/id982107779).

## 4 Create an Expo Account

Please goto [Expo](https://expo.dev/) to sign up an account. we need an account to publish and share our apps.
