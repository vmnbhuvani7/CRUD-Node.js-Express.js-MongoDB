const express = require('express')
const mongoose = require('mongoose')
const url = "mongodb://localhost:27017/crudEx"

const app = express()

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, findOneAndUpdate: true })
    .then(() => console.log("connection success."))
    .catch((err) => console.log(err))

app.use(express.json())

const aliensRouter = require('./routes/urls')

app.use('/aliens', aliensRouter)

app.listen(8000, () => {
    console.log("server started.");
})