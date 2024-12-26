import { useState } from "react";
import "../styles/Faq.css";

const Faqs = (props) => {
    const [answer, setAnswer] = useState({});

    const answerHandler = (id) => {
        setAnswer((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    }
    return (
        <>
            <h3 className="FaqHeading">Frequently Asked Questions</h3>
            <div className="FaqContainer">
                {props.Faqdata.map((item) => {
                    return (
                        <button className="FaqItem" onClick={() => answerHandler(item.id)}>
                            {item.question} <span class="arrow">▼</span>
                            {answer[item.id] && <p>{item.answer}</p>}
                        </button>
                    );
                })}
            </div>
        </>
    );
};

export default Faqs;
