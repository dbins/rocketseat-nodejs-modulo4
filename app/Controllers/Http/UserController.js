'use strict'

// Quando o recurso é do Adonis não se usa require

const Database = use('Database')
const User = use('App/Models/User')
class UserController {
  // ctx: Contexto da requisicao
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])
    const addresses = request.input('addresses') // Retorna apenas 1 campo da requisicao

    const trx = await Database.beginTransaction()

    // const user = await User.create(data)
    // await user.addresses().createMany(addresses)

    const user = await User.create(data, trx)
    await user.addresses().createMany(addresses, trx)

    await trx.commit()

    return user // json automatico da resposta
  }
}

module.exports = UserController
