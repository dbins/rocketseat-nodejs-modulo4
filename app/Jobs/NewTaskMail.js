'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')
const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')

class NewTaskMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'NewTaskMail-job'
  }

  // This is where the work is done.
  async handle ({ email, username, title, file }) {
    console.log('NewTaskMail-job started')
    console.log('Job ' + NewTaskMail.key)
    // await Mail.send(
    //  ['emails.new_task'],
    //  { username, title, hasAttachment: !!file },
    //  message => {
    //    message
    //      .to(email)
    //      .from('diego@rocketseat.com.br', 'Diego | Rocketseat')
    //      .subject('Nova Tarefa para você')
    //
    //    if (file) {
    //      message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
    //        filename: file.name
    //      })
    //    }
    //  }
    // )

    Kue.dispatch(Job.key, { email, username, file, title }, { attempts: 3 })
  }
}

module.exports = NewTaskMail
