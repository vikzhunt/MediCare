// const UserData = require("../Models/userSchema");
const UserData = require("../Models/userDetails")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv')
dotenv.config()

const signUp = async (req, res) => {
  const defaultFields = {
    image: '404',
    contactNo: 1000000000,
    specialization: 'Missing Data',
    experience: 0,
    consultationFee: 0,
    availability: [''],
    address: 'Missing Data',
    age: 0,
    gender: 'Missing Data',
    bloodGroup: 'Missing Data',
  }
  try {
    const { email, username, password, role } = req.body;
    console.log(req.body)
    const user = await UserData.findOne({ email: email });

    if (user)
      return res.status(201).json({ message: "user already exist" });
    else {
      const hashedpassword = await bcrypt.hash(password, 10);

      console.log(hashedpassword)
      const newUser = new UserData({ ...defaultFields, email, username, password: hashedpassword, role });
      console.log(newUser);

      await newUser.save();
      console.log("newUser executed");


      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log(token);

      return res.status(200).json({ message: "user registered", user: newUser, token: token, role: newUser.role, email });
    }
  } catch (error) {
    return res.status(500).json({ message: "not auth", error });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserData.findOne({ email: email });
    if (!user)
      return res.status(201).json({ message: "user does not exist", status: -1 });
    else {
      const ispwdvalid = await bcrypt.compare(password, user.password);
      if (!ispwdvalid) {
        return res.status(400).json({ message: "Invalid email or password" },);
      }
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: "Login Successful", user, token, role: user.role, email });
    }
  } catch (error) {
    return res.status(500).json({ message: "not auth" });
  }
};


const updateUser = async (req, res) => {
  const { email } = req.params; 
  const updatedData = req.body; 

  try {
    const updatedUser = await UserData.findOneAndUpdate(
      { email }, 
      { $set: updatedData }, 
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { logIn, signUp, updateUser }