# List and Effect Hook

Resources

- [Using List Views](https://reactnative.dev/docs/using-a-listview)
- [FlatList Component](https://reactnative.dev/docs/flatlist)

## 1 `FlatList` Component

The `FlatList` component is often used to display a long list of data in a scrolling view. It renders elements that are currently showing on the screen that a user can scroll to see different parts of a long list.

The `FlatList` components requires at least two props: `data` and `renderItem`. The `data` prop is an array of objects that are the source of list data. Each object should have a `key` property that has unique value for each object. The `renderItem` is a function that takes one data item and returns a UI component.
