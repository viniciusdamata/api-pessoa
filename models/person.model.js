let mongoose = require("mongoose")

let personSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("person", personSchema);