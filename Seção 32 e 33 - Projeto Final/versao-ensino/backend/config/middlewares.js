const bodyParser = require('body-parser')   //  Immterpreta o texto da requisição
const cors = require('cors')                // Permite que o Backend seja acessado pelo fronten


// O app é chamado aqui dessa forma, por causa do "consigns" do index
module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
}