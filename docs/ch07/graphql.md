# GraphQL

[GraphQL](https://graphql.org/) has two parts: it is a query langauge for dta APIs; it is also a runtime for process query and mutation request. It lets you define data schema and then query/mutate the exact data. It was developed internally by Facebook in 2012 and was released to public in 2015.

## 1 Schema

### 1.1 Type and Field

An essential task of GraphQL is to select fields on objects. Therefore you need to know the type and fields of an object. GraphQL uses schemas to define object types. For example the following code frome [GraphQL Learn Doc](https://graphql.org/learn/schema/#type-system) define a `Character` type and two fields.

```graphql
type Character {
  name: String!
  appearsIn: [Episode!]!
}
```

A field may have zero or more named arguments. The following code defines an argument named `unit` and has a type of `LengthUnit` and a default value of `METER`.

```graphql
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
```

`query` and `mutation` are two special types because they define the entry point of a GraphQL query.

### 1.2 Built-in Types

GraphQL has a set of built-in scalar types: `Int`, `Float`, `String`, `Boolean`, `ID` (a string that is not for human). Some GraphQL implementations may provide more types such as `Date`.

### 1.3 Enumeration Types

An `Enum` is a fixed set of constant values, usually defined as upper-case names.

```graphql
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```

### 1.4 List and Non-Null

Use `[]` to represent a list and `!` postfix to mean non-null.

### 1.5 Interface and Union Type

An Interface is an abstract type describing a set of common fields shared by multiple types. It includes a certain set of fields that a type must include to implement the interface.

A union type means a type of a set of types.

For fields of an interface or a union type, you use `on Specific-Type` to specify the concrete type.

The GraphQL has a meta field `__typename` that can be used to distinguish between differnt fragements / union types.

### 1.6 Input Types

You use `input` keyword to specify the fields of a type used as input argument. Input type doesn't support field argument.

## 2 Queries

### 2.1 Basic Query

You use query to specify the required fields (data shape) from objects. Because an object often has more nested objects which have nested objects, you bascially defiend a graph of fields. For example:

```graphql
# a query with nested fields and field argument
{
  human(id: "1000") {
    name
    height
  }
}
# result
{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 1.72
    }
  }
}

# an Enum argument
{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}
# result
{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 5.6430448
    }
  }
}
```

### 2.2 Aliases and Fragments

If there is a name conflict, you can assign an alias to a field. You use a fragement to define shared query data. For example, the following defines a fragment `comparisonFields` shared by two queries.

```graphql
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

### 2.3 Operation and Variable

The above samples are shorthand syntax for simple and single query. For complex quries or multiple queries, you shoul define query operation. A query operation has an operation type and an operation name. The operation type is either `query`, `mutation`, or `subscription`. You should give a meaningful name to your operation.

Operation also lets you define variables. There are three steps in using a variable:

- declare a variable name and its type in the opration. A variable name has a `$` prefix.
- use the variable in query field arguments.
- pass the variable values in query execution.

For example, the following code demos the first two steps:

```graphql
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

All declared variables can be optional (with a default value) or requried and must be either scalars, enums, or input object types.

The `@include(if: $var)` and `@skip(if: $var)` can change the result based on the truthness a `$var`.

## 3 Mutations

Queries are for read while muatations are for change/creation of data. You use `mutation` to define mutation operatoins that include variables and fields.

If a mutation call returns an object type, you can write a query inside the body of a mutation.

```graphql
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
  }
}
```

The above oepration creates a review for the specified episode and returns the `stars` of the newly created review.

If a multiple contain multiple fileds, they are exectued sequentially.

## 4 [Execution](https://graphql.org/learn/execution/)

At the top level of every GraphQL server is a type that represents all of the possible entry points into the GraphQL API, it's often called the `Root` type or the `Query` type.

From the `Query` type, you define other types for all fields.

```graphql
type Query {
  human(id: ID!): Human
}

type Human {
  name: String
  appearsIn: [Episode]
  starships: [Starship]
}

enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}

type Starship {
  name: String
}
```

Each field in the above type represents a function that return another type whose fields are functions return more types. Each function is called a `resolver` and is implemented by a GraphQL runtime.

## Resources

[Learn GraphQL](https://graphql.org/learn/)
