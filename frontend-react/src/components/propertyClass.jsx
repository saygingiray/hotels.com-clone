import React from "react";



export default function PropertyClass(props) {

    const [value, setValue] = React.useState({
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false
    });

    const data = () => {
        let tempARR = []
        Object.keys(value).forEach(key => {
          if  (value[key]==true) { tempARR.push(key)} 
        });
        return tempARR
    }


    React.useEffect(() => { props.sendData(data());  }, [value]);

    return (
        <>

            <div className="textMediumBold">Property Class</div>
            <div className="d-flex flex-row justify-content-between align-items-center mt-1">
                <div onClick={() => { setValue((prev) => ({ ...prev, 1: !value[1] })) }} className=" starRating " style={(value[1]) ? { "backgroundColor": " rgb(142, 187, 236)" } : { "backgroundColor": "" }}>1 <i className="bi bi-star-fill"></i></div>
                <div onClick={() => { setValue((prev) => ({ ...prev, 2: !value[2] })) }} className=" starRating " style={(value[2]) ? { "backgroundColor": " rgb(142, 187, 236)" } : { "backgroundColor": "" }}>2 <i className="bi bi-star-fill"></i></div>
                <div onClick={() => { setValue((prev) => ({ ...prev, 3: !value[3] })) }} className=" starRating " style={(value[3]) ? { "backgroundColor": " rgb(142, 187, 236)" } : { "backgroundColor": "" }}>3 <i className="bi bi-star-fill"></i></div>
                <div onClick={() => { setValue((prev) => ({ ...prev, 4: !value[4] })) }} className=" starRating " style={(value[4]) ? { "backgroundColor": " rgb(142, 187, 236)" } : { "backgroundColor": "" }}>4 <i className="bi bi-star-fill"></i></div>
                <div onClick={() => { setValue((prev) => ({ ...prev, 5: !value[5] })) }} className=" starRating " style={(value[5]) ? { "backgroundColor": " rgb(142, 187, 236)" } : { "backgroundColor": "" }}>5 <i className="bi bi-star-fill"></i></div>
            </div>
        </>)
}