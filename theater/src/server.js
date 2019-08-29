const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://root:qwer1234@localhost:6001/theaters', {
    useNewUrlParser: true,
})

app.use(express.json())

app.get('/theater', (req, res) => {

    return res.json({
        run: true,
        name: 'theater'
    })
})

app.listen(6000, () => {
    console.log('API THEATER RUNNING ON http://localhost:6000')
})
