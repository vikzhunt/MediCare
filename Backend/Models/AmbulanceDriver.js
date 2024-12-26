const mongoose = require("mongoose");

const AmbulanceDriverSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true, 
        unique: true
    }, 
    name: { 
        type: String, 
        required: true 
    },
    contactNumber: { 
        type: String, 
        required: true 
    },
    vehicleNumber: { 
        type: String, 
        required: true 
    },
    availabilityStatus: { 
        type: Boolean, 
        default: true 
    }, 
    location: {
        type: String, 
        required: true 
    }, 
}, {collection: 'DriverDetails'});

module.exports = mongoose.model("AmbulanceDriver", AmbulanceDriverSchema);
