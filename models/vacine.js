const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const vacineSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },

    national: { 
        type: String, 
        required: true 
    },

    price: { 
        type: Number, 
        required: true 
    }
});


module.exports = mongoose.models.vacine || mongoose.model('vaccine', vacineSchema);