const mongoose = require('mongoose')
require('dotenv').config()



const connectToMongo = ()=>{

    mongoose
    .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log( 'Database Connected' ))
    .catch(err => console.log( err ));
    
}

module.exports = connectToMongo