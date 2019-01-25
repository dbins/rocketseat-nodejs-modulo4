'use strict'
const Antl = use('Antl')
class Session {
  // Por padrao a validacao para no primeiro erro encontrado
  get validateAll () {
    return true
  }
  get rules () {
    return {
      // validation rules
      email: 'required|email',
      password: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Session
