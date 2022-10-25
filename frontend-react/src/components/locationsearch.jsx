import React from "react";
import TextField from '@mui/material/TextField';

const EntriesFromServer = (props) => {

    return (
        <li onMouseDown={() => props.clickXX()} className="align-items-center m-0">
            <i className="bi bi-geo-fill"></i>
            <span role="button" className="m-3">{props.name}</span><span className="badge bg-primary rounded-pill float-end bg-danger">{props.count}</span>
        </li>
    )
}



export default function LocationSearchComponent(props) {



    return (<>
        

            <TextField id="outlined-basic" label="Going to"
                sx={{ input: { background: "white", width: (props.pageWidth > 650) ? "330px" : "370px" } }}
                autoComplete="off"
                onChange={props.onchangeX}
                onBlur={props.onblurX}
                onFocusCapture={props.onfocuscaptureX}
                variant="filled"
                value= {props.addressX}
            />

            {/* searching tab starting point */}

            <div  id="tries" onBlur={props.onblurX}  tabIndex="0" className={(!props.locationsearchfocusX) ? "d-none" : "p-2 animate__animated animate__fadeIn"} style={{
                "width": (props.pageWidth > 650) ? "354px" : "380px", "backgroundColor": "white", "border": "1px solid  rgba(221, 221, 221, 0.744)",
                "borderRadius": "5px",
                "minHeight": "200px",
                // "position": "-webkit-sticky", 
                // "position": "sticky"
                "position": "absolute",
                "zIndex": "5"


            }}>
                <div> {props.addressX == "" ? <p>Please press spacebar to see all alternatives in used database. </p> : <>

                    {(props.preloadX) ? <>
                        <div className="preloader1 my-3"  ></div>
                        <div className="preloader1 my-3" ></div>
                        <div className="preloader1 my-3" ></div>
                        <div className="preloader1 my-3" ></div>
                        <div className="preloader1 my-3" ></div>
                    </> : props.cityadviceX.length === 0 ? <div>{props.addressX} is not found in database.</div> :
                        <> <p className="boldSmallHeading">City</p>
                            <ul style={{ "listStyle": "none", "margin": "0", "padding": "0" }}>
                                {props.cityadviceX.map((z, index) => { return <EntriesFromServer clickXX={() => { props.clickXCity(z[0]) }} key={index} name={z[0]} count={z[1]} /> })}
                            </ul> </>
                    }
                    <hr style={{ "width": (props.pageWidth > 650) ? "330px" : props.pageWidth }}></hr>


                    {(props.preloadX) ? <>
                        <div className="preloader1 my-3" ></div>
                        <div className="preloader1 my-3" ></div>
                        <div className="preloader1 my-3" ></div>
                        <div className="preloader1 my-3" ></div>
                        <div className="preloader1 my-3" ></div>
                    </> :
                        props.cityadviceX.length === 0 ? null :
                            <><p className="boldSmallHeading">District</p>
                                <ul style={{ "listStyle": "none", "margin": "0", "padding": "0" }}>
                                    {props.locationadviceX.map((y, index) => { return <EntriesFromServer clickXX={() => { props.clickXSuburb(y[0]) }} key={index} name={y[0]} count={y[1]} /> })}
                                </ul></>}
                </>}
                </div>
            </div>
        
        </>   )
}