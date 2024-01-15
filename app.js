const express = require('express')
const cors = require('cors') 
const ivrRoute = require('./src/routes/authRoute');
const app = express()

app.use(cors())
 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/auth", ivrRoute)

module.exports = app;