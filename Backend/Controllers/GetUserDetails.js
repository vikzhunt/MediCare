const UserData = require("../Models/userDetails")

const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await UserData.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User fetched successfully", user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = { getUserByEmail };
