// "app" é importado pelo consign no Index, por isso não é importado aqui
module.exports = app => {
    const save = (req, res) => {
        res.send('user save')
    }

    return { save }
}