const mongoose = require('mongoose');


const noteSchema = mongoose.Schema({

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,

    },
    isimportant: {
        type: Boolean,
        required: true,
        default: false

    },

})



const Note = mongoose.model('note', noteSchema);
module.exports = Note