import React, { useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

import { fetchData, filterSortByGpa, filterSortByName } from "../data/users";
import ListHeader from "./ListHeader";

function keyExtractor(_, index) {
  return index.toString();
}

function renderItem({ item }) {
  return <Text style={styles.item}>{`${item.name}: ${item.gpa}`}</Text>;
}

export default function UserList() {
  const [filter, setFilter] = useState(null);
  const [data, setData] = useState(null);
  const [asc, setAsc] = useState(true);

  // it is tricky to decide when to fetch data when things are complex
  // you should use useEffect to handle this
  if (!data) {
    const fetchPromise = fetchData();
    fetchPromise.then(setData);
  }

  function onFilter(text) {
    setFilter(text);
    const newData = filterSortByName(text, asc);
    setData(newData);
  }

  function onSort() {
    const reverse = !asc;
    setAsc(reverse);

    const newData = filterSortByName(filter, reverse);
    setData(newData);
  }

  return (
    <FlatList
      ListHeaderComponent={ListHeader({ onFilter, onSort, asc })}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
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
