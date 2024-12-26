import Nav from "./Nav.js";
import Brochure from "./Brochure.js";
import Features from "./Features.js";
import Footer from "./Footer.js";
import Faqs from "./Faqs.js";
import Featuredata from "../Data/Featuredata.js";
import Faqdata from "../Data/Faqdata.js";
import "../styles/Homepage.css"

import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Homepage = (props) => {
    

    return (
        <div className="Homepage">
            <Nav setLogin={props.setLogin}></Nav>
            <Brochure setLogin={props.setLogin}></Brochure>
            <Features Featuredata={Featuredata}></Features>
            <Faqs Faqdata={Faqdata}></Faqs>
            <Footer></Footer>
        </div>
    )
}

export default Homepage

