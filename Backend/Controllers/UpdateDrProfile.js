const DrSchema = require("../Models/DoctorData");

const PutProfile = async (req, res) => {
    console.log("PutProfile executed");
    
    try {
        const DrId  = req.params.id;
        const updateData = req.body;

        console.log(DrId + "   " + updateData);
        

        const updatedDoc = await DrSchema.findByIdAndUpdate(DrId, updateData, { new: true });

        if (!updatedDoc) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({ message: "Profile updated successfully", data: updatedDoc });
    }

    catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "An error occurred while updating the profile" });
    }
};


const GetProfile = async (req, res) => {
    console.log("hello");
    
    try {
        const doctorId = req.params.id;

        if (!doctorId) {
            return res.status(400).json({ error: 'Doctor ID is required' });
        }

        const profile = await DrSchema.findById(doctorId);

        if (!profile) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        res.status(200).json(profile);
    }
    catch (error) {
        console.error('Error fetching doctor profile:', error);
        res.status(500).json({ error: 'Failed to fetch doctor profile', details: error.message });
    }
};


module.exports = { PutProfile, GetProfile };
