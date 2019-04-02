const mongoose = require("mongoose");
const URI;
const userModel = require("../models/user.model.js");
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

async function saveUser(req, res, next) {
    let user = new userModel({
        ID: req.body.ID,
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        cpf: req.body.cpf,
        rg: req.body.rg,
        dataNasc: req.body.dataNasc,
        curso: req.body.curso,
        instituicao: req.body.instituicao,
        telefone: req.body.telefone,
        endereco: req.body.endereco,
        tipoSanguineo: req.body.tipoSanguineo
    });
    await user.save((err) => {

        if (err) {
            res.status(404).json({
                message: "Erro ao salvar no banco!"
            });
        }
        res.status(200).json({
            message: "Salvo com sucesso!"
        });
        next();


    });



}

async function findUser(req, res, next) {
    await userModel.find({
        _id: req.params.id
    }, (err, people) => {
        if (err) return res.status(404).json({
            message: "Id não encontrado!"
        });
        res.json(people);
        next();

    })
}


async function allUsers(req, res, next) {
    await userModel.find({}, (err, people) => {
        if (err) return console.log(err);
        res.status(200).json(people);
        next();
    })

}

async function updateUser(req, res, next, ) {
    function notNULL(nome, email, senha) {
        if (nome != null) {
            this.nome = nome;
        }
        if (email != null) {
            this.email = email;
        }
        if (senha != null) {
            this.senha = senha;
        }
    }

    let user = new notNULL(req.body.nome, req.body.email, req.body.senha);
    console.log(person);
    await userModel.findOneAndUpdate({
        _id: req.params.id
    }, person, (err, people) => {
        if (err) return console.log(err);
    });
    // .catch((err)=>{
    //     console.log("errro")
    // })
    next();
}

async function deleteUser(req, res, next) {
        await userModel.findOneAndDelete({
                _id: req.params.id
            }
            // ,
            // (err, people) => {
            //     if (err) return res.status(404).json({
            //         message: "Id não encontrado!"
            //     });
            //     res.status(200).json({
            //         message: "deletado com sucesso"
            //     });
            // }
            ).catch((e)=>{
                console.log(e)
            })

    next();
}

module.exports = {
    saveUser,
    allUsers,
    findUser,
    updateUser,
    deleteUser
};