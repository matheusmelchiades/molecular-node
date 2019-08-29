const { ServiceBroker } = require('moleculer')
const mongoose = require('mongoose')
const broker = new ServiceBroker()

mongoose.connect('mongodb://root:qwer1234@localhost:5001/movie', { useNewUrlParser: true })

broker.createService({
  'name': 'movie',
  'actions': {

  }
})


broker
  .start()
  .catch(console.error)

