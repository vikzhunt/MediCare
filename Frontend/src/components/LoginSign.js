import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/LoginRegister.css'

// Images
import Img01 from '../images/LoginRegister/bg1.svg';
import Img02 from '../images/LoginRegister/bg2.svg';
import ImgEyeHide from '../images/LoginRegister/eye-hide.png';
import ImgEmail from "../images/LoginRegister/email.png";
import ImgLock from "../images/LoginRegister/lock.png";
import ImgUser  from "../images/LoginRegister/user.png";
import ImgEye from "../images/LoginRegister/eye.png";
const initialState = {
    isPasswordShown: false,
    isEyeImage: true,
    password: '',
    username: '',
    email: '',
    userType: 'Patient', // Default user type
    isActive: true,
    errors: {},
};

const LoginSign = (props) => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();

    const toggleForm = () => {
        setState({ ...state, isActive: !state.isActive, errors: {} });
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    };

    const PasswordVisibility = () => {
        setState({ ...state, isPasswordShown: true, isEyeImage: false });
    };

    const PasswordNotVisibility = () => {
        setState({ ...state, isPasswordShown: false, isEyeImage: true });
    };

    const validateForm = () => {
        const { username, email, password } = state;
        const errors = {};

        if (state.isActive && !username) {
            errors.username = 'Username is required';
        }

        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email address is invalid';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        setState({ ...state, errors });
        return Object.keys(errors).length === 0;
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const { email, password, userType } = state;
        try {
            const response = await axios.post('http://localhost:5000/api/v1/login', { email, password });
            const { token, role } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
            navigate(role === 'Admin' ? '/admin_dashboard' : role === 'Doctor' ? '/doctor_dashboard' : '/patient_dashboard');
        } catch (error) {
            toast.error('Login failed. Please check your credentials and try again.');
        }
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        const { username, email, password, userType } = state;
        try {
            const response = await axios.post('http://localhost:5000/api/v1/signup', { email, username, password, role: userType });
            const { token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
            navigate(userType === 'Admin' ? '/admin_dashboard' : '/patient_dashboard');
        } catch (error) {
            toast.error('Signup failed. Please try again.');
        }
    };

    const { errors } = state;

    return (
        <div className="Login-Section">
            <ToastContainer />
            <div className={state.isActive ? "login-container" : "login-container sign-up-mode"} id="container">
                <div className="forms-container">
                    <div className="signin-signup">

                        {/* ----------------------------- Login Form ----------------------------- */}
                        <form className="sign-in-form" onSubmit={handleLogin}>
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <label>User Type:</label>
                                <select name="userType" value ={state.userType} onChange={onChange}>
                                    <option value="Patient">Patient</option>
                                    <option value="Doctor">Doctor</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="input-field">
                                <img src={ImgEmail} className="fas" alt="Email Icon" />
                                <input type="email" name="email" value={state.email} placeholder="Email" onChange={onChange} />
                                {errors.email && <p className="error">{errors.email}</p>}
                            </div>
                            <div className="input-field">
                                <img src={ImgLock} className="fas" alt="Lock Icon" />
                                <input
                                    type={state.isPasswordShown ? "text" : "password"}
                                    name="password"
                                    value={state.password}
                                    placeholder="Password"
                                    onChange={onChange}
                                />
                                <img
                                    src={state.isEyeImage ? ImgEye : ImgEyeHide}
                                    className="eye"
                                    alt="Eye Icon"
                                    onClick={state.isPasswordShown ? PasswordNotVisibility : PasswordVisibility}
                                />
                                {errors.password && <p className="error">{errors.password}</p>}
                            </div>
                            <input type="submit" value="Login" className="btn solid" />
                        </form>

                        {/* ----------------------------- Registration Form ----------------------------- */}
                        <form className="sign-up-form" onSubmit={handleSignUp}>
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <label>User Type:</label>
                                <select name="userType" value={state.userType} onChange={onChange}>
                                    <option value="Patient">Patient</option>
                                    <option value="Doctor">Doctor</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="input-field">
                                <img src={ImgUser } className="fas" alt="User  Icon" />
                                <input
                                    type="text"
                                    name="username"
                                    value={state.username}
                                    placeholder="Username"
                                    onChange={onChange}
                                />
                                {errors.username && <p className="error">{errors.username}</p>}
                            </div>
                            
                            <div className="input-field">
                                <img src={ImgEmail} className="fas" alt="Email Icon" />
                                <input
                                    type="email"
                                    name="email"
                                    value={state.email}
                                    placeholder="Email"
                                    onChange={onChange}
                                />
                                {errors.email && <p className="error">{errors.email}</p>}
                            </div>
                            <div className="input-field">
                                <img src={ImgLock} className="fas" alt="Lock Icon" />
                                <input
                                    type={state.isPasswordShown ? "text" : "password"}
                                    name="password"
                                    value={state.password}
                                    placeholder="Password"
                                    onChange={onChange}
                                />
                                <img
                                    src={state.isEyeImage ? ImgEye : ImgEyeHide}
                                    className="eye"
                                    alt="Eye Icon"
                                    onClick={state.isPasswordShown ? PasswordNotVisibility : PasswordVisibility}
                                />
                                {errors.password && <p className="error">{errors.password}</p>}
                            </div>
                            <input type="submit" className="btn" value="Sign up" />
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here?</h3>
                            <p>
                                Join us and explore the benefits of our platform.
                            </p>
                            <button className="btn transparent" id="sign-up-btn" onClick={toggleForm}>Sign up</button>
                        </div>
                        <img src={Img01} className="image" alt="Background" />
                    </div>

                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us</h3>
                            <p>
                                Welcome back! Please log in to continue.
                            </p>
                            <button className="btn transparent" id="sign-in-btn" onClick={toggleForm}>Sign in</button>
                        </div>
                        <img src={Img02} className="image" alt="Background" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSign;