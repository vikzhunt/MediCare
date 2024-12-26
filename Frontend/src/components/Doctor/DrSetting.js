import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/DrStyle/SettingStyle.css";

const Setting = (props) => {
    const email = props.email;

    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/getUser/${email}`);
                setUser(response.data.user);
            } catch (e) {
                console.error("Error fetching user:", e);
            }
        };

        fetchUser();
    }, [email]);

    const handleEditClick = () => {
        setFormData(user);
        setIsModalOpen(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:5000/api/v1/updateUser/${email}`, formData);
            setUser(response.data.updatedUser);
            setIsModalOpen(false);
            console.log("User updated successfully:", response.data.updatedUser);
        } catch (e) {
            console.error("Error updating user:", e);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="doctor-profile-container">
            <div className="doctor-profile-header">
                <div className="doctor-profile-details">
                    <h2>{user.username}</h2>
                    <h5>Email: {user.email}</h5>
                    <h5>Age: {user.age}</h5>
                    <h5>Gender: {user.gender}</h5>
                    <h5>Blood Group: {user.bloodGroup}</h5>
                    {user.role === "Doctor" && (
                        <>
                            <h5>Specialization: {user.specialization || "N/A"}</h5>
                            <h5>Consultation Fee: ₹{user.consultationFee || "N/A"}</h5>
                            <h5>Address: {user.address || "N/A"}</h5>
                            <h5>Availability: {user.availability || "N/A"}</h5>
                            <h5>Experience: {user.experience || "N/A"} years</h5>
                            <h5>Contact No: {user.contactNo || "N/A"}</h5>
                        </>
                    )}
                </div>
                <div className="doctor-profile-pic">
                    <img src={user.profilePic || "default-profile.jpg"} alt="Profile" />
                </div>
            </div>

            <button className="doctor-edit-button" onClick={handleEditClick}>Edit Profile</button>

            {isModalOpen && (
                <div className="doctor-modal">
                    <div className="doctor-modal-content">
                        <h3>Edit Profile</h3>
                        <form onSubmit={handleFormSubmit}>
                            <input
                                type="text"
                                name="username"
                                value={formData.username || ""}
                                onChange={handleFormChange}
                                placeholder="Username"
                                required
                            />
                            <input
                                type="text"
                                name="contactNo"
                                value={(formData.contactNo == 1000000000) ? "" : formData.contactNo}
                                onChange={handleFormChange}
                                placeholder="Contact No"
                                required
                            />
                            <input
                                type="number"
                                name="age"
                                value={formData.age || ""}
                                onChange={handleFormChange}
                                placeholder="Age"
                                required
                            />
                            <select
                                name="gender"
                                value={formData.gender || ""}
                                onChange={handleFormChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <input
                                type="text"
                                name="bloodGroup"
                                value={formData.bloodGroup === "Missing Data" ? "" : formData.bloodGroup}
                                onChange={handleFormChange}
                                placeholder="Blood Group"
                                required
                            />
                            {user.role === "Doctor" && (
                                <>
                                    <input
                                        type="text"
                                        name="specialization"
                                        value={formData.specialization === "Missing Data" ? "" : formData.specialization}
                                        onChange={handleFormChange}
                                        placeholder="Specialization"
                                    />
                                    <input
                                        type="number"
                                        name="consultationFee"
                                        value={formData.consultationFee || ""}
                                        onChange={handleFormChange}
                                        placeholder="Consultation Fee"
                                    />
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address === "Missing Data" ? "" : formData.address}
                                        onChange={handleFormChange}
                                        placeholder="Address"
                                    />
                                    <input
                                        type="text"
                                        name="availability"
                                        value={formData.availability || ""}
                                        onChange={handleFormChange}
                                        placeholder="Availability"
                                    />
                                    <input
                                        type="number"
                                        name="experience"
                                        value={formData.experience || ""}
                                        onChange={handleFormChange}
                                        placeholder="Experience"
                                    />
                                </>
                            )}
                            <button type="submit" className="doctor-save-button">Save</button>
                            <button type="button" className="doctor-cancel-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Setting;
