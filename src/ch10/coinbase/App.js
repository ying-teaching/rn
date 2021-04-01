import React from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache(),
});

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const renderItem = ({ item }) => (
  <View>
    <Text>
      {item.currency} : {item.rate}
    </Text>
  </View>
);

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View>
        <Text>Fetch Error: {error.message}</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.rates}
        renderItem={renderItem}
        keyExtractor={(item) => item.currency}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ExchangeRates />
    </ApolloProvider>
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
