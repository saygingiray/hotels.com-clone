import React from "react";



export default function PropertyClass(props) {

//useEffect ile yukarı gönderilecek.

    const [value, setValue] = React.useState({
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false
    });

    React.useEffect(() => { props.sendData(value) }, [value]);

    return (
        <>

            <div className="textMediumBold mt-3">Property Class</div>
            <div className="d-flex flex-row align-items-center mt-2">
                <div onClick= {() => { setValue((prev) => ({ ...prev, 1: !value[1] })) }} className="starRating me-2" style={(value[1])? {"backgroundColor" : " rgb(142, 187, 236)"} : {"backgroundColor" : ""} }>1 <i className="bi bi-star-fill"></i></div>
                <div onClick= {() => { setValue((prev) => ({ ...prev, 2: !value[2] })) }} className="starRating me-2" style={(value[2])? {"backgroundColor" : " rgb(142, 187, 236)"} : {"backgroundColor" : ""} }>2 <i class="bi bi-star-fill"></i></div>
                <div onClick= {() => { setValue((prev) => ({ ...prev, 3: !value[3] })) }} className="starRating me-2" style={(value[3])? {"backgroundColor" : " rgb(142, 187, 236)"} : {"backgroundColor" : ""} }>3 <i class="bi bi-star-fill"></i></div>
                <div onClick= {() => { setValue((prev) => ({ ...prev, 4: !value[4] })) }} className="starRating me-2" style={(value[4])? {"backgroundColor" : " rgb(142, 187, 236)"} : {"backgroundColor" : ""} }>4 <i class="bi bi-star-fill"></i></div>
                <div onClick= {() => { setValue((prev) => ({ ...prev, 5: !value[5] })) }} className="starRating me-2" style={(value[5])? {"backgroundColor" : " rgb(142, 187, 236)"} : {"backgroundColor" : ""} }>5 <i class="bi bi-star-fill"></i></div>
            </div>
        </>)
}