const Doctor = require("../Models/DoctorData")

const addDr = async (req, res) => {
    try {
        const newDr = new Doctor(req.body);
        
        console.log(newDr);
        

        await newDr.save();
        res.status(201).json({ message: 'Doctor added successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        console.error("Error adding doctor:", error);
        res.status(500).json({ message: 'Failed to add doctor' });
    }
};

module.exports = { addDr }
