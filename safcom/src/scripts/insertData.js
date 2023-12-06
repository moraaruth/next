import mongoose from 'mongoose';
import { games, authors, reviews } from '../data/initialData.js';
import Game from '../models/game.js';

async function insertData() {
  try {
    await mongoose.connect('mongodb+srv://iammoraaruth:Dakariiman@cluster0.h41xhnv.mongodb.net/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Game.insertMany(games);
    await Game.insertMany(authors);
    await Game.insertMany(reviews);

    console.log('Data inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  // } finally {
  //   await mongoose.disconnect(); // Ensure to use await here
  }
}

insertData();
