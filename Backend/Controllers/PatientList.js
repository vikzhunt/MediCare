const PatientData = require("../Models/BookDoctor");


const PatList = async (req, res) => {
  try {
    const { DrName, Status } = req.query;

    const query = {};
    if (DrName) query.DoctorName = DrName;
    if (Status) query.Status = Status;

    const list = await PatientData.find(query);

    if (list.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(list);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

const StatusUpdate = async (req, res) => {
  console.log("hello");
  
  try {
    const id  = req.params.id;
    const { Status }= req.body; 
    console.log(id + "  " + Status);
    

    if (!id || !Status) {
      return res.status(400).json({ message: "ID and status are required" });
    }

    const updatedAppointment = await PatientData.findByIdAndUpdate(
      id,
      { Status: Status },
      { new: true } 
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment status updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ message: "Error updating appointment status", error });
  }
};

module.exports = { PatList, StatusUpdate };
