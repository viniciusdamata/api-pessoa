const mongoose = require("mongoose");
const URI = "mongodb+srv://usuario:vinicius123@cluster0-4ixoe.mongodb.net/test?retryWrites=true"
const userModel = require("../models/user.model.js");
const enviaEmail = require("../config/email.config");
const uuidv1 = require("uuid/v1");
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
    let uuid = uuidv1();
    let user = new userModel({
        //cpf é salvo como _id
        uuid: uuid,
        _id: req.body.cpf,
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        rg: req.body.rg,
        dataNasc: req.body.dataNasc,
        curso: req.body.curso,
        instituicao: req.body.instituicao,
        telefone: req.body.telefone,
        endereco: req.body.endereco,
        tipoSanguineo: req.body.tipoSanguineo,
        verificado: false
    });

    //ENVIAR O EMAIL 
    enviaEmail(req.body.email, uuid);

    await user.save()
    .then(() => {
        res.status(200).json({
            message: "Salvo com sucesso!"
        });

    })
    .catch((err) => {
        res.status(404).json({
            message: "Erro ao salvar no banco! "
        });
        throw err;
    });
    next();
}


async function updateVerify(req, res, next) {
    await userModel.findOneAndUpdate({
        uuid: req.params.id
    }, {
        verificado: true
    })
    .then(() => {
        res.status(200).json({
            message: "Email verificado com sucesso!"
        });
    })
    .catch((err) => {
        res.status(404).json({
            message: "Id não encontrado!"
        });
        throw err;
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
            throw err;
        });
    next();
}


async function allUsers(req, res, next) {
    await userModel.find({}, (err, people) => {
        if (err) throw err;
        res.status(200).json(people);
        next();
    })

}

async function updatePassword(req, res, next, ) {
    await userModel.findOneAndUpdate({
        _id: req.params.id
    }, {
        senha: req.params.senha
    })
    .then(() =>
        res.status(200).json({
            message: "Senha atualizada com sucesso!"
        })
    )
    .catch((err) => {
        res.status(404).json({
            message: "id não encontrado"
        })
        throw err;
    })
    next();
}

async function updateAll(req, res, next, ) {
    let user = {
        uuid: uuid,
        _id: req.body.cpf,
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        rg: req.body.rg,
        dataNasc: req.body.dataNasc,
        curso: req.body.curso,
        instituicao: req.body.instituicao,
        telefone: req.body.telefone,
        endereco: req.body.endereco,
        tipoSanguineo: req.body.tipoSanguineo,
        verificado: false
    }
    await userModel.findOneAndUpdate({
        _id: req.params.id
    }, user)
    .then(() =>
        res.status(200).json({
            message: "Senha atualizada com sucesso!"
        })
    )
    .catch((err) => {
        res.status(404).json({
            message: "id não encontrado"
        })
        throw err;
    })
    next();
}

async function deleteUser(req, res, next) {
    await userModel.findOneAndDelete({
        _id: req.params.id
    })
    .then(() => {
        res.status(200).json({
            message: "deletado com sucesso"
        });
    })
    .catch((err) => {
        res.status(404).json({
            message: "Id não encontrado!"
        });
        throw err;
    });
    next();
}

module.exports = {
    saveUser,
    allUsers,
    findUser,
    updatePassword,
    deleteUser,
    updateVerify,
    updateAll
};