
import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    id: String,
    name: String,
    verified: Boolean,
  });
const Author = mongoose.model('Author', authorSchema);

export default Author;
