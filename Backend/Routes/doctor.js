
const express =require('express')
const  { logIn, signUp, updateUser } =require('../Controllers/userController')
const { getUserByEmail }= require("../Controllers/GetUserDetails")
const  getAllDoctors =require('../Controllers/AllDoctors')
const deleteDoc = require("../Controllers/DeleteDr")
const { addDr } = require("../Controllers/AddDr")
const BookDr= require("../Controllers/BookDr")
const{ getMyBooking, cancelBooking }= require('../Controllers/GetBooking')
const { PatList , StatusUpdate } = require( "../Controllers/PatientList")
const { PutProfile, GetProfile } = require('../Controllers/UpdateDrProfile')
const { getRandomDriver } = require("../Controllers/Ambulance")

const { uploadDocument, getDocuments, deleteDocument } = require("../Controllers/DocumentHandler")

const { createOrder } = require('../Controllers/Razorpay')


const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Temporary storage for file upload



router.post('/login',logIn);
router.post('/signup',signUp);

router.get("/getUser/:email", getUserByEmail);

router.patch("/updateUser/:email" , updateUser);


router.get('/allDoctor',getAllDoctors); 
router.delete('/allDoctor/:id', deleteDoc);
router.post('/add_doctor', addDr)

router.get('/bookings/',getMyBooking);
router.delete('/cancel_booking/:id', cancelBooking)

router.post('/patient_dashboard', BookDr);

router.get('/patient_request', PatList);
router.put('/patient_request/:id', StatusUpdate);

router.get('/getDr_profile/:id', GetProfile)
router.put('/getDr_profile/:id', PutProfile)


router.get('/call-ambulance', getRandomDriver);



router.get('/get_documents', getDocuments);
router.post('/documents/upload', upload.single('file'), uploadDocument);
router.delete('/documents/:fileName', deleteDocument);

// app.put("/api/v1/documents/update", async (req, res) => {
//     const { oldName, newName } = req.body;
//     try {
//         await Document.updateOne({ DocName: oldName }, { DocName: newName });
//         res.status(200).json({ message: "Document name updated successfully" });
//     } catch (error) {
//         console.error("Error updating document:", error);
//         res.status(500).json({ message: "Failed to update document name" });
//     }
// });

router.post('/create-order', createOrder);

module.exports= router;