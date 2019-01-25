'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
  // Construtor do Modelo
  static boot () {
    super.boot()
    // this.addHook('afterSave', 'TaskHook.sendNewTaskMail')

    // Desativado. Precisa primeiro configurar o e-mail!
    // this.addHook('afterCreate', 'TaskHook.sendNewTaskMail')
    // this.addHook('beforeUpdate', 'TaskHook.sendNewTaskMail')
  }

  project () {
    return this.belongsTo('App/Models/Project')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  file () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Task
