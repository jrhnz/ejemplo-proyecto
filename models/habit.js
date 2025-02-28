const mongoose = require ('mongoose');
const habitschema = new mongoose.Schema({
    title: {
    type: String,
    required: true
    },
    description:{
        type: String,
        required: true
    },
    createdat: {
        type: Date,
        default: Date.now
    }
}); 

module.exports = mongoose.model('habit', habitschema);
 