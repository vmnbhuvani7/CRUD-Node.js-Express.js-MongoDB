const express = require('express')
const mongoose = require('mongoose')
const Router = require('./routes/urls')
require("dotenv").config();

const app = express()

mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("connection success...."))
    .catch((err) => console.log(err))

app.use(express.json())

app.use('/', Router)

app.listen(process.env.PORT, () => {
    console.log("server started...");
})