const mongoose= require('mongoose')

const BoookDoctorScehma = new mongoose.Schema({
    DoctorName:{
        type:String, 
        required:true,
    },

    PatientName:{
        type:String, 
        required:true,
    },

    AppointmentDate:{
        type:Date, 
        required:true,
    },
    AppointmentTime:{
        type:String, 
        required:true,
    },

    ContactNo:{
        type:Number,
        required:true,
    },
    DrEmail:{
        type:String, 
        // unique:true,  can be multiple appointments from single user
        required:true,
    },
    PatientEmail:{
        type:String, 
        required:true,
    },
    Symptoms:{
        type:String, 
        required:true,
    },
    Status:{
        type:String,
        default:"Pending"
    }
}, {collection: 'reqAppointments'});

module.exports = mongoose.model('BoookDoctor', BoookDoctorScehma);