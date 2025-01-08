import '../styles/Brochure.css'
import { Link } from 'react-router-dom';
import bgImg from "../images/img.png";


const Brochure = (props) => {
    const SIgnFreeHandler = () => {
        props.setLogin(false)
    }
    return (
        
        <div className="brochure">
            <style>
                {`
                @keyframes typing {
                    0% { width: 0; }
                    50% { width: 100%; }
                    100% { width: 100%; }
                }
                @keyframes blink {
                    50% { border-color: transparent; }
                }
                .typing-animation {
                    display: inline-block;
                    white-space: nowrap;
                    overflow: hidden;
                    border-right: 3px solid;
                    width: 0;
                    max-width: 3xl;
                    animation: typing 7s steps(50, end) infinite alternate, blink 0.75s infinite;
                }
                `}
            </style>
            <div>
                <img className="image" src={bgImg} alt="doctor"></img>
            </div>
            <div className='homeContent'>
                <h1 className="text-5xl font-bold mb-6 typing-animation">
                    Welcome to Medi<span className="text-green-900/80">Care</span>!
                </h1>
                <h5>Your Health, Our Priority:</h5>
                <h5> Predict, Prevent,</h5>
                <h5>and Thrive with Confidence.</h5>

            </div>
            <div>
                <button className='Signbtn' onClick={SIgnFreeHandler}><Link to="/login">Sign Up for FREE today </Link></button>
            </div>
        </div>
    )
}


export default Brochure;