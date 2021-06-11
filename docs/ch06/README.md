# List and Effect Hook

Resources

- [Using List Views](https://reactnative.dev/docs/using-a-listview)
- [FlatList Component](https://reactnative.dev/docs/flatlist)

## 1 `FlatList` Component

The `FlatList` component is often used to display a long list of data in a scrolling view. It renders elements that are currently showing on the screen that a user can scroll to see different parts of a long list.

The `FlatList` components requires at least two props: `data` and `renderItem`. The `data` prop is an array of objects that are the source of list data. Each object should have a `key` property that has unique value for each object. The `renderItem` is a function that takes one data item and returns a UI component.

```JSX
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const USERS = [
  { key: "Devin" },
  { key: "Dan" },
  { key: "Dominic" },
  { key: "Jackson" },
  { key: "James" },
  { key: "Joel" },
  { key: "John" },
  { key: "Jillian" },
  { key: "Jimmy" },
  { key: "Julie" },
];

// the item is a destructured parameter
function renderItem({ item }) {
  return <Text style={styles.item}>Name: {item.key}</Text>;
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>List of Users</Text>
      <FlatList data={USERS} renderItem={renderItem} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
```

## 2 Selecting an Item

The `FlatList` component has props to deal with the following and many other requirements that you may have:

- You want to select an item from a list and change the UI. To re-render the UI when something changes, you set the `extraData` prop.
- The item data may not have a `key` property. If the original data item doesn't have a `key` property, use `keyExtractor` to define a function that extract a key from the item object.

The following example also uses [`TouchableOpacity`](https://reactnative.dev/docs/touchableopacity) that is a wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.

```jsx
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

const USERS = [
  { name: "Devin", gpa: 3.0 },
  { name: "Dan", gpa: 4.0 },
  { name: "Dominic", gpa: 3.2 },
  { name: "Jackson", gpa: 3.4 },
  { name: "James", gpa: 3.7 },
  { name: "Joel", gpa: 2.0 },
  { name: "John", gpa: 3.9 },
  { name: "Jillian", gpa: 4.0 },
  { name: "Jimmy", gpa: 3.5 },
  { name: "Julie", gpa: 3.3 },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.text, textColor]}>{item.name + ": " + item.gpa}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [selectedName, setSelectedName] = React.useState(null);

  function renderItem({ item }) {
    const backgroundColor = item.name === selectedName ? "blue" : "teal";
    const color = item.name === selectedName ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedName(item.name)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text>List of Users</Text>
      <FlatList
        data={USERS}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        extraData={selectedName}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 32,
  },
});
```
