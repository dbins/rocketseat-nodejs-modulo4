'use strict'
const Antl = use('Antl')
class ResetPassword {
  get validateAll () {
    return true
  }
  get rules () {
    return {
      // validation rules
      // verifica se foi enviado o campo password_confirmation
      token: 'required',
      password: 'required|confirmed'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ResetPassword
