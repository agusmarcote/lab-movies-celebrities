//  Add your code here
const {Schema, model} = require("mongoose")

const celebritySchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String
}, {
    timestamps: true
})

const Celebrity = model("celebrity", celebritySchema);

module.exports = Celebrity