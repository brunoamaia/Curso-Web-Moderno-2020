module.exports = app => {
  function existOrError(value, msg) {
    // Verificar se o valor existe (caso não exita, vai dar um erro)
    if(!value) throw msg    // Ver se o valor não está setato
    if(Array.isArray(value) && value.length === 0) throw msg  // Verificar se é um array vazio
    if(typeof value === 'string' && !value.trim()) throw msg  // Veirficar se é uma string vazia
  }
  
  //  Verificar se o usuário já não está cadastrado
  function notExistOrError(value, msg) {
    // Verificar se o valor não existe (caso exita, vai dar um erro)
    try {
      existOrError(value, msg)  // Testa se tem erro
    } catch(msg) {
      return                    // Retorna se passar sem erro
    }
  
    throw msg
  }
  
  // Verificar se os valores saão iguais (senhas informadas)
  function equalsOrError(valueA, valueB, msg) {
    if(valueA !== valueB) throw msg
  }

  return{ existOrError, notExistOrError, equalsOrError}
}