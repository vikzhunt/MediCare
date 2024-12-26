import React from "react";
import "../../styles/DrStyle/DrSession.css";
import axios from "axios";
import { useState, useEffect } from "react";

const MySessions = ({ sessions }) => {

  const [OKList, setOKList] = useState([]);

  useEffect(() => {
    const PatientOk = async () => {
      try {
        const OKPatient = await axios.get('http://localhost:5000/api/v1/patient_request', {
          params: { DrName: "Mahirat", Status: "Accepted" },
        });
        const myOKPatient = OKPatient.data.filter((it) => it.DoctorName === "Mahirat" && it.Status === "Accepted")
        setOKList(myOKPatient);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    PatientOk();
  }, [])


  return (
    <div className="my-sessions">
      <h2>Upcoming Online Consultations</h2>
      <table className="session-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Patient Name</th>
            <th>Contact</th>
            <th>Platform</th>
          </tr>
        </thead>
        <tbody>
          {OKList.map((it) => (
            <tr >
              <td>{new Date(it.AppointmentDate).toLocaleDateString()}</td>
              <td>{it.AppointmentTime}</td>
              <td>{it.PatientName}</td>
              <td>{it.ContactNo}</td>
              <td>
                <a>
                  Join on 
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MySessions;
