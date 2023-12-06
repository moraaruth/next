// game.js
import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  id: String,
  title: String,
  platform: [String],
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
