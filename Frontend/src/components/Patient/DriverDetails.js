import "../../styles/PatientStyle/DriverDetails.css"
import React from "react";

const DriverDetails = ({ driver, setShowDriverDetails }) => {
    const closeHandler = () => {
        setShowDriverDetails(false);
    };

    return (
        <div className="driverDetails">
            <div className="detailsCard">
                <h2>Ambulance Driver Details</h2>
                <p><strong>Name:</strong> {driver.name}</p>
                <p><strong>Contact Number:</strong> {driver.contactNumber}</p>
                <p><strong>Vehicle Number:</strong> {driver.vehicleNumber}</p>
                <p><strong>Location:</strong> {driver.location}</p>
                <button className="closeBtn" onClick={closeHandler}>Close</button>
            </div>
        </div>
    );
};

export default DriverDetails;
