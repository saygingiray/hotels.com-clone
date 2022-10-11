import React from "react";



export default function PropertyClass(props) {

    const [value, setValue] = React.useState({
        "1 Star": false,
        "2 Star": false,
        "3 Star": false,
        "4 Star": false,
        "5 Star": false
    });

    const data = () => {
        let tempARR = []
        Object.keys(value).forEach(key => {
          if  (value[key]==true) { tempARR.push(key)} 
        });
        return tempARR
    }


    React.useEffect(() => { props.sendData(data());  }, [value]);
    React.useEffect(() => { changeChecked() }, [props]);

    const changeChecked = () => {
        // console.log(props.changeXXX)
        let tempOBJ = {
            "1 Star": false,
            "2 Star": false,
            "3 Star": false,
            "4 Star": false,
            "5 Star": false
        }
        { props.changedByXbutton.map((i) => { tempOBJ[i] = true }) }

        // console.log(tempOBJ)
        // console.log(state)
        let diff = Object.keys(value).reduce((diff, key) => {
            if (tempOBJ[key] === value[key]) return diff
            return {
                ...diff,
                [key]: value[key]
            }
        }, {})
        // console.log(Object.keys(diff))
        let changedKey = Object.keys(diff)[0]
        if (Object.keys(diff).length > 0) { setValue(tempOBJ) }
    }

    return (
        <>

            <div className="textMediumBold">Property Class</div>
            <div className="d-flex flex-row justify-content-between align-items-center mt-1">
                <div onClick={() => { setValue((prev) => ({ ...prev, "1 Star": !value["1 Star"] })) }} className=" starRating " style={(value["1 Star"]) ? { "backgroundColor": " rgb(142, 187, 236)" } : { "backgroundColor": "" }}>1 <i className="bi bi-star-fill"></i></div>
                <div onClick={() => { setValue((prev) => ({ ...prev, "2 Star": !value["2 Star"] })) }} className=" starRating " style={(value["2 Star"]) ? { "backgroundColor": " rgb(142, 187, 236)" } : { "backgroundColor": "" }}>2 <i className="bi bi-star-fill"></i></div>
                <div onClick={() => { setValue((prev) => ({ ...prev, "3 Star": !value["3 Star"] })) }} className=" starRating " style={(value["3 Star"]) ? { "backgroundColor": " rgb(142, 187, 236)" } : { "backgroundColor": "" }}>3 <i className="bi bi-star-fill"></i></div>
                <div onClick={() => { setValue((prev) => ({ ...prev, "4 Star": !value["4 Star"] })) }} className=" starRating " style={(value["4 Star"]) ? { "backgroundColor": " rgb(142, 187, 236)" } : { "backgroundColor": "" }}>4 <i className="bi bi-star-fill"></i></div>
                <div onClick={() => { setValue((prev) => ({ ...prev, "5 Star": !value["5 Star"] })) }} className=" starRating " style={(value["5 Star"]) ? { "backgroundColor": " rgb(142, 187, 236)" } : { "backgroundColor": "" }}>5 <i className="bi bi-star-fill"></i></div>
            </div>
        </>)
}