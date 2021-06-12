import React, { useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

import Users from "../data/Users";
import ListHeader from "./ListHeader";

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
      ListHeaderComponent={
        <ListHeader onFilter={onFilter} onSort={onSort} asc={state.asc} />
      }
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
