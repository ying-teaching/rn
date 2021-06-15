# List

Resources

- [Using List Views](https://reactnative.dev/docs/using-a-listview)
- [FlatList Component](https://reactnative.dev/docs/flatlist)

## 1 `FlatList` Component

The `FlatList` component is often used to display a long list of data in a scrolling view. It renders elements that are currently showing on the screen that a user can scroll to see different parts of a long list.

The `FlatList` components requires at least two props: `data` and `renderItem`. The `data` prop is an array of objects that are the source of list data. Each object should have a `key` property that has a unique value for each object. The `renderItem` is a function that takes one data item and returns a UI component.

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
- The item data may not have a `key` property. If the original data item doesn't have a `key` property, use `keyExtractor` to define a function that creates a key from the item object and/or its index.

The following example also uses [`TouchableOpacity`](https://reactnative.dev/docs/touchableopacity) that is a row wrapper for making items respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.

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
    const backgroundColor = item.name === selectedName ? "blue" : "darkgray";
    const color = item.name === selectedName ? "white" : "teal";

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

## 3 Filter and Sort

To filter and sort a list, you can add components to the list header and change the list states. Because of the filter text and sorting order, you need to keep all three pieces of the list state: filter text, sorting order and source data. When the filter text or sorting order changes, you filter and sort the data correspondingly.

The following are soruce files.

```jsx
// data/User.js
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

export default USERS;
```

```jsx
// components/ListHeader.js
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function ListHeader({ onFilter, onSort, asc }) {
  return (
    <View style={styles.controls}>
      <ListFilter onFilter={onFilter} />
      <ListSort onSort={onSort} asc={asc} />
    </View>
  );
}

function ListSort({ onSort, asc }) {
  return <Text onPress={onSort}>{asc ? "Asc" : "Des"}</Text>;
}

function ListFilter({ onFilter }) {
  return (
    <TextInput
      style={styles.input}
      autoFocus
      placeholder="Search"
      onChangeText={onFilter}
    />
  );
}

const styles = StyleSheet.create({
  controls: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "blue",
    marginRight: 5,
  },
});
```

```jsx
// components/UserList.js
import React, { useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

import Users from "../data/Users";
import ListHeader from "./ListHeader";

// be careful to not change the original data
function filterAndSort(text, asc) {
  const filtered = Users.filter((user) => {
    if (text) {
      return user.name.includes(text);
    } else {
      return true;
    }
  });

  return filtered.sort(
    asc
      ? (u1, u2) => u1.name.localeCompare(u2.name)
      : (u1, u2) => u2.name.localeCompare(u1.name)
  );
}

export default function UserList() {
  const initState = { filter: "", asc: true, data: Users };

  const [state, setState] = useState(initState);

  function onFilter(text) {
    const filter = text;
    const asc = state.asc;
    const data = filterAndSort(filter, asc);
    setState({ filter, asc, data });
  }

  function onSort() {
    const filter = state.filter;
    const asc = !state.asc;
    const data = filterAndSort(filter, asc);
    setState({ filter, asc, data });
  }

  function renderItem({ item }) {
    return <Text style={styles.item}>{item.name + ": " + item.gpa}</Text>;
  }

  return (
    <FlatList
      data={state.data}
      ListHeaderComponent={ListHeader({ onFilter, onSort, asc: state.asc })}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    margin: 5,
    padding: 5,
    color: "slategrey",
    backgroundColor: "ghostwhite",
    textAlign: "center",
  },
});
```

```jsx
// app.js
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import UserList from "./components/UserList";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>List of Users</Text>
      <UserList />
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
});
```

## 4 Exercise

- Change the above code to use use three separate states: `filter`, `asc` and `data`.
- Change the "Asc" and "Dsc" to use two icons.

Be careful when an app has multiple states and they are related. In a single function, you can not `setState` and use its result immediately: state is only changed when a component is rerendered. In the above code, if you use three separate states: `filter`, `asc` and `data`. In one funciton, after `setFilter(newValue)`, you cannot use `filter` to call `setData(filter)` because the `filter` is still has the old value.
