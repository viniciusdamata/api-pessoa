const userModel = require("../models/user.model.js");
const enviaEmail = require("../config/email.config");
const uuidv1 = require("uuid/v1");

async function saveUser(req, res) {
  try {
    const user = new userModel(req.body);
    user._id = req.body.cpf;
    user.verificado = false;
    user.uuid = uuidv1();
    response = await user.save();
    enviaEmail(req.body.email, uuid);

    res.status(201).json({ criado: response });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

async function updateVerify(req, res) {
  try {
    await userModel.findOneAndUpdate(
      { uuid: req.params.id },
      { verificado: true }
    );
    res.status(200).json({
      message: "Email verificado com sucesso!"
    });
  } catch (err) {
    res.status(404).json({
      erro: err.message
    });
  }
}

async function findUser(req, res) {
  try {
    const response = await userModel.find({ _id: req.params.id });
    res.send(response);
  } catch (err) {
    res.status(404).json({
      erro: err.message
    });
  }
}

async function allUsers(req, res) {
  try {
    const response = await userModel.find({});
    res.send(response);
  } catch (err) {
    res.status(404).json({ erro: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const user = req.body;
    await userModel.findOneAndUpdate({ _id: req.params.id }, user);
    res.status(200).json({ mensagem: "Dados atualizados! " });
  } catch (err) {
    res.status(404).json({ erro: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "deletado com sucesso"
    });
  } catch (err) {
    res.status(404).json({
      erro: err.message
    });
  }
}

module.exports = {
  allUsers,
  saveUser,
  findUser,
  deleteUser,
  updateVerify,
  updateUser
};
