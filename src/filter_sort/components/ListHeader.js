import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

function ListSort({ onSort, asc }) {
  console.log(`asc: ${asc}`);
  return <Text onPress={onSort}>{asc ? "Asc" : "Des"}</Text>;
}

function ListFilter({ onFilter }) {
  return (
    <TextInput
      onChangeText={onFilter}
      style={styles.input}
      autoFocus
      placeholder="Search"
    />
  );
}

export default function ListHeader({ onFilter, onSort, asc }) {
  console.log(`List Header asc: ${asc}`);
  return (
    <View style={styles.header}>
      <ListFilter onFilter={onFilter} />
      <ListSort onSort={onSort} asc={asc} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
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
