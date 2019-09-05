const { Kafka } = require('kafkajs')
const mongoose = require('mongoose')

mongoose.connect('mongodb://root:qwer1234@localhost:5001/movies', { useNewUrlParser: true })

const kafka = new Kafka({
  clientId: 'movie-service',
  brokers: ['localhost:9092']
})

async function run() {
  const consumer = kafka.consumer({ groupId: 'movies' })
  const producer = kafka.producer()

  await producer.connect()
  await consumer.connect()

  consumer.subscribe({ topic: 'search-movies' })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(message.value.toString())

      const schema = new mongoose.Schema({}, { strict: false })
      const model = mongoose.model('movies', schema)

      const data = await model.find()

      producer.send({
        'topic': 'movies-receiver',
        'messages': [
          { value: JSON.stringify(data) }
        ]
      })
    }
  })
}

run().catch(console.error)
