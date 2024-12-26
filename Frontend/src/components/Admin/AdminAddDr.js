import "../../styles/AdminStyle/AddDr.css";
import { useState } from "react";
import axios from "axios";

const AdminAddDr = (props) => {
    const [doctorName, setDoctorName] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [curr_experience, setExperience] = useState('');
    const [address, setAddress] = useState('');
    const [consultationFee, setConsultationFee] = useState('');
    const [email, setEmail] = useState('');

    const FormHandler = () => {
        props.setForm(false);
    };

    const AddDr = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/v1/add_doctor', {
                name: doctorName,
                specialist: speciality,
                experience: curr_experience, 
                address: address,
                consultationFee: consultationFee, 
                email: email,
            });
            console.log(response);

            if (response.status === 201) {
                alert('Doctor added successfully!');
                setDoctorName('');
                setSpeciality('');
                setExperience('');
                setAddress('');
                setConsultationFee('');
                setEmail('');
            }
        } 
        
        catch (error) {
            console.error("Error adding doctor:", error);

            if (error.response && error.response.data.message) {
                alert(error.response.data.message); 
            } else {
                alert('Failed to add doctor. Please try again.');
            }
        }
    };

    return (
        <div>
            <button className="adminBackBtn" onClick={FormHandler}>Back</button>
            <div className="addDRform">
                <h2>Add New Doctor</h2>
                <form onSubmit={AddDr}>
                    <label htmlFor="doctorName">Doctor Name:</label>
                    <input 
                        type="text" 
                        id="doctorName" 
                        name="doctorName" 
                        value={doctorName} 
                        onChange={(e) => setDoctorName(e.target.value)} 
                        required 
                    />

                    <label htmlFor="speciality">Speciality:</label>
                    <input 
                        type="text" 
                        id="speciality" 
                        name="speciality" 
                        value={speciality} 
                        onChange={(e) => setSpeciality(e.target.value)} 
                        required 
                    />

                    <label htmlFor="experience">Experience:</label>
                    <input 
                        type="number"  
                        id="experience" 
                        name="experience" 
                        value={curr_experience} 
                        onChange={(e) => setExperience(e.target.value)} 
                        required 
                    />

                    <label htmlFor="address">Address:</label>
                    <input 
                        type="text" 
                        id="address" 
                        name="address" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        required 
                    />

                    <label htmlFor="consultationFee">Consultation Fee:</label>
                    <input 
                        type="number"  
                        id="consultationFee" 
                        name="consultationFee" 
                        value={consultationFee} 
                        onChange={(e) => setConsultationFee(e.target.value)} 
                        required 
                    />

                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />

                    <button type="submit" className="submitBtn">Add Doctor</button>
                </form>
            </div>
        </div>
    );
};

export default AdminAddDr;
