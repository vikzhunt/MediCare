import '../styles/Brochure.css'
import { Link } from 'react-router-dom';
import bgImg from "../images/DASbg.png"


const Brochure = (props) => {
    const SIgnFreeHandler = () => {
        props.setLogin(false)
    }
    return (
        <div className="brochure">
            <div>
                <img className="image" src={bgImg} alt="doctor"></img>
            </div>

            <div className='homeContent'>
                <h2>Quality Doctors</h2>
                <h3>for your Best</h3>
                <h3>Care</h3>

            </div>
            <div>
                <button className='Signbtn' onClick={SIgnFreeHandler}><Link to="/login">Sign up FREE today </Link></button>
            </div>
        </div>
    )
}


export default Brochure;