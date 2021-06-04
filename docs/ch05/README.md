# Navigation and Context Hook

Navigation handles the transition among different screens. Unlike Web Browsers, React Native doesn't have a built-in API for navigation. You can use one of many navigation libraries. [React Navigation](https://reactnavigation.org/) is a simple one.

Resources:

- [Intro to Navigation](https://reactnative.dev/docs/navigation)
- [React Navigation Docs](https://reactnavigation.org/)
- [React `useContext` Hook Tutorial](https://daveceddia.com/usecontext-hook/)
- [React Context](https://reactjs.org/docs/context.html)

## 1 Installation

After you initialize a project with `expo init` command, install the following packages

- navigation packages: `yarn add @react-navigation/native`
- Some peer dependencies for Expo managed project: `expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`

The reason that you use `expo install` is to let Expo selects the compatible packages. `yarn add` alwasy installs the latest version that may not work correctly with Expo.

To finalize installation of `react-native-gesture-handler`, add the following at the top (make sure it's at the top and there's nothing else before it) of your entry file, usually it is `App.js`: `import 'react-native-gesture-handler';`

## 2 Stack Navigator

A simple navigator is a stack navigator. It simulates the browser nagivation. At the beginning, you have a home screen in the screen stack, then you push a new screen to the stack. When you go back, you pop a screen out of the stack.

First, install the stack navigation package: `yarn add @react-navigation/stack`.

To use the stack navigation, following these steps:

- define several screen components.
- create a stack before the root function component: `const Stack = createStackNavigator();`.
- in the root function component, use `<NavigationContainer>` as the root element that wraps the `<Stack.Navigator`.
- use `<Stack.Screen>` inside the `<Stack.Navigator>` for each screen component. Each `<Stack.Screen>` takes a screen name, a component and other optional props such as screen title.

The following is an App that uses stack navigator with two screens:

```jsx
import "react-native-gesture-handler";

import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Go to profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>This is a profile</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```

## 3 Passing Parameters

In each screen component, you can have two props: `navigation` and `route`. You use the `navigation` prop to navigate to different screen. The `navigation.navigate` function can take route params as its second argument. In the target screen, those params can be read from `route.params`.

```jsx
import "react-native-gesture-handler";

import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate("Profile", { name: "Jane" })}
      />
    </View>
  );
}

function ProfileScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text>This is {route.params.name}'s profile</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```

## 4 Tab Navigation and Drawer Navigation

There are several tab navigators. Tabs can be at the bottom or at the top. The usage is similar to stack navigator. First, install the tab navigator package: `yarn add @react-navigation/bottom-tabs`. Then create tab navigator and use the tab navigator and tab screens inside `<NavigationContainer>`. You can still use the `navigation.navigate` to navigate to a different screen. Please pay attentioin to set an initial parameter for a screen using `initialParams={{ name: "Alice" }}`. The target screen will report an error is the parameter is missing.

Similarly, you can intall the drawer navigatition package using `yarn add @react-navigation/drawer` and create a drawer navigator using `createDrawerNavigator`.

```jsx
import "react-native-gesture-handler";

import React from "react";
import { StyleSheet, Text, Button, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate("Profile", { name: "Jane" })}
      />
    </View>
  );
}

function ProfileScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text>This is {route.params.name}'s profile</Text>
      <Button title="Go Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          initialParams={{ name: "Alice" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```

## 5 Context Hook

When you need to manage state across the application, you can use context hook. A context hook works like a global varialbe that is defined at a container component and is accessible for all nested components. Context hooks are often use for themes, global user profiles, or any places that multiple components may need to share some data. Don't overuse it because a context hook comes with performance cost.

To use it:

- use `const ContextName = React.createContext()` to create a context hook with a default value.
- use `<ContextName.Provider value={initValue}>` to wrap the components that use the context. The value passed here can be a single value or an object that has multiple properties.
- use `useContext(ContextName)` to get the context value and use it in any component nested in the `<ContextName.Provider>`.

The following is an example using a context hook to share the count of clicks in different screens and components.

```jsx
// count-context.js
import React from "react";

const CountContext = React.createContext();
export default CountContext;
```

In `App.js` you create a state hook and share its value and change function using a context hook.

```jsx
// App.js
import "react-native-gesture-handler";

import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CountContext from "./count-context";

import HomeScreen from "./screens/Home";
import ProfileScreen from "./screens/Profile";

const Stack = createStackNavigator();

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Welcome" }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CountContext.Provider>
  );
}
```

The `Home` screen uses the context hook.

```jsx
// components/Home.js
import React, { useContext } from "react";
import { View, Text, Button } from "react-native";

import CountContext from "../count-context";

import styles from "./style";

export default function Home({ navigation }) {
  const { count, setCount } = useContext(CountContext);

  return (
    <View style={styles.container}>
      <Text>Clicked: {count} times.</Text>
      <Button title="Click One" onPress={() => setCount(count + 1)} />

      <Button
        title="Go to profile"
        onPress={() => {
          navigation.navigate("Profile", { name: "Jane", count });
        }}
      />
    </View>
  );
}
```

You can also use it in a component that might be shared by many components.

```jsx
// components/ClickButton.js

import React, { useContext } from "react";
import { Button, Text, View } from "react-native";

import CountContext from "../count-context";

export default function ClickButton({ title }) {
  const { count, setCount } = useContext(CountContext);

  return (
    <View>
      <Text> Total clicked {count} times.</Text>
      <Button title={title} onPress={() => setCount(count + 1)} />
    </View>
  );
}
```

Then use the `ClickButton` in a `Profile` screen.

```jsx
// screens/Profile.js
import React from "react";
import { View, Text, Button } from "react-native";

import ClickButton from "../componnets/ClickButton";

import styles from "./style";

export default function Profile({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text>This is {route.params.name}'s profile</Text>
      <ClickButton title="Profile Click" />
      <Button
        title="Go Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
}
```

All screens share the same style file.

```jsx
// screens/style.js

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
```
