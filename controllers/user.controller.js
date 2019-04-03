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
        tipoSanguineo: req.body.tipoSanguineo,
        verificado: req.body.verificado
    });

    await user.save().then(() => {
        res.status(200).json({
            message: "Salvo com sucesso!"
        });
    }).catch(() => {
        res.status(404).json({
            message: "Erro ao salvar no banco!"
        });
    });
    next();
}

async function findUser(req, res, next) {
    await userModel.find({
            _id: req.params.id
        })
        .then((people) => {
            res.json(people);
        })
        .catch((err) => {
            res.status(404).json({
                message: "Id não encontrado!"
            });
        });
    next();
}


async function allUsers(req, res, next) {
    await userModel.find({}, (err, people) => {
        if (err) return console.log(err);
        res.status(200).json(people);
        next();
    })

}

async function updateUser(req, res, next, ) {
    await userModel.findOneAndUpdate({
        _id: req.params.id
    }, {
        senha: req.params.senha
    }).then(() =>
        res.status(200).json({
            message: "Senha atualizada com sucesso!"
        })
    ).catch((err) =>
        res.status(404).json({
            message: "id não encontrado"
        })
    )
    next();
}

async function deleteUser(req, res, next) {
    await userModel.findOneAndDelete({
        _id: req.params.id
    }).then(() => {
        res.status(200).json({
            message: "deletado com sucesso"
        });
    }).catch((err) => {
        res.status(404).json({
            message: "Id não encontrado!"
        });
    });
    next();
}

module.exports = {
    saveUser,
    allUsers,
    findUser,
    updateUser,
    deleteUser
};