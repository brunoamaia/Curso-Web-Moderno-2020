const { authSecret } = require('../.env')   // Chave de criptografia
const jwt = require('jwt-simple')           // token de validação
const bccrypt = require('bcrypt-nodejs')    // comparar as senhas

module.exports = app => {
  const sigin = async(req, res) => {
    if (!req.body.email || req.body.password) {
      return res.status(400).send('Informe usuário e senha!')
    }
    
  }
}