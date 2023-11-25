const { model, Schema } = require('mongoose')


const gameSchema = new Schema({
    title: String,
    platform: [String],
    
})

module.exports = model('Game', gameSchema)