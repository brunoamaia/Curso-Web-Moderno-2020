const { authSecret } = require('../.env')     // Verificar se a assinatura do token está correta
const passport = require('passport')          // Framework para validação
const passportJwt = require('passport-jwt')   //
const { ExtractJwt, Strategy } = passportJwt  // Extrair o Token da requisição - Estratégia

module.exports = app => {
  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }

  // Recebe o payload do Signin (é passsado encriptografado)
  const strategy = new Strategy(params, (payload, done) => {
    app.db('users')
      .where({ id: payload.id }) 
      .first()
      .then(user => done(null, user ? { ...payload } : false))  // Se os dados estiverem corretos, retprna o usuário, senão, retorna falso
      .catch(err => done(err, false));
  })

  passport.use(strategy)

  return {
    // filtra as requisições, para que só acessem as páginas se o passaporte for aceito
    authenticate: () => passport.authenticate('jwt', {session: false})
  }
}