const mongoose = require('mongoose')
const { Schema } = mongoose;


const notesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        requred: true
    },
    tag: {
        type: String,
        default: "General"
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});
module.exports = mongoose.model('notes',notesSchema)