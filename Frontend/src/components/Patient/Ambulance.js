import React, { useState } from "react";
import DriverDetails from "./DriverDetails.js"
import "../../styles/PatientStyle/DriverDetails.css"

const Ambulance = () => {
    const [showDriverDetails, setShowDriverDetails] = useState(false);
    const [driverDetails, setDriverDetails] = useState(null); 

    const callAmbulance = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/v1/call-ambulance");
            const data = await response.json();

            if (response.ok) {
                setDriverDetails(data.driver);
                setShowDriverDetails(true);
            } else {
                alert(data.message); 
            }
        } catch (error) {
            alert("Error fetching ambulance driver. Please try again.");
        }
    };

    return (
        <div className="callAmbulance">
            {!showDriverDetails && (
                <button className="ambulanceBtn" onClick={callAmbulance}>
                    Call Ambulance
                </button>
            )}

            {showDriverDetails && (
                <DriverDetails driver={driverDetails} setShowDriverDetails={setShowDriverDetails} />
            )}
        </div>
    );
};

export default Ambulance;
