const Doctor = require('../Models/DoctorData.js');

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.json(doctors);
        console.log(doctors);
    } 
    catch (error) {
        res.status(500).send('Error fetching doctors data');
    }
};

module.exports = getAllDoctors;
