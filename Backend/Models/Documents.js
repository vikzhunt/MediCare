const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    DocName: { 
        type: String, 
        required: true 
    },
    DocUrl: { 
        type: String, 
        required: true 
    },
    DocDate: { 
        type: Date, 
        default: Date.now 
    },
}, {collection:'Documents'});

module.exports = mongoose.model('Document', DocumentSchema);
