function pessoa() {
    this.idade = 0

    const self = this   // Força o this a ficar nesta função (nesta caso, precisa utilizar a variável criada)
    setInterval(function(){
        self.idade++
        console.log(self.idade)
    }/*.bind(this)*/, 1000)     // Caso não utilize uma constante para fixar o This. use o Bind aqui
}

new pessoa