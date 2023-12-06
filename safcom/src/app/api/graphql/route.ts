import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Define your GraphQL server URI
const SERVER_URI = 'http://localhost:4000/';

const httpLink = createHttpLink({
  uri: SERVER_URI,
});

const apolloClient = new ApolloClient({
  link: httpLink, // Set the HTTP link here
  cache: new InMemoryCache(),
});

export default apolloClient;


// import { gql, ApolloServer } from "apollo-server-micro"
// import { PrismaClient } from '@prisma/client/edge'
// export const prisma = new PrismaClient();

// const typeDefs = gql`

// type Game {
//       id: ID!
//       title: String!
//       platform: [String!]!
//       reviews: [Review!]
//   }

//   type Query {
 
//        game(id: ID!): Game        

//   }
//   type Mutation {
//       deleteGame(id: ID!): [Game]
//       addGame(game: AddGameInput): Game
//       updateGame(id: ID!, edits: EditGameInput!): Game
//   }
//   input AddGameInput {
//       title: String!,
//       platform: [String!]!
//   }
//   input EditGameInput {
//     title: String,
//     platform: [String!]
// }



// `

// const resolvers = {
//     Query: {
//         Games: (_parent, _args, _context) => {
//             return prisma.games.findMany()

//         }
//     }
// }

// const apolloServer = new ApolloServer({ typeDefs, resolvers })

// const handler = apolloServer.createHandler({ path: "/api/graphql"})

// export const config = { api: { bodyParser: false }}

// export default handler;