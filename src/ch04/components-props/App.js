import React from "react";
import { Text, View } from "react-native";

// named function
function Hello(props) {
  return <Text>Hello, {props.name}</Text>;
}

// or arrow-function
const Hello2 = (props) => {
  return (
    <Text>
      Hello2, {props.name}. Age: {props.age}.
    </Text>
  );
};

export default function App() {
  return (
    <View>
      <Hello name="Alice" />
      <Hello2 name="Bob" age="7" />
    </View>
  );
}
