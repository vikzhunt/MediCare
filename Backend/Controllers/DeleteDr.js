const Doctor = require('../Models/DoctorData');

const deleteDoc = async (req, res) => {
    try {
        const  Id  = req.params.id; // Extracting 'Id' from the request bod
        
        // Validate if the ID is provided
        if (!Id) {
            return res.status(400).json({ message: "Doctor ID is required" });
        }

        // Find and delete the doctor by ID
        const deletedDoctor = await Doctor.findByIdAndDelete(Id);

        // If no doctor is found with the given ID
        if (!deletedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Respond with success
        res.status(200).json({
            message: "Doctor deleted successfully",
            deletedDoctor, // Include details of the deleted doctor
        });
    } catch (error) {
        // Handle any errors
        console.error("Error deleting doctor:", error);
        res.status(500).json({ message: "Server error. Unable to delete doctor." });
    }
};


module.exports = deleteDoc