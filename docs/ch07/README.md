# GraphQL and Apollo Client

Apollo Client, abbreviated as AC, is a library that is integrated with React to manage local and remote data with GraphQL. It proivdes fetch, cache and mutation functions in a declarative way. This note is based on [Apollo Docs](https://www.apollographql.com/docs/react/).

AC react has the following features:

- Declarative: the logic for retrieving your data, tracking loading and error states, and updating your UI is encapsulated by the `useQuery` Hook. AC takes care of the request cycle of loading/error/completion. You just use the available data.
- Cache: cache the data and provide quick response.
- A unified interface: for both local and remote data managemnet.
- Subscription: AC can create active connection to your GraphQL server (most commonly via WebSocket), enabling the server to push updates to the subscription's result.

Componies such as The New York Times, Major League Soccer and Expo use Apollo Client in production.

Resources:

- [Getting Started with GraphQL](https://youtu.be/ARgQ4oK0Mz8): introduce GraphQL how to make GraphQL requests against Shopify store.
- [GraphQL With React Tutorial](https://youtu.be/YyUWW04HwKY): use Apollo client in React to query data.

## Get Started

### 1 Install Dependencies

`npm install @apollo/client graphql` or `yarn add @apollo/client graphql`

### 2 Create a Client

You need to specify a GraphQL server URL and create a cache.

```js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache(),
});
```

### 3 Connect Client to React

Wrap RN app with an `<ApolloProvider client={client}>`. It places the client on the context of wrapped components.

### 4 Request Data

Define query and use the query.

```js
const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const { loading, error, data } = useQuery(EXCHANGE_RATES);
```

The `app.js` has the complete code:

```jsx
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
```

## Mutations

The [`useMutation`](https://www.apollographql.com/docs/react/data/mutations/) hook returns a tuple with a mutate function in its first position and a result on its second position. The mutate funciton is used to execute the mutation. The result is an object that has properties of `data`, `loading`, `error` etc, corresponding to the fiedls of a query result.

After mutation execution, AC can automatically update a single entity if the mutation modifies a single entity and returns the `id` of the modified entity. For example:

```js
const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $type: String!) {
    updateTodo(id: $id, type: $type) {
      id
      type
    }
  }
`;

// excute mutation
const [updateTodo] = useMutation(UPDATE_TODO);
updateTodo({ variables: { id, type: value } });
```

AC doesn't update cache automatically if the mutation modifies multiple entities or deletes entitities. You need to use an update function in a call to `useMutation`.

## Local State

AC is acutally a state management library that use GraphQL to talk with a remote GraphQL server. The local data can be in `localStorage` or in AC Cache. There are two ways to manage local state:

- [Reactive variables](https://www.apollographql.com/docs/react/local-state/reactive-variables/): local state stored outside of the AC cache.
- [local-only fields](https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing-local-state-in-reactive-variables): fields that are calculated locally. A single query can include both local-only fields and fields fetched from a remote server. A field policy specifies how to fetch data and write the result to AC cache.
