import React from "react";
import Header from './header';
import LocationSearchComponent from "./locationsearch";
import DatePickerInAndOut from "./datepickerinout";
import TravellersComponent from "./travellers";
import { locationFetch, nameFetch, propertyListFetch, searchResultsFromServer } from "./fetchALL";
import NameSearch from "./namesearch";
import PriceRange from "./pricerange";
import GuestRating from "./guestrating";
import PropertyClass from "./propertyClass";
import PropertyType from "./propertyType";
import BedType from "./bedType";
import Amenities from "./amenities";
import RoomType from "./roomType";
import FilterShown from "./filtersTopView";
import SortBy from "./sortBy";
import { ResultsMobile, ResultsWide } from "./results";
import { PlaceHolder } from "./placeholder";
import Pagination from '@mui/material/Pagination';
import dayjs from "dayjs";
import PageWidth from "./pageWidth";



export default function SearchTop() {

    // STATES

    const [searchLocation, setsearchLocation] = React.useState({ address: "" });
    const [searchName, setsearchName] = React.useState({ name: "" })
    const [dateValue, setdateValue] = React.useState({ checkin: dayjs(), checkout: dayjs().add(2, 'day') });
    const [roomDetails, setroomDetails] = React.useState({ adults: 1, children: { numberX: 0, "1": "0", "2": "0", "3": "0", "4": "0", "5": "0", "6": "0" } })
    const [incomingData, setincomingData] = React.useState({ locationAdvice: [], cityAdvice: [], nameAdvice: [], propertyList: [], numberOfSearch: "", results: [], pageWidth: "" })
    const [bools, setBools] = React.useState({ locationSearchFocus: false, travellersPopup: false, nameSearchFocus: false, locationPreload: true, namePreload: true, modalForFilters: false, fetching: false, seeMoreFilter: false })
    const [filters, setFilters] = React.useState({
        priceRange: [30, 250],
        guestQTY: "1",
        guestRating: [],
        propertyClass: [],
        propertySelected: [],
        bedTypes: [],
        amenities: [],
        roomTypes: [],
        addressCity: [],
        addressSuburb: [],
        sortBy: "",
        page: 1,
        limit: 20,

    })


    React.useEffect(() => { const timer = setTimeout(() => { fetchLocation() }, 500); return () => clearTimeout(timer); }, [searchLocation]);
    React.useEffect(() => { const timer = setTimeout(() => { fetchName() }, 750); return () => clearTimeout(timer); }, [searchName]);
    React.useEffect(() => { fetchPropertyTypes() }, []);
    React.useEffect(() => { searchResults() }, [filters]);
    React.useEffect(() => { let guestCount = roomDetails.adults + roomDetails.children.numberX; setFilters(prev => ({ ...prev, guestQTY: guestCount })) }, [roomDetails]);




    const fetchLocation = async () => {
        if (!searchLocation.address == "") {
            setBools((prev => ({ ...prev, locationPreload: true })))
            const data = await locationFetch(searchLocation);
            setincomingData((prev => ({ ...prev, locationAdvice: data.suburbs })));
            setincomingData((prev => ({ ...prev, cityAdvice: data.cities })));
            setBools((prev => ({ ...prev, locationPreload: false })))
        }
    }

    const fetchName = async () => {
        if (!searchName.name == "") {
            setBools((prev => ({ ...prev, namePreload: true })))
            const data2 = await nameFetch(searchName);
            setincomingData((prev => ({ ...prev, nameAdvice: data2 })));
            setBools((prev => ({ ...prev, namePreload: false })))

        }
    }

    const fetchPropertyTypes = async () => {
        const data = await propertyListFetch();
        // console.log(data);
        setincomingData((prev => ({ ...prev, propertyList: data })));
    }


    const searchResults = async () => {
        setBools((prev => ({ ...prev, fetching: true })))
        window.scrollTo(0, 0);
        const queryString = '/search?' + new URLSearchParams(filters).toString()
        //    console.log(queryString)
        const dataFromFetch = await searchResultsFromServer(queryString);
        setincomingData((prev => ({ ...prev, numberOfSearch: dataFromFetch.number, results: dataFromFetch.data })));
        setBools((prev => ({ ...prev, fetching: false })))
    }


    //pagination 
    let pagsCount = "";
    if (Math.ceil(incomingData.numberOfSearch / filters.limit) == 0) { pagsCount = 1 }
    else { pagsCount = Math.ceil(incomingData.numberOfSearch / filters.limit); };
    if (filters.page > pagsCount) { setFilters(prev => ({ ...prev, page: 1 })) };


    const LeftSideFilters = () => {
        return (<>

            <NameSearch
                onchangeX={(event) => { setsearchName((prev) => ({ ...prev, name: event.target.value })); (searchName.name.length < 1) ? setBools((prev) => ({ ...prev, nameSearchFocus: false })) : setBools((prev) => ({ ...prev, nameSearchFocus: true })) }}
                nameSearchFocusX={bools.nameSearchFocus}
                searchNameNameX={searchName.name}
                nameAdviceX={incomingData.nameAdvice}
                onblurcaptureX={() => { setBools((prev) => ({ ...prev, nameSearchFocus: false })) }}
                preloadX={bools.namePreload}

            />
            <hr></hr>


            <PriceRange
                sendData={(i) => { setFilters(prev => ({ ...prev, priceRange: (i) })); setBools((prev) => ({ ...prev, seeMoreFilter: (false) })) }}
            />
            <hr></hr>

            <PropertyType
                list={incomingData.propertyList}
                filter={filters.propertySelected}
                handle={(event) => { const { target: { value }, } = event; setFilters(prev => ({ ...prev, propertySelected: typeof value === 'string' ? value.split(',') : value, })); setBools((prev) => ({ ...prev, seeMoreFilter: (false) })) }}

            />
            <hr></hr>
            <GuestRating
                sendData={(i) => { setFilters(prev => ({ ...prev, guestRating: (i) })); setBools((prev) => ({ ...prev, seeMoreFilter: (false) })) }}
            />
            <hr></hr>
            <PropertyClass
                sendData={(i) => { setFilters(prev => ({ ...prev, propertyClass: (i) })); setBools((prev) => ({ ...prev, seeMoreFilter: (false) })) }}
                changedByXbutton={filters.propertyClass}

            />
            <hr></hr>

            <RoomType
                sendData={(i) => { setFilters(prev => ({ ...prev, roomTypes: (i) }));setBools((prev) => ({ ...prev, seeMoreFilter: (false) })) }}
                changedByXbutton={filters.roomTypes}

            />
            <hr></hr>

            <Amenities
                sendData={(i) => { setFilters(prev => ({ ...prev, amenities: (i) })); setBools((prev) => ({ ...prev, seeMoreFilter: (false) })) }}
                changedByXbutton={filters.amenities}

            />
            <hr></hr>
            <BedType
                sendData={(i) => { setFilters(prev => ({ ...prev, bedTypes: (i) })); setBools((prev) => ({ ...prev, seeMoreFilter: (false) })) }}
                changedByXbutton={filters.bedTypes}
            />
            <hr></hr>
        </>)
    }

    const FiltersToBeShown = () => {
        return (<>

            <div className="d-flex flex-row flex-wrap ">
                <FilterShown
                    data={filters.bedTypes}
                    delete={(i) => { let tempARR = filters.bedTypes; tempARR.splice(i, 1); setFilters(prev => ({ ...prev, bedTypes: tempARR })) }}
                />

                <FilterShown
                    data={filters.amenities}
                    delete={(i) => { let tempARR = filters.amenities; tempARR.splice(i, 1); setFilters(prev => ({ ...prev, amenities: tempARR })) }}
                />

                <FilterShown
                    data={filters.roomTypes}
                    delete={(i) => { let tempARR = filters.roomTypes; tempARR.splice(i, 1); setFilters(prev => ({ ...prev, roomTypes: tempARR })) }}
                />

                <FilterShown
                    data={filters.propertyClass}
                    delete={(i) => { let tempARR = filters.propertyClass; tempARR.splice(i, 1); setFilters(prev => ({ ...prev, propertyClass: tempARR })) }}
                />

                <FilterShown
                    data={filters.propertySelected}
                    delete={(i) => { let tempARR = filters.propertySelected; tempARR.splice(i, 1); setFilters(prev => ({ ...prev, propertySelected: tempARR })) }}
                />
                <FilterShown
                    data={filters.guestRating}
                    delete={(i) => { let tempARR = filters.guestRating; tempARR.splice(i, 1); setFilters(prev => ({ ...prev, guestRating: tempARR })) }}
                />

                <FilterShown
                    data={filters.addressCity}
                    delete={(i) => { let tempARR = filters.addressCity; tempARR.splice(i, 1); setFilters(prev => ({ ...prev, addressCity: tempARR })) }}
                />

                <FilterShown
                    data={filters.addressSuburb}
                    delete={(i) => { let tempARR = filters.addressSuburb; tempARR.splice(i, 1); setFilters(prev => ({ ...prev, addressSuburb: tempARR })) }}
                />


            </div>
        </>)
    }




    return (
        <>
            <Header />
            <PageWidth
                sendData={(i) => { setincomingData(prev => ({ ...prev, pageWidth: (i) })) }}
            />
            <div className="d-flex justify-content-center w-100" >
            {/* style={(incomingData.pageWidth<650) ? { "maxWidth": "300" , "padding" : "10px" } : { "maxWidth": "1200px" } } */}
                <div className={(incomingData.pageWidth > 650) ? "d-flex flex-row p-1 pt-3" : "d-flex flex-column justify-content-center p-1 pt-3"} style={(incomingData.pageWidth > 650) ? {"width" : "1200px"} : {"width" : "100%"}}>
                    {/* Locationsearch starts here */}
                    <div className={(incomingData.pageWidth > 650) ? " p-0 me-3 bg-white" : " m-0 bg-white"} style={(incomingData.pageWidth > 650) ? { "minWidth": "330px" } : {"minWidth" : "370px"}}>
                        <LocationSearchComponent
                            onchangeX={(event) => { setsearchLocation((prev => ({ ...prev, address: event.target.value }))); setBools((prev => ({ ...prev, locationSearchFocus: true }))) }}
                            onfocuscaptureX={() => { setBools((prev => ({ ...prev, locationSearchFocus: true }))) }}
                            locationsearchfocusX={bools.locationSearchFocus}
                            addressX={searchLocation.address}
                            cityadviceX={incomingData.cityAdvice}
                            locationadviceX={incomingData.locationAdvice}
                            preloadX={bools.locationPreload}
                            clickXCity={(i) => { { setFilters(prev => ({ ...prev, addressCity: [(i)] })) }; setBools((prev => ({ ...prev, locationSearchFocus: false }))); setsearchLocation({ "address": i }) }}
                            clickXSuburb={(i) => { { setFilters(prev => ({ ...prev, addressSuburb: [(i)] })) }; setBools((prev => ({ ...prev, locationSearchFocus: false }))); setsearchLocation({ "address": i }) }}
                            onblurX={() => { setBools((prev => ({ ...prev, locationSearchFocus: false }))) }}
                            pageWidth={incomingData.pageWidth}
                        />
                    </div>
                    {/* date-picker starting point */}
                    <div className="d-flex me-3 ">
                        <div className={(incomingData.pageWidth > 650) ? "row" : "row justify-content-between mt-1"} style={(incomingData.pageWidth < 650) ? { "width": incomingData.pageWidth } : null}>
                            <DatePickerInAndOut
                                valueX={dateValue.checkin}
                                onchangeX={(newValue) => { (dateValue.checkout == "") ? setdateValue((prev) => ({ checkout: newValue, checkin: newValue })) : setdateValue((prev) => ({ ...prev, checkin: newValue })) }}
                                valueY={dateValue.checkout}
                                onchangeY={(newValue2) => { setdateValue((prev) => ({ ...prev, checkout: newValue2 })); }}
                                pageWidth={incomingData.pageWidth}
                            />
                        </div>
                    </div>
                    {/* Travellers starting point */}

                    <div className={(incomingData.pageWidth > 650) ? "d-flex" : "d-flex p-0 mt-1"}>
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
                            pageWidth={incomingData.pageWidth}


                        />
                    </div>

                    {/* Submit Button starting point */}
                    <div className={(incomingData.pageWidth > 650) ? "d-flex p-0 ms-auto" : "d-flex text-right mt-1 ms-auto pe-0"}>
                        <button onClick={() => setFilters(prev => ({ ...prev, bedTypes: filters.bedTypes }))} type="button" className="btn btn-danger searchButton" style={(incomingData.pageWidth < 650) ? { "width": "180px", "borderTopRightRadius": "0px" , "marginRight" : "0", "paddingRight" : "0" } : null} >Search</button>
                    </div>
                </div>

            </div>


            {/* BOTTOM PART STARTS HERE **********  */}

            <div className="d-flex  justify-content-center mt-3" >
                <div className={(incomingData.pageWidth < 650) ? "d-flex flex-column" : "d-flex flex-row"} style={{ "maxWidth": "1200px" }} >

                    {/* Left (FILTERS) side starts here */}
                    {/* Responsive for wide screens and mobiles */}


                    {(incomingData.pageWidth < 650) ?

                        <div className="d-flex justify-content-center">
                            <button onClick={() => { setBools((prev) => ({ ...prev, seeMoreFilter: (!bools.seeMoreFilter) })) }} type="button" className="btn btn-outline-danger" style={{ "width": incomingData.pageWidth - 25 }}><i className="bi bi-filter"></i> Filters</button>
                        </div> : null}

                    <div className={(incomingData.pageWidth > 650) ? "d-flex flex-column ps-1" : (bools.seeMoreFilter) ? "seeMoreFilter d-flex bg-white p-3 mt-2 flex-column" : "seeLessFilter"}>
                        {LeftSideFilters()}
                    </div>




                    {/* Right (Results) Side starts here. */}

                    <div className={(incomingData.pageWidth < 650) ? "p-1 mt-2" : "ms-4 w-100"}>

                        {/* Responsive for wide screens */}

                        {/* Filtered Items to be shown + sortby  */}
                        {(incomingData.pageWidth < 650) ? null :
                            <div className="d-flex w-100">
                                <div className="d-flex flex-column">
                                    {FiltersToBeShown()}
                                    <div className="textSmall">{incomingData.numberOfSearch} properties found. Showing results between {(filters.page - 1) * filters.limit} to {(filters.page * filters.limit > incomingData.numberOfSearch) ? incomingData.numberOfSearch : filters.page * filters.limit}</div>
                                </div>
                                <div className="textSmall ms-auto">
                                    <SortBy
                                        sendData={(i) => { setFilters(prev => ({ ...prev, sortBy: (i) })) }}
                                    />
                                </div>
                            </div>
                        }

                        {/* Responsive for mobiles */}
                        {/* Filtered Items to be shown + sortby  */}
                        {(incomingData.pageWidth > 650) ? null :
                            <>
                                <div className="d-flex flex-column">
                                    {FiltersToBeShown()}
                                    <div className="textSmall mt-1">{incomingData.numberOfSearch} properties found. Showing results between {(filters.page - 1) * filters.limit} to {(filters.page * filters.limit > incomingData.numberOfSearch) ? incomingData.numberOfSearch : filters.page * filters.limit}</div>
                                </div>
                                <div className="d-flex textSmall mt-2 justify-content-end">
                                    <SortBy
                                        sendData={(i) => { setFilters(prev => ({ ...prev, sortBy: (i) })) }}
                                    />
                                </div>
                            </>
                        }

                        {/* <PlaceHolder turn={bools.fetching} /> */}

                        {/* Results */}
                        {(incomingData.pageWidth > 650) ?
                            <ResultsWide
                                data={incomingData.results}
                                datesCount={(Math.ceil((dateValue.checkout.$d - dateValue.checkin.$d) / (1000 * 60 * 60 * 24)))}
                            /> :
                            <ResultsMobile
                                data={incomingData.results}
                                datesCount={(Math.ceil((dateValue.checkout.$d - dateValue.checkin.$d) / (1000 * 60 * 60 * 24)))}
                                pageWidth={incomingData.pageWidth}
                            />
                        }

                        <div className="d-flex justify-content-center mt-4 mb-5">
                            <Pagination className="justify-content-center" count={pagsCount} color="secondary" page={filters.page} onChange={(event, value) => { setFilters(prev => ({ ...prev, page: value })) }} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}


