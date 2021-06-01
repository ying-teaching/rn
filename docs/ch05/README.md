# Navigation

Navigation handles the transition among different screens. Unlike Web Browsers, React Native doesn't have a built-in API for navigation. A easy to use navigation library is [React Navigation](https://reactnavigation.org/).

## Getting Started

Follow the [Getting started](https://reactnavigation.org/docs/getting-started) to install required packages.

A simple navigator is a stack navigator. It simulates the browser nagivation. At the beginning, you have a home screen in the screen stack, then you push a new screen to the stack. When you go back, you pop a screen out of the stack.

To use it, you need call the `createStackNavigator()` to create a stack and wrap the whole app in `<NavigationContainer>`. Then you can define serveral screens `<Stack.Screen>` inside the `<Stack.Navigator>`. Each `<Stack.Screen>` takes a name, a component and other optional props.

In each component, you can use the `navigation` prop to navigate to different screen. The `navigation.navigate` function can take route params as its second argument. Those params can be read from `route.params`.

```js
import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Text, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() => navigation.navigate("Profile", { name: "Jane" })}
    />
  );
};

const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

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
```
