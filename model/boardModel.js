const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    board: {
        type:Array,
        required:true
    },
    localNext:{
        type: Boolean,
        required: true,        
    },
    winner:{
        type: String,
        required: true,        
    },
})

const Board = mongoose.model('Board',boardSchema);

module.exports = Board;