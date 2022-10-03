import React from "react";
import TextField from '@mui/material/TextField';

const EntriesFromServer = (props) => {
    return (
        <li className="align-items-center m-0">
            <i className="bi bi-geo-fill"></i>
            <span className="m-3">{props.name}</span><span className="badge bg-primary rounded-pill float-end bg-danger">{props.count}</span>
        </li>
    )
}

export default function LocationSearchComponent(props) {
    return (
        <div className="me-2 bg-white">

            <TextField id="outlined-basic" label="Going to"
                sx={{ input: { background: "white", width: "330px" } }}
                autoComplete="off"
                onChange={props.onchangeX}
                onBlur={props.onblurX}
                onFocusCapture={props.onfocuscaptureX}
                variant="filled"
            />

            {/* searching tab starting point */}

            <div className={(!props.locationsearchfocusX) ? "d-none" : "d-flex p-2 animate__animated animate__fadeIn"} style={{
                "width": "354px", "backgroundColor": "white", "border": "1px solid  rgba(221, 221, 221, 0.744)",
                "borderRadius": "5px", 
                // "position": "-webkit-sticky", 
                // "position": "sticky"
                "position" : "absolute",
                "zIndex" : "5"


            }}>
                <div> {props.addressX == "" ? <p>Please search for any city or district. </p> : <>
                    <p className="boldSmallHeading">City</p>
                    <ul style={{ "listStyle": "none", "margin": "0", "padding": "0" }}>
                        {props.cityadviceX.map((z, index) => { return <EntriesFromServer key={index} name={z[0]} count={z[1]} /> })}
                    </ul>

                    <hr style={{ "width": "330px" }}></hr>

                    <p className="boldSmallHeading">District</p>
                    <ul style={{ "listStyle": "none", "margin": "0", "padding": "0" }}>
                        {props.locationadviceX.map((y, index) => { return <EntriesFromServer key={index} name={y[0]} count={y[1]} /> })}
                    </ul></>}
                </div>
            </div>
        </div>
    )
}