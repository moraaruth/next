"use strict"
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'apollo-server';
import Game from './models/Game.cjs';
import mongoose from 'mongoose'
// const mongoose = require('mongoose');

const MONGODB = 'mongodb+srv://iammoraaruth:Dakariiman@cluster0.h41xhnv.mongodb.net/'
//typeDefs
import { typeDefs } from './schema.js';
import db from './_db.js';

export const DELETE_GAME = gql`
  mutation deleteGame($id: ID!) {
    deleteGame(id: $id)
  }
`;

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
       
     
        async addGame(_, { game }, context, info) {
            // Check if 'game' input object exists and contains 'title' and 'platform'
            if (!game || !game.title || !game.platform) {
                throw new Error("Invalid input object or missing required fields.");
            }

            // Access 'title' and 'platform' from the 'game' input object
            const { title, platform } = game;

            // Create a new instance of the 'Game' model (assuming 'Game' is a Mongoose model)
            const newGame = new Game({
                title: title,
                platform: platform
            
               
            
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



        async updateGame(_, args) {
            try {
                const { id, edits } = args;
                if (!id || !edits) {
                    throw new Error("Invalid input: 'id' and 'edits' are required.");
                }

                // Find the game by ID in the MongoDB using Mongoose
                const gameToUpdate = await Game.findById(id);
                if (!gameToUpdate) {
                    throw new Error("Game not found.");
                }

                // Apply edits to the game object
                Object.assign(gameToUpdate, edits);

                // Save the updated game to the database
                const updatedGame = await gameToUpdate.save();

                return updatedGame;
            } catch (error) {
                throw new Error(`Failed to update game: ${error.message}`);
            }
        },

        deleteGame: async (_, { id }, context) => {
            try {
          
              const deletedGame = await Game.findByIdAndDelete(id);
              
              if (deletedGame) {
                return true;
              } else {
           
                return false;
              }
            } catch (error) {
              console.error("Error deleting game:", error);
              return false; 
            }
          }

    

    }
}





const server = new ApolloServer({
    typeDefs,

    resolvers

})



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