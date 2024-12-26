import "../../styles/PatientStyle/Bookings.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bookings = (props) => {
  const userEmail = props.email;
  const [allBookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBooking = async () => {

      try {
        const response = await axios.get('http://localhost:5000/api/v1/bookings');
        const myBookings = response.data.filter((it) => (it.PatientEmail === userEmail));
        setBookings(myBookings);
      }

      catch (e) {
        console.log(e);
      }
    }

    fetchBooking();
  }, [])

  const cancellation = async (ID) => {
    if (!ID) {
      toast.error("Invalid appointment ID.");
      return;
    }
    try {
      console.log("Deleting appointment with ID:", ID);
      // console.log(`http://localhost:5000/api/v1/cancel_booking`);
      await axios.delete(`http://localhost:5000/api/v1/cancel_booking/${ID}`);
      setBookings((prev) => prev.filter((it) => it._id !== ID))
      toast.info("Appointment cancelled");

    }

    catch (e) {
      // console.log("Deleting appointment with ID:", ID);
      console.log(e);
      toast.error("Failed to cancel appointment.");
    }

  }

  return (
    <div className="bookingsContainer">
      <h1 className="bookingsTitle">My Bookings</h1>
      <div className="bookingsList">
        {allBookings.length > 0 ? (
          allBookings.map((booking, _id) => (
            <div key={_id} className="bookingItem">
              <div className="bookingDetails">
                <h3>Doctor: Dr. {booking.DoctorName}</h3>
                <p>Date: {new Date(booking.AppointmentDate).toLocaleDateString()}</p>
                <p>Time: {booking.AppointmentTime}</p>
                <p>Status: <span>{booking.Status || 'Pending'}</span></p>
              </div>
              <button className="cancelBtn" onClick={() => cancellation(booking._id)} >Cancel Booking</button>
              
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>

  );
};

export default Bookings;
