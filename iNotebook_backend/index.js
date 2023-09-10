// const mongoose = require('mongoose');
const express = require('express');
const connectToMongo = require('./db');
var cors = require('cors');

connectToMongo();
const app = express()
app.use(cors())
const port = 8080
app.use(json())
//Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
