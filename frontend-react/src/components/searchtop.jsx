import React from "react";
import LocationSearchComponent from "./locationsearch";
import DatePickerInAndOut from "./datepickerinout";
import TravellersComponent from "./travellers";
import { TextField } from "@mui/material";
import { locationFetch , nameFetch } from "./fetchALL";
import NameSearch from "./namesearch";

export default function SearchTop() {

    // STATES

    const [searchLocation, setsearchLocation] = React.useState({ address: "" });
    const [searchName, setsearchName] = React.useState({ name: "" })
    const [dateValue, setdateValue] = React.useState({ checkin: "", checkout: "" });
    const [roomDetails, setroomDetails] = React.useState({ adults: 1, children: { numberX: 0, "1": "0", "2": "0", "3": "0", "4": "0", "5": "0", "6": "0" } })
    const [incomingData, setincomingData] = React.useState({ locationAdvice: [], cityAdvice: [], nameAdvice: [] })
    const [bools, setBools] = React.useState({ locationSearchFocus: false, travellersPopup: false, nameSearchFocus: false, locationPreload : false, namePreload: false })

    React.useEffect(() => { const timer = setTimeout(() => { fetchLocation() }, 750); return () => clearTimeout(timer); }, [searchLocation]);
    React.useEffect(() => { const timer = setTimeout(() => { fetchName() }, 750); return () => clearTimeout(timer); }, [searchName]);



    const fetchLocation = async () => {
        if (!searchLocation.address == "") {
            setBools((prev => ({ ...prev, locationPreload : true })))
            const data = await locationFetch(searchLocation);
            setincomingData((prev => ({ ...prev, locationAdvice: data.suburbs })));
            setincomingData((prev => ({ ...prev, cityAdvice: data.cities })));
            setBools((prev => ({ ...prev, locationPreload : false })))
        }
    }

    const fetchName = async () => {
        if (!searchName.name == "") {
            setBools((prev => ({ ...prev, namePreload : true })))
            const data2 = await nameFetch(searchName);
            setincomingData((prev => ({ ...prev, nameAdvice: data2 })));          
            setBools((prev => ({ ...prev, namePreload : false })))

        }
    }


    return (
        <>
            <div className="d-flex justify-content-center flex-wrap pt-3" style={{}}>
                <div className="d-flex flex-row flex-wrap " style={{ "width": "1200px" }}>

                    {/* Locationsearch starts here */}

                    <LocationSearchComponent
                        onchangeX={(event) => { setsearchLocation((prev => ({ ...prev, address: event.target.value }))); setBools((prev => ({ ...prev, locationSearchFocus: true }))) }}
                        onblurX={() => { setBools((prev => ({ ...prev, locationSearchFocus: false }))) }}
                        onfocuscaptureX={() => { setBools((prev => ({ ...prev, locationSearchFocus: true }))) }}
                        locationsearchfocusX={bools.locationSearchFocus}
                        addressX={searchLocation.address}
                        cityadviceX={incomingData.cityAdvice}
                        locationadviceX={incomingData.locationAdvice}
                        preloadX={bools.locationPreload}
                    />

                    {/* date-picker starting point */}

                    <DatePickerInAndOut
                        valueX={dateValue.checkin}
                        onchangeX={(newValue) => { (dateValue.checkout == "") ? setdateValue((prev) => ({ checkout: newValue, checkin: newValue })) : setdateValue((prev) => ({ ...prev, checkin: newValue })) }}
                        valueY={dateValue.checkout}
                        onchangeY={(newValue2) => { setdateValue((prev) => ({ ...prev, checkout: newValue2 })); }}
                    />

                    {/* Travellers starting point */}


                    <TravellersComponent
                        onclickcaptureX={() => { setBools((prev) => ({ ...prev, travellersPopup: true })) }}
                        valuefortextfield={roomDetails.adults + " adults " + roomDetails.children.numberX + " children"}
                        modalopen={bools.travellersPopup}
                        modalonclose={() => { setBools((prev) => ({ ...prev, travellersPopup: false })) }}
                        adultminusbuttondisabled={(roomDetails.adults == 1) ? true : false}
                        adultminusbuttonclicked={() => { setroomDetails((prev) => ({ ...prev, adults: roomDetails.adults - 1 })) }}
                        adultnumber={roomDetails.adults}
                        adultplusbuttondisabled={(roomDetails.adults == 14) ? true : false}
                        adultplusbuttonclicked={() => { setroomDetails((prev) => ({ ...prev, adults: roomDetails.adults + 1 })) }}
                        childrenminusbuttondisabled={(roomDetails.children.numberX == 0) ? true : false}
                        childrenminusbuttonclicked={() => { setroomDetails((prev) => ({ ...prev, children: { ...prev.children, numberX: roomDetails.children.numberX - 1 } })) }}
                        childrennumber={roomDetails.children.numberX}
                        childrenplusbuttondisabled={(roomDetails.children.numberX == 6) ? true : false}
                        childrenplusbuttonclicked={() => { setroomDetails((prev) => ({ ...prev, children: { ...prev.children, numberX: roomDetails.children.numberX + 1 } })) }}
                        childOBJ={roomDetails.children}
                        childrenAgeSet={(i) => { return (event) => { setroomDetails((prev) => ({ ...prev, children: { ...prev.children, [i]: event.target.value } })) } }}
                    />


                    {/* Submit Button starting point */}
                    <div>
                        <button type="button" className="btn btn-danger mx-2" style={{ "height": "56px", "width": "200px", "borderTopLeftRadius": "0%", "borderBottomLeftRadius": "0%", "borderTopRightRadius": "20px", "borderBottomRightRadius": "0%", }}>Search</button>
                    </div>
                </div>
            </div>


            {/* BOTTOM PART STARTS HERE 
*****
*****  */}

            <div className="d-flex justify-content-center mt-3" style={{}}>
                <div className="d-flex flex-row" style={{ "width": "1200px" }} >

                    {/* Left side starts here */}

                    <div className="d-flex flex-column">
                        <NameSearch
                            onchangeX={(event) => { setsearchName((prev) => ({ ...prev, name: event.target.value })); (searchName.name.length < 1) ? setBools((prev) => ({ ...prev, nameSearchFocus: false })) : setBools((prev) => ({ ...prev, nameSearchFocus: true })) }}
                            nameSearchFocusX={bools.nameSearchFocus}
                            searchNameNameX={searchName.name}
                            nameAdviceX={incomingData.nameAdvice}
                            onblurcaptureX={() => { setBools((prev) => ({ ...prev, nameSearchFocus: false })) }}
                            preloadX={bools.namePreload}
                          
                        />

                    </div>
                    <div className="ms-4">
                    </div>
                </div>
            </div>
        </>
    )
}


