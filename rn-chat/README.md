# React Native Chat App

## 1 Resources

- [Firebase](https://youtu.be/O17OWyx08Cg)
- [`useLayoutEffect`](https://youtu.be/Ka1RrabgybI): effect happens after rendering. if your effect is mutating the UI and the UI mutation will change the appearance of the component between the time that it is rendered and your effect mutates it, then you want to use `useLayoutEffect`. It happens before the rendering. The [`useLayoutEffect` vs `useEffect` blog](https://daveceddia.com/useeffect-vs-uselayouteffect/) has more details.
- [React Native Elements](https://reactnativeelements.com/): cross platform react native UI toolkit
- [Expo vector icons](https://docs.expo.io/guides/icons/)
- [Expo Using Firebase](https://docs.expo.io/guides/using-firebase/)

## 2 Register and Login

### 2.1 Initial code 20:00

navigation: 23:00,

- install all packages.
- add first line.
- wrap all in navigation container
- install navigation stack
- `const stack = createStackNavigator`
- add `<Stack.Navigator>` in container
- create a screens folder
  - LoginScreen.js
  - add `<Stack.Screen>`
- add `globalScreenOptions`

### 2.2 Login 32:00

- install react native element.
- add `StatusBar` and set `style="light"`.
- add `Image`, set soruce and style
- add a `View`
  - add an `Input` for email
  - add an `Input` for password
  - add states: `email`, `password`. add `value` and `onChangeText` props of two inputs.
- add a `Button` for `Login` and one for `Register`.
  - `onPress` for `signIn`.
- add `container` style
- change the outer `<View>` to `KeyboardAvoidingView`.
- add a `<View>` with `{height: 100}`.
- add `button` style.
- set `inputContainer` width

### 2.3 Register Screen 48:00

- create `RegisterScreen.js` in `screens`.
- add it to navigation
- In `LoginScreen`
  - add `{navigation}` prop to
  - add `onPress` to navigate to Register screen
- In Register Screen
  - Use `KeyboardAvodingView` with `behvior`
  - add `StatusBar` from `expo-status-bar`
  - add `Text` with style, from `react-native-element`.
  - add a `View`
    - add an `Input` for full anme and a state with `onChangeText`.
    - add an `Input` for email and a state
    - add an `Input` for password and a state
    - add an `Input` for imageURL and a state, `onSubmitEditing`.
  - add a button `Register`, on click, call `register`.
    - for native element, use `containerStyle`.
- add styles
  - add style to container,
  - add a View with height 100
  - add button width and margin top
  - add inputContainer
- add `useLayoutEffect` that depends on `navigation` to change the back title.

### 2.4 Firebase Setup 12:00

Create a Firebase account

Create a Firebase proejct rn-chat .
setting:

- click web app icon, register app with the same name.
- add Firebase SDK
- `yarn add -g firebase-tools`

### 2.5 Implement Auth 1:06:20

In Firebase console, click `Authentication`, `Get Started` and enable `Email/Password`.

Click Cloud Firebase to create a database. (1:06:50), start in test mode, enable it.

copy the config to `firebase.js`.

[Expo Using Firebase](https://docs.expo.io/guides/using-firebase/)

- `expo install firebase`
- import three packages
- optimize the app intialization
- create and export `db` and `auth`

### 2.6 Implement Login 1:14:57

create an effect, only once, that listens to `auth.onAuthStateChange` and navigate to home. return `unsubscribe` for better performance.

add a Home screen. add to stack.

add signIn function

## 3 Chat Components 1:28:00

### 3.1 Home Screen

add [SafeAreaView](https://reactnative.dev/docs/safeareaview)

add `ScrollView`.

create `components/CustomListItem.js`.
