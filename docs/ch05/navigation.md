# Navigation

Navigation handles the transition among different screens.

## Getting Started

First, follow up the [Setup Instruction](https://reactnative.dev/docs/navigation#react-navigation).

A simple navigattor is stack navigator. You can define serveral screens `<Stack.Screen>` inside the `<Stack.Navigator>`. Each `<Stack.Screen>` takes a name, a component and other optional props.

In each component, you can use the `navigation` prop to navigate to different screen.

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
