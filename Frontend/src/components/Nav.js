import { Link } from 'react-router-dom';
import '../styles/Nav.css';

import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Nav = (props) => {
    const LoginHandler = () => {
        props.setLogin(true)
    }

    const SigninHandler = () => {
        props.setLogin(false)
    }

    const NotThere = ()=>{
        toast.info("Coming Soon");
    }
    return (
        <div className="Navi">  
            <div>MediCare</div>
            <div className='gen'>
                <button className='genBtn'>Home</button>
                <button className='genBtn'>Services</button>
                <button className='genBtn'>FAQ's</button>
                <button className='genBtn' onClick={NotThere}>Blog</button>
            </div>
            <div className='loginSign'>
                <button className='' onClick={LoginHandler}><Link to="/login">Login</Link></button>
                <button className='signUp' onClick={SigninHandler}><Link to="/login">SignUp</Link></button>

            </div>
        </div>
        
    )
}


export default Nav;