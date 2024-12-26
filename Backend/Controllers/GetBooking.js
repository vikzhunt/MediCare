const BookingModel = require('../Models/BookDoctor');

const getMyBooking = async (req, res) => {
    
    try {
        const { patientName } = req.query;

        const bookings = patientName
            ? await BookingModel.find({ PatientName: patientName })
            : await BookingModel.find();

        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found' });
        }

        res.status(200).json(bookings);
    } 
    
    catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};


const cancelBooking = async (req, res) => {
    
    try {
        const id = req.params.id; 
        console.log(id);
    
        const toCancel = await BookingModel.findByIdAndDelete(id);
    
        if (!toCancel) {
            return res.status(404).json({ message: "Booking not found" });
        }
    
        res.status(200).json({ message: "Booking deleted successfully", data: toCancel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
    
}

module.exports = { getMyBooking , cancelBooking }
