const { Kafka } = require('kafkajs')
const mongoose = require('mongoose')

mongoose.connect('mongodb://root:qwer1234@localhost:7001/locations', { useNewUrlParser: true })

const kafka = new Kafka({
  clientId: 'location-service',
  brokers: ['localhost:9092']
})

async function run() {
  const consumer = kafka.consumer({ groupId: 'locations' })
  const producer = kafka.producer()

  await producer.connect()
  await consumer.connect()

  consumer.subscribe({ topic: 'search-locations' })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(message.value.toString())

      producer.send({
        'topic': 'locations-receiver',
        'messages': [
          { value: `ALL LOCATIONS` }
        ]
      })
    }
  })
}

run().catch(console.error)
