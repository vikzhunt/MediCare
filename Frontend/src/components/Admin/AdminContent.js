import "../../styles/AdminStyle/AdminContent.css"

const AdminContent = ()=>{
    return(
        <div className="adminContent">
                <div className="adminHeader">
                    <div className='adminSearch'>
                        <input className="adminHeader_input" type="text" placeholder="Search Doctor name or Email" />
                        <button className="adminSearch-btn">Search</button>
                    </div>
                </div>

                <div className="adminStatus">
                    <div className="adminStatus-card">
                        <h3>1</h3>
                        <p>Doctors</p>
                    </div>
                    <div className="adminStatus-card">
                        <h3>2</h3>
                        <p>Patients</p>
                    </div>
                    <div className="adminStatus-card">
                        <h3>1</h3>
                        <p>NewBooking</p>
                    </div>
                    <div className="adminStatus-card">
                        <h3>0</h3>
                        <p>Today Sessions</p>
                    </div>
                </div>

                <div className="adminUpcoming">
                    <div className="adminUpAppointments">
                        <h3>Upcoming Appointments until Next Friday</h3>
                        <p>Here's Quick access to Upcoming Appointments until 7 days. More details available in @Appointment section.</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Appointment number</th>
                                    <th>Patient name</th>
                                    <th>Doctor</th>
                                    <th>Session</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="4">
                                        <p>No Appointments Found</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="show-all-btn">Show all Appointments</button>
                    </div>

                    <div className="adminUpSessions">
                        <h3>Upcoming Sessions until Next Friday</h3>
                        <p>Here's Quick access to Upcoming Sessions that Scheduled until 7 days. Add, Remove and Many features available in @Schedule section.</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Session Title</th>
                                    <th>Doctor</th>
                                    <th>Scheduled Date & Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="3">
                                        <p>No Sessions Found</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="show-all-btn">Show all Sessions</button>
                    </div>
                </div>
            </div>
    )
}

export default AdminContent