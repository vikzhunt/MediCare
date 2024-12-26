const AmbulanceDriver = require("../Models/AmbulanceDriver");

const getRandomDriver = async (req, res) => {
  try {
    const availableDrivers = await AmbulanceDriver.find({ availabilityStatus: true });

    if (availableDrivers.length === 0) {
      return res.status(404).json({ message: "No available ambulance drivers at the moment." });
    }

    const randomIndex = Math.floor(Math.random() * availableDrivers.length);
    const randomDriver = availableDrivers[randomIndex];

    // randomDriver.availabilityStatus = false;
    // await randomDriver.save();

    return res.status(200).json({
      message: "Ambulance driver assigned successfully.",
      driver: randomDriver,
    });
  } 
  
  catch (error) {
    return res.status(500).json({ message: "An error occurred.", error });
  }
};

module.exports = { getRandomDriver };