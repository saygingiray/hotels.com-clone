import React from "react";
import { TextField } from "@mui/material";


const NamesFromServer = (props) => {
    return (
        <li className="align-items-center my-3">
            <div className="d-flex flex-row align-items-center">
                <div className="me-2"><i className="bi bi-building" style={{ "fontSize": "20px" }}></i></div>
                <div style={{ "lineHeight": "18px" }}><span className="">{props.name}</span><br></br><span className="textSmall">{props.address}</span> </div>
            </div>
        </li>
    )
}

export default function NameSearch(props) {

    return (

        <>
            <div className="d-flex" style={{ "width": "250px" }}>
                <div><p style={{ "fontSize": "20px", "fontWeight": "900" }}>Search Property by Name </p>
                    <TextField
                        sx={{ input: { background: "white", width: "220px" } }}
                        label="Property Name" variant="filled"
                        autoComplete="off"
                        placeholder="e.g. Hilton"
                        onChangeCapture={props.onchangeX}
                        onBlurCapture={props.onblurcaptureX}
                        

                    />
                </div>
            </div>
            <div style={{ "position": "relative" }}>
                <div className={(!props.nameSearchFocusX || props.searchNameNameX < 1) ? "d-none" : "d-flex p-2 animate__animated animate__fadeIn"} style={{
                    "width": "354px", "backgroundColor": "white", "border": "1px solid  rgba(221, 221, 221, 0.744)",
                    "borderRadius": "5px",
                    // "position": "-webkit-sticky", 
                    // "position": "sticky"
                    "position": "absolute",
                    "zIndex": "4",
                }}>
                    <ul style={{ "listStyle": "none", "margin": "0", "padding": "0" }}>

                        {props.nameAdviceX.map((z, index) => { return <NamesFromServer key={index} name={z.name} address={z.address.street} /> })}

                    </ul>



                </div>
            </div>
            <div></div>
        </>
    )
}