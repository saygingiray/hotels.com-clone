import React from "react";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';




export default function SearchTop() {

    const [searchLocation, setsearchLocation] = React.useState({
        address: ""
    });

    const [dateValue, setdateValue] = React.useState({
        checkin: "",
        checkout: ""
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

        if (!searchLocation.address == "") {
            await fetch(tempQuery, requestOptions)
                .then(response => response.json())
                .then((value) => {
                    value.suburbs.map((i) => { tempData.push(i) }); setincomingData((prev => ({ ...prev, locationAdvice: tempData })));
                    value.cities.map((x) => { tempData2.push(x) }); setincomingData((prev => ({ ...prev, cityAdvice: tempData2 })))
                });
            await console.log(tempData)
        }
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

                    <TextField id="outlined-basic" label="Going to"
                        style={{ "backgroundColor": "#ffffff", "width": "330px", "borderRadius": "5px" }}
                        autoComplete="off" onChange={(event) => { setsearchLocation((prev => ({ ...prev, address: event.target.value }))); setBools((prev => ({ ...prev, locationSearch: true }))) }}
                        onBlur={() => { setBools((prev => ({ ...prev, locationSearch: false }))) }}
                        onFocusCapture={() => { setBools((prev => ({ ...prev, locationSearch: true }))) }}
                        variant="filled"
                        sx={{ input: { background: "white" } }}
                    />


                    <div className={(!bools.locationSearch) ? "d-none" : "d-flex p-2 animate__animated animate__fadeIn"} style={{
                        "width": "330px", "backgroundColor": "white", "minHeight": "200px", "border": "1px solid  rgba(221, 221, 221, 0.744)",
                        "borderRadius": "5px", "position": "-webkit-sticky", "position": "sticky"
                    }}>
                        <div>
                            <p className="boldSmallHeading">City</p>
                            <ul style={{ "listStyle": "none", "margin": "0", "padding": "0" }}>
                                {incomingData.cityAdvice.map((z, index) => { return <EntriesFromServer key={index} name={z[0]} count={z[1]} /> })}
                            </ul>

                            <hr style={{ "width": "310px" }}></hr>

                            <p className="boldSmallHeading">District</p>
                            <ul style={{ "listStyle": "none", "margin": "0", "padding": "0" }}>
                                {incomingData.locationAdvice.map((y, index) => { return <EntriesFromServer key={index} name={y[0]} count={y[1]} /> })}
                            </ul>
                        </div>

                    </div>

                </div>
                <div className="mx-2 bg-white" style={{ "width": "150px", "maxHeight": "56px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker

                            label="Check-in Date"
                            disablePast="true"
                            closeOnSelect="true"
                            inputFormat="DD/MM/YYYY"
                            value={dateValue.checkin || null}
                            onChange={(newValue) => { (dateValue.checkout == "") ? setdateValue((prev) => ({ checkout: newValue, checkin: newValue })) : setdateValue((prev) => ({ ...prev, checkin: newValue })) }}
                            renderInput={(params) => <TextField {...params}
                                sx={{ input: { background: "white" } }}
                                variant="filled"
                            />}
                        />
                    </LocalizationProvider>
                </div>
                <div className="mx-2 bg-white" style={{ "width": "150px", "maxHeight": "56px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            label="Check-out Date"
                            inputFormat="DD/MM/YYYY"
                            value={dateValue.checkout || null}
                            onChange={(newValue2) => { setdateValue((prev) => ({ ...prev, checkout: newValue2 })); }}
                            minDate={dateValue.checkin}
                            renderInput={(params2) => <TextField {...params2}
                            sx={{ input: { background: "white" } }}
                            variant="filled" 
                             />}
                           
                           
                        />
                    </LocalizationProvider>
                </div>

            </div>




        </div>


    )
}


