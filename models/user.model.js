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
    //O id é o cpf do usuário
    uuid:{
        type:String,
        required:false
    },
    _id:{
        type:String,
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
    },
    verificado:{
        type:Boolean,
        required:false
    }
    
});

module.exports = mongoose.model("user", userSchema);