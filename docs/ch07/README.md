# Effect Hook

Resources

- [REST API](https://youtu.be/SLwpqD8n3d0)
- [REST vs GraphQL](https://youtu.be/PeAOEAmR0D0)

## Introduction

When you fetch data from a web site, read from local storage, write to a file or a database, set a timer function, or subscribe to an external source to get notification of changes, you are performing a so-called `side effect`. Usually these tasks should be performed asynchronously to not freeze UI.

In a simple case, you call `useEffect` with a side-effect function as its argument like the following:

```js
useEffect(() => {
  console.log("Effect ran");
});
```

## Declare Dependency

The side-effect function is a mandatory argument. Without optional second argument, the side-effect funciton is executed everytime after render. If that is not what you want, you should add second argument: an array of dependents (props or states) that should cause the side-effect execution.

```jsx
// this code runs only at the initial render
useEffect(() => {
  console.log("Effect ran");
}, []);

// runs whenever the state changes
useEffect(() => {
  console.log("Effect ran");
}, [state]);
```

## Cancel Operation

The side-effect function can return another function that is executed when the component is destroyed. The returned function is often used to cancel incompleted function calls or release resources. For example, you start an expensive database search operation but change your mind and quickly navigate away from the current screen. In this case, it is a good idea to cancel the search when the search screen is not longer needed. A screen subscribe to a notification should cancel the subscription when the screen is destroyed.

## An Example

The following code fetch data from a remote server by calling its REST API.

```jsx
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      const abortController = new AbortController();
      const signal = abortController.signal;

      console.log(`loading page: ${page}`);
      setLoading(true);
      const apiURL = `http://jsonplaceholder.typicode.com/todos?_limit=10&_page=${page}`;

      fetch(apiURL, { method: "get", signal })
        .then((res) => res.json())
        .then((resJson) => {
          setData(data.concat(resJson));
          setLoading(false);
        })
        .catch((error) => console.log(error.message));

      // cancel function, called the the previous component is destroyed
      return () => {
        console.log(`Aborting fetch ${page}`);
        abortController.abort();
      };
    },

    // dependency
    [page]
  );

  function renderItem({ item, index }) {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{`${index} ${item.title}`}</Text>
      </View>
    );
  }

  function renderFooter() {
    return (
      { loading } && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )
    );
  }

  function handleLoadMore() {
    setPage(page + 1);
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItem}
        ListFooterComponent={renderFooter()}
        keyExtractor={(_, index) => index.toString()}
        // Called when all rows have been rendered and the list has been scrolled to within onEndReachedThreshold of the bottom.
        onEndReached={handleLoadMore}
        // Threshold in pixels (virtual, not physical) for calling onEndReached.
        onEndReachedThreshold={0}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    marginTop: 20,
    backgroundColor: "#f5fcff",
  },
  item: {
    borderBottomColor: "#ccc",
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    padding: 5,
  },
  loader: {
    marginTop: 10,
    alignItems: "center",
  },
});
```

## To Learn More

The [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html) has detail information for each Hook.

The Youtube video [Getting Closure on React Hooks](https://youtu.be/KJP1E-Y-xyo) shows how to build a tiny Hook clone in simple JavaScript code. It helps to understanding the rules and theories of Hooks.

To gain a deep understanding, the article [The last guide to the `useEffect` Hook you’ll ever need](https://blog.logrocket.com/guide-to-react-useeffect-hook/) is a good introdcution to the key concepts of using effects. The key points are:

- `useEffect` is executed asynchronously after the first render and after every update (re-render). It doesn't block the UI rendereing.
- Use `useEffect` for asynchronous tasks.
- Effects run after every render cycle. You have options to opt out from this behavior by defining a array of dependencies.
- An effect is rerun if at least one of its values changes since the last render cycle.
- The functions defined in the body of your function component get recreated on every render cycle. It may cause [stale closures](https://dmitripavlutin.com/react-hooks-stale-closures/).
