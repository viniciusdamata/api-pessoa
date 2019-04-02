let mongoose = require("mongoose")
let bloodSchema = new mongoose.Schema({    
    tipo:{
        type:String,
        required: true
    },
    RH:{
        type:String,
        required:true
    }
});
let address = new mongoose.Schema({
    rua:{
        type:String,
        required:true
    },
    bairro:{
        type:String,
        required:true
    },
    numero:{
        type:Number,
        required:true
    }
})
let userSchema = new mongoose.Schema({
    ID:{
        type:Number,
        required:true
    },
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
    },
    cpf: {
        type: String,
        required: true
    },
    rg:{
        type:String,
        required:true
    },
    dataNasc:{
        type:Date,
        required:true
    },
    tipoSanguineo:{
        type:bloodSchema,
        required:true
    },
    endereco:{
        type:address,
        required:true
    },
    curso:{
        type:String,
        required:true
    },
    instituicao:{
        type:String,
        required:true
    },
    telefone:{
        type:Number,
        required:true
    }
    
});

module.exports = mongoose.model("user", userSchema);