import React from "react";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SearchTop() {

    // STATES

    const [searchLocation, setsearchLocation] = React.useState({
        address: ""
    });

    const [dateValue, setdateValue] = React.useState({
        checkin: "",
        checkout: ""
    });

    const [roomDetails, setroomDetails] = React.useState({
        adults: 1,
        children: {
            numberX: 0,
            "1": "0",
            "2": "0",
            "3": "0",
            "4": "0",
            "5": "0",
            "6": "0"

        }

    })

    const [incomingData, setincomingData] = React.useState({
        locationAdvice: [],
        cityAdvice: [],
    })

    const [bools, setBools] = React.useState({
        locationSearchFocus: false,
        travellersPopup: false,

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

    const ChildrenAges = (props) => {

        return (
            <div className="d-flex mt-2">
                <FormControl sx={{ minWidth: 165 }} >
                    <InputLabel id="Children Age">Age of Children {Number(props.number)}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"

                        id="demo-simple-select"
                        value={props.valueY}
                        label="Age of Children 1"
                        onChange={(event) => { setroomDetails((prev) => ({ ...prev, children: { ...prev.children, [props.number]: event.target.value } })) }}
                    >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={13}>13</MenuItem>
                        <MenuItem value={14}>14</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={16}>16</MenuItem>
                        <MenuItem value={17}>17</MenuItem>
                        <MenuItem value={18}>18</MenuItem>
                    </Select>
                </FormControl>
            </div>
        )
    }

    const ChildrenLoopForAges = () => {
        let tempChildren = [];
        for (let i = 1; i <= roomDetails.children.numberX; i++) {
            tempChildren.push(<ChildrenAges number={i} key={i} valueY={roomDetails.children[i]} />);
        }
        return tempChildren;
    };



    return (
        <div className="d-flex justify-content-center pt-3">
            <div className="d-flex flex-row " style={{ "width": "1200px" }}>
                <div>

                    <TextField id="outlined-basic" label="Going to"
                        style={{ "backgroundColor": "#ffffff", "width": "330px", "borderRadius": "5px" }}
                        autoComplete="off" onChange={(event) => { setsearchLocation((prev => ({ ...prev, address: event.target.value }))); setBools((prev => ({ ...prev, locationSearchFocus: true }))) }}
                        onBlur={() => { setBools((prev => ({ ...prev, locationSearchFocus: false }))) }}
                        onFocusCapture={() => { setBools((prev => ({ ...prev, locationSearchFocus: true }))) }}
                        variant="filled"
                        sx={{ input: { background: "white" } }}
                    />

                    {/* searching tab starting point */}

                    <div className={(!bools.locationSearchFocus) ? "d-none" : "d-flex p-2 animate__animated animate__fadeIn"} style={{
                        "width": "330px", "backgroundColor": "white", "border": "1px solid  rgba(221, 221, 221, 0.744)",
                        "borderRadius": "5px", "position": "-webkit-sticky", "position": "sticky"
                    }}>
                        <div> {searchLocation.address == "" ? <p>Please search for any city or district. </p> : <>
                            <p className="boldSmallHeading">City</p>
                            <ul style={{ "listStyle": "none", "margin": "0", "padding": "0" }}>
                                {incomingData.cityAdvice.map((z, index) => { return <EntriesFromServer key={index} name={z[0]} count={z[1]} /> })}
                            </ul>

                            <hr style={{ "width": "310px" }}></hr>

                            <p className="boldSmallHeading">District</p>
                            <ul style={{ "listStyle": "none", "margin": "0", "padding": "0" }}>
                                {incomingData.locationAdvice.map((y, index) => { return <EntriesFromServer key={index} name={y[0]} count={y[1]} /> })}
                            </ul></>}
                        </div>
                    </div>
                </div>

                {/* date-picker starting point */}

                <div className="mx-2 bg-white" style={{ "width": "150px", "maxHeight": "56px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            label="Check-in Date"
                            disablePast={true}
                            closeOnSelect={true}
                            inputFormat="DD/MM/YYYY"
                            value={dateValue.checkin || null}
                            onChange={(newValue) => { (dateValue.checkout == "") ? setdateValue((prev) => ({ checkout: newValue, checkin: newValue })) : setdateValue((prev) => ({ ...prev, checkin: newValue })) }}
                            renderInput={(params) => <TextField {...params}
                                sx={{ input: { background: "white" } }}
                                variant="filled"
                            />} />
                    </LocalizationProvider>
                </div>
                <div className="mx-2 bg-white" style={{ "width": "150px", "maxHeight": "56px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            label="Check-out Date"
                            inputFormat="DD/MM/YYYY"
                            closeOnSelect={true}
                            value={dateValue.checkout || null}
                            onChange={(newValue2) => { setdateValue((prev) => ({ ...prev, checkout: newValue2 })); }}
                            minDate={dateValue.checkin}
                            renderInput={(params2) => <TextField {...params2}
                                sx={{ input: { background: "white" } }}
                                variant="filled"
                            />} />
                    </LocalizationProvider>
                </div>

                {/* Travellers starting point */}

                <div className="mx-2" >
                    <TextField
                        label="Travellers" variant="filled"
                        sx={{ input: { background: "white" } }}
                        onClickCapture={() => { setBools((prev) => ({ ...prev, travellersPopup: true })) }}
                        value={roomDetails.adults + " adults " + roomDetails.children.numberX + " children"}

                    />
                    <Modal
                        open={bools.travellersPopup}
                        onClose={() => { setBools((prev) => ({ ...prev, travellersPopup: false })) }}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"

                    >
                        <div className="d-flex p-4 flex-column" style={{
                            "position": 'absolute',
                            "top": '10%',
                            "left": '35%',
                            "minWidth": "400px",
                            "maxWidth": "400px",
                            "minHeight": "600px",
                            "backgroundColor": "white"

                        }}>
                            <div><a href="#"><i className="bi bi-x-lg" onClick={() => { setBools((prev) => ({ ...prev, travellersPopup: false })) }} style={{ "color": "red" }}></i></a> <span className="mx-3 textMediumBold" >Travellers</span></div>
                            <hr></hr>
                            <span className="textMediumBold">Room-1</span>
                            <div className="d-flex flex-row justify-content-between align-items-center my-2 textSmall" >
                                <div >Adults</div>
                                <div className="d-flex flex-row">
                                    <button type="button" className="btn btn-outline-secondary plusMinusButtons p-0"
                                        disabled={(roomDetails.adults == 1) ? true : false}
                                        onClick={() => { setroomDetails((prev) => ({ ...prev, adults: roomDetails.adults - 1 })) }}
                                    >-</button>
                                    <div className="d-flex mx-3 justify-content-center align-items-center" style={{ "width": "20px" }}>{roomDetails.adults}</div>
                                    <button type="button" className="btn btn-outline-secondary plusMinusButtons p-0"
                                        onClick={() => { setroomDetails((prev) => ({ ...prev, adults: roomDetails.adults + 1 })) }}
                                        disabled={(roomDetails.adults == 14) ? true : false}
                                    >+</button>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center my-2 textSmall" >
                                <div className="align-items-center">Children <br></br> (Age 0-17) </div>
                                <div className="d-flex flex-row">
                                    <button type="button" className="btn btn-outline-secondary plusMinusButtons p-0"
                                        disabled={(roomDetails.children.numberX == 0) ? true : false}
                                        onClick={() => { setroomDetails((prev) => ({ ...prev, children: { ...prev.children, numberX: roomDetails.children.numberX - 1 } })) }}
                                    >-</button>
                                    <div className="d-flex mx-3 justify-content-center align-items-center" style={{ "width": "20px" }}>{roomDetails.children.numberX}</div>
                                    <button type="button" className="btn btn-outline-secondary plusMinusButtons p-0"
                                        disabled={(roomDetails.children.numberX == 6) ? true : false}
                                        onClick={() => { setroomDetails((prev) => ({ ...prev, children: { ...prev.children, numberX: roomDetails.children.numberX + 1 } })) }}
                                    >+</button>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-between flex-wrap mt-3" style={{ "maxWidth": "400px" }}>

                                {(roomDetails.children.numberX == 0) ? null :

                                    <ChildrenLoopForAges />




                                }










                            </div>

                        </div>
                    </Modal>
                </div>
            </div>




        </div>


    )
}


