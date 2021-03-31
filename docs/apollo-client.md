# Apollo Client

Apollo Client, abbreviated as AC, is a library that is integrated with React to manage local and remote data with GraphQL. It proivdes fetch, cache and mutation functions in a declarative way. This note is based on [Apollo Docs](https://www.apollographql.com/docs/react/).

AC react has the following features:

- Declarative: the logic for retrieving your data, tracking loading and error states, and updating your UI is encapsulated by the `useQuery` Hook. AC takes care of the request cycle of loading/error/completion. You just use the available data.
- Cache: cache the data and provide quick response.
- A unified interface: for both local and remote data managemnet.
- Extension: plug-ins for custom functions.

Componies such as The New York Times, Major League Soccer and Expo use Apollo Client in production.

## Get Started

### 1 Install Dependencies

`npm install @apollo/client graphql`

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
