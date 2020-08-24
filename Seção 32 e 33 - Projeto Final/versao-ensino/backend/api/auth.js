const { authSecret } = require('../.env')   // Chave de criptografia
const jwt = require('jwt-simple')           // token de validação - Pode ter tempo de expiração
const bcrypt = require('bcrypt-nodejs')    // comparar as senhas

module.exports = app => {
  const signin = async(req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send('Informe usuário e senha!')
    }
    
    const user = await app.db('users')
      .where({ email: req.body.email })
      .whereNull('deletedAt')
      .first()
    
    if (!user) return res.status(400).send('Usuário não encontrado')

    const isMatch = bcrypt.compareSync(req.body.password, user.password)
    if (!isMatch) return res.status(401).send('Email/Senha inválidos!')

    const now = Math.floor(Date.now() /1000)

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      iat: now,                   // criado/concedido em:
      exp: now + (60*60 *24 *3)   // expira em: =>  + (segundos*minutos[1hora] *horas[1dia] *dias[dias desejados])
    }

    res.json({
      ...payload,
      token: jwt.encode(payload, authSecret)
    })
  }

  const validateToken = async (req, res) => {
    const userData = req.body || null
    try {
      if(userData) {
        const token = jwt.decode(userData.token, authSecret)
        if (new Date(token.exp*1000) > new Date()) {
          return res.send(true)
        }
      } 
    } catch(e) {
      // problemas com o token
    }
    res.send(false)
    
  }

  return { signin, validateToken }
}