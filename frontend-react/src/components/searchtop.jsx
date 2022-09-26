import React from "react";
import TextField from '@mui/material/TextField';
import RoomIcon from '@mui/icons-material/Room';
import InputAdornment from '@mui/material/InputAdornment';


export default function SearchTop() {


    const [searchLocation, setsearchLocation] = React.useState({
        address: ""
    });

    const [incomingData, setincomingData] = React.useState({
        locationAdvice: [],
        cityAdvice: [],
    })

    const [bools, setBools] = React.useState({
        locationSearch: false

    })

    React.useEffect(() => { const timer = setTimeout(() => { fetchLocation() }, 1000); return () => clearTimeout(timer); }, [searchLocation]);

    const fetchLocation = async () => {
        let tempData = [];
        let tempData2 = [];
        const tempQuery = '/locationSearch?' + new URLSearchParams(searchLocation).toString()
        // console.log(tempQuery);
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        };

        // if (!searchLocation.address == "") {
            await fetch(tempQuery, requestOptions)
                .then(response => response.json())
                .then((value) => {
                    value.suburbs.map((i) => { tempData.push(i) }); setincomingData((prev => ({ ...prev, locationAdvice: tempData })));
                    value.cities.map((x) => { tempData2.push(x) }); setincomingData((prev => ({ ...prev, cityAdvice: tempData2 })))
                });
            await console.log(tempData)
        // }
    }


    const EntriesFromServer = (props) => {
        return (
            <>

                <li className="align-items-center m-0">
                    <i className="bi bi-geo-fill"></i><span className="m-3">{props.name}</span><span className="badge bg-primary rounded-pill float-end bg-danger">{props.count}</span>
                </li>

            </>
        )
    }

    return (
        <div className="d-flex justify-content-center pt-3">
            <div className="d-flex flex-row " style={{ "width": "1200px" }}>
                <div>
                    <TextField id="outlined-basic" label="Going to" variant="outlined"
                        // InputProps={{ startAdornment: (<InputAdornment position="start"> <RoomIcon /> </InputAdornment>), }}
                        style={{ "backgroundColor": "white", "width": "330px", "borderRadius": "5px" }}
                        autoComplete="off" onChange={(event) => { setsearchLocation((prev => ({ ...prev, address: event.target.value }))); setBools((prev => ({ ...prev, locationSearch: true }))) }}
                        onBlur={() => { setBools((prev => ({ ...prev, locationSearch: false }))) }}
                        onFocusCapture={() => { setBools((prev => ({ ...prev, locationSearch: true }))) }}
                    />

                    <div className={(!bools.locationSearch) ? "d-none" : "d-flex p-2 animate__animated animate__fadeIn"} style={{
                        "width": "330px", "backgroundColor": "white", "minHeight": "200px", "border": "1px solid  rgba(221, 221, 221, 0.744)",
                        "borderRadius": "5px"
                    }}>
                        <div>
                            <p className="boldSmallHeading">City</p>
                            <ul style={{ "listStyle": "none", "margin": "0", "padding": "0" }}>
                                {incomingData.cityAdvice.map((z,index) => { return <EntriesFromServer key={index} name={z[0]} count={z[1]} /> })}
                            </ul>

                            <hr style={{ "width": "310px" }}></hr>

                            <p className="boldSmallHeading">District</p>
                            <ul style={{ "listStyle": "none", "margin": "0", "padding": "0" }}>
                                {incomingData.locationAdvice.map((y,index) => { return <EntriesFromServer key={index} name={y[0]} count={y[1]} /> })}
                            </ul>
                        </div>

                    </div>

                </div>



            </div>




        </div>


    )
}


