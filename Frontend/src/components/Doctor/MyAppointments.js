import React, { useEffect, useState } from "react";
import "../../styles/DrStyle/MyAppointments.css";
import { Link } from "react-router-dom"
import axios from "axios";

const MyAppointments = ({ onAccept, onReject }) => {

  const [appointmentList, setList] = useState([]);

  useEffect(() => {
    const PatientList = async () => {
      try {
        const allPatient = await axios.get('http://localhost:5000/api/v1/patient_request', {
          params: { DrName: "Shyamas", Status: "Pending" },
        });
        const myPatient = allPatient.data.filter((it) => it.DoctorName == "Shyamas" && it.Status === "Pending")
        setList(myPatient);
      }
      catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    PatientList();
  }, [])

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleAccept = async (ID) => {
    try {
      await axios.put(`http://localhost:5000/api/v1/patient_request/${ID}`, {
        Status: "Accepted",
      });
  
      setList((prev) => prev.filter((item) => item._id !== ID));
  
      console.log(`Appointment with ID ${ID} has been accepted.`);
    } 
    
    catch (error) {
      console.error("Error accepting appointment:", error);
    }
  };
  
  const handleReject = async (ID) => {
    try {
      await axios.put(`http://localhost:5000/api/v1/patient_request/${ID}`, {
        Status: "Rejected",
      });
  
      setList((prev) => prev.filter((item) => item._id !== ID));
  
      console.log(`Appointment with ID ${ID} has been rejected.`);
    } 
    catch (error) {
      console.error("Error rejecting appointment:", error);
    }
  };
  
  const handleConfirmOnline = () => {
    if (selectedAppointment) {
      onAccept(selectedAppointment, date, time);
      setSelectedAppointment(null);
      setDate("");
      setTime("");
    }
  };



  const handleShowPatientCard = (patientName) => {
    console.log("Showing patient card for", patientName);
  };

  return (
    <div className="my-appointments">
      <h2>Requested Appointments</h2>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason for Visit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointmentList.map((it, index) => (
            <tr key={index}>
              <td>
                <div>{it.PatientName}</div>
                <div>
                  <Link className="show-patient-card-btn" to={`#`}>
                    Show Patient Card
                  </Link>
                </div>
              </td>
              <td>{new Date(it.AppointmentDate).toLocaleDateString()}</td>
              <td>{it.AppointmentTime}</td>
              <td>{it.Symptoms}</td>
              <td>
                <button className="accept-btn" onClick={() => handleAccept(it._id)}>
                  Accept
                </button>
                <button className="reject-btn" onClick={() => handleReject(it._id)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAppointment && (
        <div className="online-scheduling">
          <h3>Schedule Online Consultation</h3>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
          <button className="confirm-btn" onClick={handleConfirmOnline}>
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
