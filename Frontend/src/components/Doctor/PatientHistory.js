import React from "react";
import "../../styles/DrStyle/PatientHistory.css"; 

const PatientHistory = ({ consultations }) => {
  return (
    <div className="patient-history">
      <h2>Patient Consultation History</h2>
      <table className="consultation-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Patient</th>
            <th>Contact No. </th>
            <th>Diagnosis</th>
            <th>Treatment</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consult, index) => (
            <tr key={index}>
              <td>{consult.date}</td>
              <td>{consult.patient}</td>
              <td>{consult.phone}</td>
              <td>{consult.diagnosis}</td>
              <td>{consult.treatment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientHistory;
