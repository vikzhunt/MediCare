import React, { useState, useEffect } from 'react';
import "../../styles/AdminStyle/AdminDash.css";
import axios from 'axios';
import AdminContent from './AdminContent.js';
import AdminDr from './AdminDr.js';
import AdminSchedule from "./AdminSchedule.js";
import AdminAppointment from "./AdminAppointment.js";
import AdminPatient from "./AdminPatient.js";
import { Link } from 'react-router-dom';

const AdminDash = () => {
    const [btnPress, setBtn] = useState("Dashboard");
    const [DrData, setDrData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/allDoctor');
                setDrData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const featureMap = {
        Dashboard: <AdminContent />,
        Doctor: <AdminDr DrData={DrData} />,
        Schedule: <AdminSchedule />,
        Appointment: <AdminAppointment />,
        Users: <AdminPatient />
    };

    const handleBtnPress = (choice) => {
        setBtn(choice);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="adminDashboard">
            <div className="adminSidebar">
                <div className="adminprofile">
                    <img className="adminprofile-pic" src="https://via.placeholder.com/50" alt="Profile" />
                    <div className='AdminDetails'>
                        <h3>Administrator</h3>
                        <p>admin@edoc.com</p>
                    </div>
                </div>
                <Link to="/">
                    <button className="logout-btn">Log Out</button>
                </Link>
                <div className="adminsidebar-nav">
                    <ul>
                        <li onClick={() => handleBtnPress("Dashboard")}>Dashboard</li>
                        <li onClick={() => handleBtnPress("Doctor")}>Doctors</li>
                        <li onClick={() => handleBtnPress("Schedule")}>Schedule</li>
                        <li onClick={() => handleBtnPress("Appointment")}>Appointment</li>
                        <li onClick={() => handleBtnPress("Users")}>Users</li>
                    </ul>
                </div>
            </div>

            <div>
                {featureMap[btnPress]}
            </div>
        </div>
    );
};

export default AdminDash;
