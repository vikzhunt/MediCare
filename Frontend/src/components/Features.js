import '../styles/Features.css'

const Features = (props) => {
    return (
        <div className="cards">
            {
                props.Featuredata.map((item) => {
                    return (
                        <div className="card">
                            <h3 className='cardTitle'>{item.title}</h3>
                            <p>{item.para}</p>
                        </div>
                    )
                })
            }

        </div>
    )
}


export default Features