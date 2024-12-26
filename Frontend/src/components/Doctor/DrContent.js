import "../../styles/DrStyle/DrDashboard.css"

const DrContent = ()=>{
    return(
        <div className="DRcontent">
                <p className="DRdate">{new Date().toLocaleString() + ""}</p>
                <header className="DRheader">
                    <p>Welcome!</p>
                    <h2>Test Doctor.</h2>
                    <p>Thanks for joining with us. We are always trying to get you a complete service. You can view your daily schedule, Reach Patients Appointment at home!</p>
                    <button className="appointment-btn">View My Appointments</button>
                </header>

                <section className="status">
                    <div className="status-card">
                        <h3>1</h3>
                        <p>All Doctors</p>
                    </div>
                    <div className="status-card">
                        <h3>2</h3>
                        <p>All Patients</p>
                    </div>
                    <div className="status-card">
                        <h3>1</h3>
                        <p>New Booking</p>
                    </div>
                    <div className="status-card">
                        <h3>0</h3>
                        <p>Today Sessions</p>
                    </div>
                </section>

                <section className="upcoming-sessions">
                    <h3>Your Upcoming Sessions until Next week</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Scheduled Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="3">
                                    <p>We couldn't find anything related to your upcoming sessions.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="upcoming-sessions">
                    <h3>Your Upcoming Sessions until Next week</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Scheduled Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="3">
                                    <p>We couldn't find anything related to your upcoming sessions.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
    )
}

export default DrContent