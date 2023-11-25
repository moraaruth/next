import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import Game from './models/Game.cjs';
import mongoose from 'mongoose'
// const mongoose = require('mongoose');

const MONGODB = 'mongodb+srv://iammoraaruth:Dakariiman@cluster0.h41xhnv.mongodb.net/'
//typeDefs
import { typeDefs } from './schema.js';
import db from './_db.js';

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(_, args) {
            return db.games.find((game) => game.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        review(_, args) {
            return db.reviews.find((review) => review.id === args.id)
        },
        authors() {
            return db.authors
        },
        author(_, args) {
            return db.authors.find((author) => author.id === args.id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.authors.filter((r) => r.author_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.find((a) => a.id === parent.author_id)
        },
        game(parent) {
            return db.games.find((g) => g.id === parent.game_id)
        }
    },

    Mutation: {
        deleteGame(_, args) {
            db.games = db.games.filter((g) => g.id !== args.id)

            return db.games

        },
        // addGame(_, {AddGameInput: { title, platform}}) {
            // let game = {
            //     ...args.game,
            //     id: Math.floor(Math.random() * 10000).toString()
            // }
            // db.games.push(game)
            // const res =  game.save()
            // return game
        //     const createGame = new Game({
        //         title: title,
        //         platform: platform,
        //         reviews: reviews
        //     })

        //     const res = createGame.save()

        //     return {
        //         id: res.id,
        //         ...res._doc
        //     }

        // },

        // addGame (_, { game }, context, info) {
        //     // Check if 'game' input object exists and contains 'title' and 'platform'
        //     if (!game || !game.title || !game.platform) {
        //       throw new Error("Invalid input object or missing required fields.");
        //     }
          
        //     // Access 'title' and 'platform' from the 'game' input object
        //     const { title, platform } = game;
          
        //     // Perform logic to create a new game or process input data
        //     // For example, save to a database, etc.
          
        //     // Return a 'Game' object (replace with actual data or generated values)
        //     return {
        //       id: '123', // Replace with actual ID
        //       title: title,
        //       platform: platform,
        //       // Other fields...
        //     };
        //   },

        addGame(_, { game }, context, info) {
            // Check if 'game' input object exists and contains 'title' and 'platform'
            if (!game || !game.title || !game.platform) {
              throw new Error("Invalid input object or missing required fields.");
            }
          
            // Access 'title' and 'platform' from the 'game' input object
            const { title, platform } = game;
          
            // Create a new instance of the 'Game' model (assuming 'Game' is a Mongoose model)
            const newGame = new Game({
              title: title,
              platform: platform,
              // Other fields...
            });
          
            // Save the new game to MongoDB (returns a promise)
            return newGame.save()
              .then(savedGame => {
                // Return the saved game object
                return savedGame;
              })
              .catch(error => {
                // Handle any errors that occur during the database operation
                throw new Error(`Failed to add game: ${error.message}`);
              });
          },
          
          
        updateGame(_, args) {
            db.games = db.games.map((g) => {
                if (g.id === args.id) {
                    return { ...g, ...args.edits }

                }

                return g
            })

            return db.games.find((g) => g.id === args.id)

        }
    }
}

const server = new ApolloServer({
    typeDefs,

    resolvers

})

// const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 }
// })

// console.log('Server ready at port', 4000)


// mongoose.connect(MONGODB, {useNewUrlParser: true})
//       .then(() => {
//           console.log("MongoDB Connection successful");
//           return server.listen({port: 4000})
//       })
//       .then((res) => {
//           console.log(`Server running at ${res.url}`)

//       })

mongoose.connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connection successful");
    // Start the Apollo Server
    return startStandaloneServer(server, { listen: { port: 4000 } });
  })
  .then(({ url }) => {
    console.log('Server ready at', url);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB or starting the server:', error);
  });