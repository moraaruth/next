
import mongoose from 'mongoose';

const reviewsSchema = new mongoose.Schema({
    id: String,
    rating: Number,
    content: String,
    author_id: String,
    game_id: String,
  });

const Reviews = mongoose.model('Reviews', reviewsSchema);

export default Reviews;
