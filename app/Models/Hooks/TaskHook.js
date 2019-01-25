'use strict'
const Mail = use('Mail')
const Helpers = use('Helpers')
const TaskHook = (exports = module.exports = {})

TaskHook.sendNewTaskMail = async taskInstance => {
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return
  console.log('EXECUTOU')
  // O método user foi o relacionamento criado no model.
  // O relacionamento entre as tabelas foi definido no migration
  const { email, username } = await taskInstance.user().fetch()
  const file = await taskInstance.file().fetch()
  const { title } = taskInstance

  //Programação movida para o arquivo de jobs (REDIS)
  // Duas exclamacoes serve para converter o valor em boolean
  await Mail.send(
    ['emails.new_task'],
    { username, title, hasAttachment: !!file },
    message => {
      message
        .to(email)
        .from('diego@rocketseat.com.br', 'Diego | Rocketseat')
        .subject('Nova Tarefa para você')

      if (file) {
        message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
          filename: file.name
        })
      }
    }
  )
}
