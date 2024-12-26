import React, { useState } from 'react';
import "../../styles/AdminStyle/AdminDr.css"
import AdminAddDr from './AdminAddDr.js';
import axios from 'axios';

const AdminDr = (props) => {
    const [DrData, setDrData] = useState(props.DrData);
    const [showForm, setForm] = useState(false);

    const FormHandler = () => {
        setForm(true);
    };

    const handleCancel = async (id) => {
        try {
            console.log(id);
            
            await axios.delete(`http://localhost:5000/api/v1/allDoctor/${id}`)

            
            setDrData((prevDrData) => prevDrData.filter((doctor) => doctor._id !== id));
            console.log(DrData);
            

            alert('Doctor deleted successfully');
        } catch (error) {
            console.error('Error deleting doctor:', error);
            alert('Failed to delete doctor. Please try again.');
        }
    };

    return (
        <>
            {!showForm && (
                <div className="doctor-list">
                    <div className="header">
                        <input
                            className="headerInput"
                            type="text"
                            placeholder="Search Doctor name or Email"
                        />
                        <button className="search-btn">Search</button>
                        <button className="add-new-btn" onClick={FormHandler}>
                            + Add New
                        </button>
                    </div>

                    <div className="table-section">
                        <h3>All Doctors</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Doctor Name</th>
                                    <th>Email</th>
                                    <th>Specialties</th>
                                    <th>Events</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DrData.map((iterator) => (
                                
                                    <tr key={iterator.id}>
                                        
                                        <td>{iterator.name}</td>
                                        <td>{iterator.email}</td>
                                        <td>{iterator.specialist}</td>
                                        <td className="actions">
                                            <button className="edit-btn">Edit</button>
                                            <button
                                                className="remove-btn"
                                                onClick={() => handleCancel(iterator._id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showForm && <AdminAddDr setForm={setForm}></AdminAddDr>}
        </>
    );
};

export default AdminDr;
