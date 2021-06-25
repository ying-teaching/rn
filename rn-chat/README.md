# React Native Chat App

## 1 Resources

- [Firebase](https://youtu.be/O17OWyx08Cg)
- [`useLayoutEffect`](https://youtu.be/Ka1RrabgybI): effect happens after rendering. if your effect is mutating the UI and the UI mutation will change the appearance of the component between the time that it is rendered and your effect mutates it, then you want to use `useLayoutEffect`. It happens before the rendering. The [`useLayoutEffect` vs `useEffect` blog](https://daveceddia.com/useeffect-vs-uselayouteffect/) has more details.
- [React Native Elements](https://reactnativeelements.com/): cross platform react native UI toolkit
- [Expo vector icons](https://docs.expo.io/guides/icons/)
- [Expo Using Firebase](https://docs.expo.io/guides/using-firebase/)
- [JS async await](https://youtu.be/V_Kr9OSfDeU)

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
- `npm install -g firebase-tools`

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

add signIn function and the event handling of submission.

## 3 Home and Add Chat 1:28:00

This section adds components to list chats and add a new chat.

### 3.1 Home Screen

add [SafeAreaView](https://reactnative.dev/docs/safeareaview)

add `ScrollView`.

In `HomeScreen`, add `useLayoutEffect` to set navigation options `title`, `haderStyle` (styles of the `View` that wraps the header), `headerTitleStyle` (font and text style of the title), `headerTintColor` (the color of the back button and title).

In `headerLeft`, add user avatar, sign out handler. Use `console.log` to debug the iphone simulator (1:41:00). Wrap the avatar inside a `TouchableOpacity`. Sometime you need to reload the simulator. Define a `singOutUser` function that replace the current screen when the user avator is clicked.

In `headerRight`, add a `View` with styles, add two `TouchableOpacity` and icons: `AntDesign` camera icon and `SimpleLineIcons` pencil icon. Add `onPress` to navigate to `AddChat` screen -- add initial `AddChat` screen.

### 3.2 `AddChat` Screen (1:57:00)

This screen creates a new Chat thread.

Use `useLayoutEffect` to set navigation options. the `headerBackTitle` shows on iOS but not in the web page.

Add an `Input` and `input` state. add the `leftIcon` property that use a chat icon.

Add a submit button. On click, call `createChat` -- create this funciton to create chat in db collection. Check it in Firestore.

Changes the styles with padding and height. check it in iPhone simulator.

### 3.3 Create `components/CustomListItem.js`

Use `ListItem` and `Avatar` from `react-native-elements`. Set avatar uri to a fixed value for now.

Add `ListItem.Content`, set `<ListItem.Title>` a fixed text. Add `ListItem.SubTitle`, set `numberOfLines` and `ellipsizeMode`, add a fixed test subtitle. Try a long fixed subtitle and see the ellips.

Add three props to `CustomListItem`: `{id, chatName, enterChat}`.

### 3.4 Show Chats

Create `chats` state.

Creat `useEffect` that gets chats, set chats and returns unsubscribe.

In `ScrollView`, map each chat to a `CustomeListItem`, always provides a `key` property.

Add props to `CustomListItem`, use `chatName` as its title.

add styles to Home Screen with a container height `100%`.

Add `onPress` to `CustomListItem` that calls `enterChat` with id and chat name.

Define `enterChat` in Home screen and pass it as a prop to `CustomeListItem`. This function navigates to `Chat` with a route argument `{id, chatName}`.

## 4 Chat Screen 2:20:00

### 4.1 Set Navigation Options

Add a Chat screen. It takes `{navigation, route}` props. the `route.params.chatName` is the `chatName` argument.

use `useLayoutEffect` to define navigation options. `title`, `headerBackTitleVisible`, `headerTitleAlign`.

The `headerTitle` is a function that creates a `View` element including an `Avartar` and `Text`.

the `headerLeft` is a function creating a `TouchableOpacity` that navigate back on press.

The `headerRight` function has a view that include two `TouchableOpacity` showing two icons. use `row` styel to put them in a row.

### 4.2 The Screen Body

Add `SafeAreaView` and a `light` styled `StatusBar`.

Add `KeyboardAvoidingView`, set `behavior`, `style`, `keyboardVerticalOffset`. Add a `ScrollView`. This shows the messages.

After `ScrollView`, add a `View` as the footer that has a `TextInput` to create message and a `TouchableOpacity` to send message.

Add styles for `container`, `footer`, and `textInput`.

### 4.3 Send Message 2:40:50

Define the send message function.

call `Keyboard.dismiss()`. Add `<TouchableWithoutFeedback onPress={Keyboard.dismiss}>` to wrap the scroll view and footer.

Add messages to the db collection `chats` and set input as empty. The message has timestamp, message, displayName, email and photoURL.

### 4.4 Get Messages 2:47:00

Becuase the data depends on route, it use `useLayoutEffect` to get the chat message.

It sorts the messages and get the real time messages.

### 4.5 Scroll View

It shows the message, style differently based on the sender/receiver.

Each message has an `Avatar` and `Text` wrapped in a `Viewe`.
Define sender and reciever styles.

Add source for Avatar, set the position to `absolute` and the `bottom`/`right` to negative values.

add `paddingTop` to have some to padding.

### 4.6 Revise Custom List Item

add `chatMessages` state

add `useEffect` to get real time message.

display its photo URL, dsisplay name and the last message when there is a message.

## 5 Deploy 3:21:17

You can deploy to Expo (all apps) and Firebase (the web app).
