const mongoose = require('mongoose')


const uri = "mongodb+srv://junaid:junaid123@cluster0.xc0ectk.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = ()=>{

    mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log( 'Database Connected' ))
    .catch(err => console.log( err ));
    
}

module.exports = connectToMongo