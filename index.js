
const http = require('http')

require('dotenv').config()


const PORT = process.env.PORT || 8080



const express = require('express') 
const cors = require('cors') 
const ivrRoute = require('./src/routes/authRoute');
const app = express()

app.use(cors())
 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/auth", ivrRoute)
app.listen(1337)


