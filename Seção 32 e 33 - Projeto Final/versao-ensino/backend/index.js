const app = require('express')()    // Faz duas chamas consecutivas. O resultado da chamada do "express", será armazenado em  "app"

app.listen(3000, () => {
    console.log('Backend executando2 ...')
})