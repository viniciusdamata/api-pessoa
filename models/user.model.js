const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
let bloodSchema = new mongoose.Schema({    
    tipo:{
        type:String,
        required: true
    },
    fator:{
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
    _id:{
        type:String,
        required:true
    },
    uuid:{
        type:String,
        required:false
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
    orgexp:{
        type:String,
        required:true
    },
    dataNasc:{
        type:Date,
        required:true
    },
    tipoSangue:{
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
    instDeEnsino:{
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

userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;
    next();
});

module.exports = mongoose.model("user", userSchema);