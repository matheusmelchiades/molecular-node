const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { Kafka, logLevel } = require('kafkajs')

mongoose.connect('mongodb://root:qwer1234@localhost:6001/theaters', { useNewUrlParser: true })

const kafka = new Kafka({
  clientId: 'theater-service',
  brokers: ['localhost:9092'],
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'theaters' })

app.use(express.json())

app.get('/theater', (req, res) => {

  producer.send({
    'topic': 'search-movies',
    'messages': [
      { value: 'BOMBO' }
    ]
  })

  return res.json({
    run: true,
    name: 'theater-service'
  })
})

app.get('/locations', (req, res) => {

  producer.send({
    'topic': 'search-locations',
    'messages': [
      { value: 'BOMBO' }
    ]
  })

  return res.json({
    run: true,
    name: 'theater-service'
  })
})

async function run() {

  await producer.connect()
  await consumer.connect()

  consumer.subscribe({ topic: 'movies-receiver' })
  consumer.subscribe({ topic: 'locations-receiver' })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(topic, message.value.toString())
    }
  })

  app.listen(6000)
}

run().catch(console.error)
