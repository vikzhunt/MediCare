import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import "../../styles/DrStyle/DrDashboard.css"
import drPic from "../../images/drPIC.avif"
import PatientHistory from './PatientHistory.js';
import DrContent from './DrContent.js';
import MyAppointments from './MyAppointments.js';
import DrSession from './DrSession.js'
import Setting from "./DrSetting.js";

const Dashboard = () => {

    const location = useLocation();
    const email = location.state?.email;
    useEffect(() => {
        if (email) {
            console.log("Email for this user:", email);
        }
    }, [email]);

    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!email) {
            console.error("Email is undefined. Cannot fetch user data.");
            return;
        }
    
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
    

    const consultations = [
        { date: "2024-11-01", patient: "Dr. Smith", diagnosis: "Cold", treatment: "Rest and medication", phone: 8754124623 },
        { date: "2024-10-20", patient: "Dr. Adams", diagnosis: "Flu", treatment: "Flu vaccine and fluids", phone: 9641943168 },
    ];


    const handleAccept = (appointment, date, time) => {
        console.log("Accepted appointment:", appointment);
        if (date && time) {
            console.log("Scheduled for:", date, time);
        }
    };

    const handleReject = (appointment) => {
        console.log("Rejected appointment:", appointment);
    };

    <MyAppointments onAccept={handleAccept} onReject={handleReject} />

    const featureMap = {
        DrContent: <DrContent />,
        PatientHistory: <PatientHistory consultations={consultations} />,
        UpApp: <MyAppointments />,
        Sessions: <DrSession />,
        Setting: <Setting email={email} />

    }

    const [DRfeature, setDrFeature] = useState("DrContent");

    const featureHandler = (argument) => {
        setDrFeature(argument);
    }


    return (
        <div className="DRdashboard">
            <div className="DRsidebar">
                <div className="DRprofile">
                    <img className="DRprofile-pic" src={drPic} alt="Profile" />
                    <div className='DrProfile'>
                        {user ? (
                            <>
                                <h3>{user.username}</h3>
                                <p>{user.email}</p>
                            </>
                        ) : (
                            <p>Loading profile...</p>
                        )}
                    </div>
                </div>
                <Link to="/">
                    <button className="logout-btn">Log Out</button>
                </Link>
                <nav className="sidebar-nav">
                    <ul>
                        <li onClick={() => { featureHandler("DrContent") }}>Dashboard</li>
                        <li onClick={() => { featureHandler("UpApp") }}>My Appointments</li>
                        <li onClick={() => { featureHandler("Sessions") }}>My Sessions</li>
                        <li onClick={() => { featureHandler("PatientHistory") }}>My Patients</li>
                        <li onClick={() => { featureHandler("Setting") }}>Update Profile</li>
                    </ul>
                </nav>
            </div>

            <div>
                {featureMap[DRfeature]};
            </div>


        </div>
    );
};

export default Dashboard;
