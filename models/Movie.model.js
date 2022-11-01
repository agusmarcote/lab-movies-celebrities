const {Schema, model} = require("mongoose")

const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String
}, {
    timestamps: true
})

const Movie = model("movie", movieSchema);

module.exports = Movie