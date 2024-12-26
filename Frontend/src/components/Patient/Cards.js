import Card from "./Card.js";
import "../../styles/PatientStyle/Card.css"

const Cards = (props) => {
    console.log(props.doctors);
    
    const filteredData = props.speciality === "All Doctors" ? props.doctors : props.doctors.filter(
        (individual) => individual.specialist === props.speciality
    );
    
    
    const setForm = props.setForm
    const setFormId= props.setFormId

    return (

        <div className="cardContainer">
            {filteredData.map((individual) => (
                <Card key={individual.id} individual={individual} setForm={setForm} setFormId={setFormId} />
            ))}
        </div>


    );
};

export default Cards;
