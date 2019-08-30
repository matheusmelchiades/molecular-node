const { Kafka } = require('kafkajs')
const mongoose = require('mongoose')

mongoose.connect('mongodb://root:qwer1234@localhost:5001/movie', { useNewUrlParser: true })

const kafka = new Kafka({
  clientId: 'movie',
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

      producer.send({
        'topic': 'movies-receiver',
        'messages': [
          { value: `ALL MOVIES` }
        ]
      })
    }
  })
}

run().catch(console.error)
