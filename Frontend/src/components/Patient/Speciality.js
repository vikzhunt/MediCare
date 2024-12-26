import "../../styles/PatientStyle/Speciality.css"

const Speciality = (props) => {
    const spec = ["All Doctors", "General Physician", "Pediatrician", "Neurologist", "Gynaecologist",];

    const filterbtn = (item) => {
        props.setSpeciality(item);
    };

    return (
        <div>
            <h1 className="AllDrHead">All Doctors</h1>
            <div className="CardContainer">
                {spec.map((item) => (
                    <button className="specBtn" onClick={() => filterbtn(item)}>
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Speciality;
