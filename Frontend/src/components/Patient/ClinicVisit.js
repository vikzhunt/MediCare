import { useEffect, useState } from "react";
import "../../styles/PatientStyle/ClinicVisit.css";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClinicVisit = (props) => {
    const [Dr, setDr] = useState([]);
    const [Data, setData] = useState('');
    const [showModal, setShowModal] = useState(false);
    const userEmail = props.userEmail;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get('http://localhost:5000/api/v1/allDoctor');
                setDr(resp.data);

                const DrBook = resp.data.find((doc) => doc.id === props.formId);
                setData(DrBook);

            }

            catch (error) {
                toast.warn("Failed to fetch doctor details.");
            }
        };
        fetchData();
    }, [props.formId]);
    

    useEffect(() => {
        const loadRazorpayScript = () => {
            if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
                document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]').remove();
            }

            if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.async = true;
                document.body.appendChild(script);

                script.onload = () => console.log('Razorpay SDK loaded.');
                script.onerror = () => toast.error("Failed to load Razorpay SDK.");
            }
        };

        loadRazorpayScript();
    }, []);

    const hideFormHandler = () => {
        props.setForm(false);
    };

    const [PatientName, setPatientName] = useState('');
    const [AppointmentDate, setAppointmentDate] = useState('');
    const [AppointmentTime, setAppointmentTime] = useState('');
    const [ContactNo, setContactNo] = useState('');
    // const [DrEmail, setEmail] = useState('');
    const [Symptoms, setSymptoms] = useState('');

    // const handlePayment = async () => {
    //     try {
    //         if (!Data) {
    //             toast.warn("Doctor details are missing.");
    //             return;
    //         }

    //         toast.info("Razorpay payment initiated.");
    //         console.log("nhi pahuchha");


    //         const response = await axios.post('http://localhost:5000/api/v1/create-order', {
    //             amount: Data.consultationFee * 100,
    //         });
    //         console.log("pahuchh gya");

    //         const orderId  = response.data.orderId;

    //         console.log(orderId + "  " + Data.consultationFee * 100);

    //         // const options = {
    //         //     key: `rzp_test_mCpQ8Ow7U6g6oR`,
    //         //     amount: Data.consultationFee * 100,
    //         //     currency: 'INR',
    //         //     name: Data.name,
    //         //     description: 'Consultation Fee Payment',
    //         //     order_id: orderId,
    //         //     handler: async function (response) {
    //         //         const paymentData = {
    //         //             paymentId: response.razorpay_payment_id,
    //         //             orderId: response.razorpay_order_id,
    //         //             signature: response.razorpay_signature,
    //         //         };

    //         //         console.log(paymentData);


    //         //         try {
    //         //             await axios.post('http://localhost:5000/verify-payment', paymentData);
    //         //             toast.success("Payment successful! Appointment confirmed.");
    //         //             setShowModal(false);
    //         //         } catch (error) {
    //         //             console.error("Payment verification failed:", error);
    //         //             toast.error("Payment verification failed. Please contact support.");
    //         //         }
    //         //     },
    //         //     prefill: {
    //         //         name: PatientName,
    //         //         email: DrEmail,
    //         //         contact: ContactNo.replace(/[^0-9]/g, ''),
    //         //     },
    //         //     theme: {
    //         //         color: '#3399cc',
    //         //     },
    //         // };

    //         // console.log(options);


    //         // const razorpay = new window.Razorpay(options);

    //         // razorpay.on('payment.failed', function (response) {
    //         //     console.error("Payment failed:", response.error);
    //         //     toast.error("Payment failed. Please try again.");
    //         // });

    //         // razorpay.open();
    //     }

    //     catch (error) {
    //         console.error("Error initiating Razorpay payment:", error.response?.data || error.message);
    //         toast.error("Failed to initiate payment. Please try again later.");
    //     }
    // };


    const handlePayment = async () => {
        try {
            if (!Data) {
                toast.warn("Doctor details are missing.");
                return;
            }

            toast.info("Razorpay payment initiated.");

            const response = await axios.post('http://localhost:5000/api/v1/create-order', {
                amount: Data.consultationFee * 100,
            });

            if (response.status === 200) {
                const orderId = response.data.orderId;

                const options = {
                    key: 'rzp_test_mCpQ8Ow7U6g6oR',
                    amount: Data.consultationFee * 100,
                    currency: 'INR',
                    name: Data.name,
                    description: 'Consultation Fee Payment',
                    order_id: orderId,
                    handler: async function (response) {
                        const paymentData = {
                            orderCreationId: orderId,
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            signature: response.razorpay_signature,
                        };

                        try {
                            await axios.post('http://localhost:5000/verify-payment', paymentData);
                            toast.success("Payment successful! Appointment confirmed.");
                            setShowModal(false);
                        } catch (error) {
                            console.error("Payment verification failed:", error);
                            toast.error("Payment verification failed. Please contact support.");
                        }
                    },
                    prefill: {
                        name: PatientName,
                        email: userEmail,
                        contact: ContactNo.replace(/[^0-9]/g, ''),
                    },
                    theme: {
                        color: '#3399cc',
                    },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
                setShowModal(false);

            }
        } catch (error) {
            console.error("Error initiating Razorpay payment:", error.response?.data || error.message);
            toast.error("Failed to initiate payment. Please try again later.");
        }
    };


    const handlePayOnVisit = () => {
        toast.info("Payment will be made during the visit.");
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Data) {
            toast.warn("Necessary information is missing. Please try again!");
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/v1/patient_dashboard', {
                doctorId: Data.id,
                DoctorName: Data.name,
                DrEmail : Data.email,
                PatientName,
                AppointmentDate,
                AppointmentTime,
                ContactNo,
                PatientEmail:userEmail,
                Symptoms,
            });
            toast.success("Appointment booked successfully!");

            setShowModal(true);

            setPatientName('');
            setAppointmentDate('');
            setAppointmentTime('');
            setContactNo('');
            setEmail('');
            setSymptoms('');
        } catch (error) {
            console.error("Error booking appointment:", error.response?.data || error.message);
            toast.error("Failed to book appointment. Please try again!");
        }
    };

    return (
        <>
            <div>
                <button className="backBtn" onClick={hideFormHandler}>Back</button>
                <div className="clinicVisitForm">
                    <h2>Book an Appointment</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="docName">Doctor Name: {Data.name}</label>

                        <label htmlFor="patientName">Patient Name:</label>
                        <input type="text" id="patientName"
                            name="patientName"
                            value={PatientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            required />

                        <label htmlFor="appointmentDate">Appointment Date:</label>
                        <input type="date" id="appointmentDate"
                            name="appointmentDate"

                            value={AppointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                            required />

                        <label htmlFor="appointmentTime">Time:</label>
                        <input type="time" id="appointmentTime"
                            name="appointmentTime"
                            value={AppointmentTime}
                            onChange={(e) => setAppointmentTime(e.target.value)}
                            required />

                        <label htmlFor="contactNumber">Contact Number:</label>
                        <input type="tel" id="contactNumber"
                            name="contactNumber"
                            value={ContactNo}
                            onChange={(e) => setContactNo(e.target.value)}
                            required />

                        <label htmlFor="email">Email: {userEmail}</label>

                        <label htmlFor="symptoms">Symptoms/Reason for Visit:</label>
                        <textarea id="symptoms"
                            name="symptoms" rows="4"
                            value={Symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            required></textarea>

                        <button type="submit" className="submitBtn">Book Appointment</button>
                    </form>
                </div>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modalContent">
                        <h3>Choose Payment Option</h3>
                        <button className="payNowBtn" onClick={handlePayment}>Pay Now</button>
                        <button className="payOnVisitBtn" onClick={handlePayOnVisit}>Pay on Visit</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ClinicVisit;
