// "app" é importado pelo consign no Index, por isso não é importado aqui
const bcrypt = require('bcrypt-nodejs');    // biblioteca utilizada par criptografar a senha dos usuários

module.exports = app => {
    // Chamar os validadores
    const { existOrError, notExistOrError, equalsOrError} = app.api.validation

    // criptografar
    const encryptPassword = password => {
        // o "salt" faz "o tempero único" para criar cada senha criptografada
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    // método para criar e alterar usuário
    const save = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id
        
        try {
            existOrError(user.name, 'Nome não informado')
            existOrError(user.email, 'E-mail não informado')
            existOrError(user.password, 'Senha não informada')
            existOrError(user.confirmPassword, 'Confirmação da senha inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não coferem')
            
            const userFromDB = await app.db('users')
                .where({ email: user.email }).first()   // Verifica se já tem esse email cadastrado no BD

            if(!user.id) {     // Caso o "id" seja informado, o usuário será atualizado. Portanto, não verifica o email
                notExistOrError(userFromDB, 'Usuário já cadastrado')
            }

        } catch (msg) {
            return res.status(400).send(msg)
        }

        // Se não deu erro, vamos criptografar a senha
        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if (user.id) {      // Se tiver id, fazer update
            app.db('users')
                .update(user)
                .where({ id: user.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {        // Se não tiver id, fazer cadastro
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    // Obter todos os usuários
    const get = (req, res) => { 
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    // Obter usuário pelo ID
    const getById = (req, res) => {
        
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id})   // Verifica se já existe o id eviado como parametro
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err));
        
    }

    return { save, get, getById }
}