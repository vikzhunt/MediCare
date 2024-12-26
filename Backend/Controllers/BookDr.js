const BookDoc= require("../Models/BookDoctor")

const bookAppointment  = async (req,res)=>{
    try{
        const newAppointment =  new BookDoc(req.body);
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment created successfully!' });
    }
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating appointment', error: error.message });
        
    }
}

module.exports= bookAppointment 