import "../../styles/PatientStyle/Dashboard.css"
import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

import Profile from "./Profile.js";
import AllDoctors from "./AllDoctors.js"
import Bookings from "./Bookings.js"
import Documents from "./Documents.js"
import Notification from "./Notifications.js"
import Ambulance from "./Ambulance.js"


const Dashboard = () => {

    const location = useLocation();
    const email = location.state?.email;

    useEffect(() => {
        if (email) {
            console.log("Email for this user:", email);
        }
    }, [email]);

    console.log(email)
    const selectedBtnMap = {
        Profile:<Profile email = {email}/>,
        AllDoctors: <AllDoctors email = {email}/>,
        Bookings: <Bookings email = {email}/>,
        Documents: <Documents email = {email}/>,
        Notification: <Notification />,
        Ambulance: <Ambulance />,
    };


    const [selectedBtn, setBtn] = useState("Profile");
    const btnAction = (pressed) => {
        setBtn(pressed);
    }


    return (
        <div className="DashboardContainer">
            <div className="navigation">
                <button className="naviBtn" onClick={() => btnAction("AllDoctors")}>All Doctors</button>
                <button className="naviBtn" onClick={() => btnAction("Bookings")}>My Bookings</button>
                <button className="naviBtn" onClick={() => btnAction("Documents")}>Documents</button>
                <button className="naviBtn" onClick={() => btnAction("Notification")}>Notification</button>
                <button className="naviBtn" onClick={() => btnAction("Ambulance")}>Ambulance Service</button>
                <Link to="/"><button className="naviBtn" >Logout</button></Link>


            </div>

            <div className="RHS">
                <div className="profileNavi">
                    <button className="profile" onClick={() => btnAction("Profile")}>Profile</button>
                </div>

                <div className="details">
                    {selectedBtnMap[selectedBtn]}
                </div>

            </div>
        </div>
    )
}

export default Dashboard;