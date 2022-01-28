const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
   
type Student {
  id:ID!
  firstName:String
  lastName:String
  password:String
  collegeId:String
  fullName:String
}

type RandomDie {
 numSides: Int!
 rollOnce: Int!
 roll(numRolls: Int!): [Int]
}

type FullName {
 obj:String!
 fullname:String
}

# This "Book" type defines the queryable fields for every book in our data source.

type Book {
  title: String
  author: String
}

type Message {
 id: ID!
 content: String
 author: String
}

input MessageInput {
 content: String
 author: String
}

type File {
  filename: String!
  mimetype: String!
  encoding: String!
}

type Mutation {
 setMessage(message: String): String
 createMessage(input: MessageInput): Message
 updateMessage(id: ID!, input: MessageInput): Message
 # Multiple uploads are supported. See graphql-upload docs for details.
 singleUpload(file: Upload!): File!
}


type Rate {
  currency:String
  rate:String
}


type Product {
  product_id:Int
  product_name:String
}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "books" query returns an array of zero or more Books (defined above).

type Query {
  
   quoteOfTheDay: String
   random: Float!
   rollThreeDice: [Int]
   test: String
   rest:String
   fullname:String
   greeting:String
   students:[Student]
   studentById(id:String!):Student 
   getFullName(id:String):String
   getDie(numSides: Int): RandomDie
   getFull(obj:String):FullName
   getMessage(id: ID!): Message
   ip: String
   books: [Book]
   rates(currency:String!):[Rate]
   products(id:Int!):Product
   # This is only here to satisfy the requirement that at least one
   # field be present within the 'Query' type.  This example does not
   # demonstrate how to fetch uploads back.
   otherFields: Boolean!
 }

  # The implementation for this scalar is provided by the
  # 'GraphQLUpload' export from the 'graphql-upload' package
  # in the resolver map below.
  scalar Upload
`;

module.exports = typeDefs