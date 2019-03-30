const mongoose = require("mongoose");
const URI = "mongodb+srv://usuario:vinicius123@cluster0-4ixoe.mongodb.net/test?retryWrites=true"
const personModel = require("../models/person.model.js");
mongoose.connect(URI, {
    autoReconnect: true,
    useNewUrlParser: true
});
let db = mongoose.connection;
//log once the connection is open
db.once("open", () => {
    console.log("Conectado ao mongodb");
})
//check for db errors
db.on("error", (err) => {
    console.log(err);
})

function homepage(req, res) {
    res.writeHead(200, "text/plain")
    res.end("Esta é a pagina inicial");
}

function savePerson(req, res) {
    let person = new personModel({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    });
    person.save((err) => {
        if (err) return console.log(err);
        console.log("Salvo no BD");
    })
    res.redirect("/");
}

function findOne(req, res) {
    personModel.find({
        _id: req.params.id
    }, (err, people) => {
        if (err) return console.log(err);
        res.json(people);
    })

}


function allUsers(req, res) {
    personModel.find({}, (err, people) => {
        if (err) return console.log(err);
        res.json(people);
    })

}

function updateOne(req, res) {
    // let person = new personModel({
    //     nome: req.body.nome,
    //     email: req.body.email,
    //     senha: req.body.senha
    // });
    personModel.findOneAndUpdate(req.params.id,{
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    }, (err, people)=>{
        if(err) return console.log(err);
    })
}


module.exports = {
    homepage: homepage,
    savePerson: savePerson,
    allUsers: allUsers,
    findOne: findOne,
    updateOne: updateOne
};