import "../../styles/PatientStyle/Dashboard.css"
import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import Profile from "./Profile.js";
import AllDoctors from "./AllDoctors.js"
import Bookings from "./Bookings.js"
import Documents from "./Documents.js"
import Notification from "./Notifications.js"
import Ambulance from "./Ambulance.js"
import HospitalLocator from "./HospitalLocator.js";
import DiseasePredictor from "./DiseasePrediction.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser , faStethoscope, faCalendarAlt, faFileAlt, faBell, faAmbulance, faHospital, faDiagnoses, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';


const Dashboard = () => {
    const location = useLocation();
    const email = localStorage.getItem('email');
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
        HospitalLocator: <HospitalLocator />,
        DiseasePredictor: <DiseasePredictor />
    };
    const [selectedBtn, setBtn] = useState("Profile");
    const btnAction = (pressed) => {
        setBtn(pressed);
    }
    return (
        <div className="DashboardContainer">
            <div className="navigation" >
                <h1 className="text-3xl text-slate-100 border-2 py-2 mb-2 rounded border-slate-500 text-center hover:border-white">Medi-Care</h1>
                <button className="naviBtn" onClick={() => btnAction("AllDoctors")}><FontAwesomeIcon className="pr-2" icon={faStethoscope} />All Doctors</button>
                <button className="naviBtn" onClick={() => btnAction("Bookings")}><FontAwesomeIcon className="pr-2" icon={faCalendarAlt} />My Bookings</button>
                <button className="naviBtn" onClick={() => btnAction("Documents")}><FontAwesomeIcon className="pr-2" icon={faFileAlt} />Documents</button>
                <button className="naviBtn" onClick={() => btnAction("Notification")}><FontAwesomeIcon className="pr-2" icon={faBell} />Notification</button>
                <button className="naviBtn" onClick={() => btnAction("Ambulance")}><FontAwesomeIcon className="pr-2" icon={faAmbulance} />Ambulance Service</button>
                <button className="naviBtn" onClick={() => btnAction("HospitalLocator")}><FontAwesomeIcon className="pr-2" icon={faHospital} />Nearby Hospitals</button>
                <button className="naviBtn" onClick={() => btnAction("DiseasePredictor")}><FontAwesomeIcon className="pr-2" icon={faDiagnoses} />Disease Analyzier</button>
                <Link to="/"><button className="naviBtn logout" ><FontAwesomeIcon className="pr-2" icon={faSignOutAlt} />Logout</button></Link>
            </div>
            <div className="RHS">
                <div className="profileNavi">
                    <button className="profile" onClick={() => btnAction("Profile")}><FontAwesomeIcon className="pr-2" icon={faUser } />Profile</button>
                </div>
                <div className="details">
                    {selectedBtnMap[selectedBtn]}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;