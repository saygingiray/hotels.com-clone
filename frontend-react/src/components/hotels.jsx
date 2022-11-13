import React from "react";
import { useParams, useLocation } from "react-router-dom"
import { fetchHotelDetails, fetchSimilarHotel } from "./fetchALL";
import Header from "./header";
import PageWidth from "./pageWidth";
import Rating from '@mui/material/Rating';
import Modal from '@mui/material/Modal';
import { ReviewScoresListing, SeeReviews } from "./hotelPageHelper";
import GoogleMapAPI from "./googlemap";
import SimilarHotels from "./similarHotels";


export default function HotelPage(props) {
    const { id } = useParams()
    const location = useLocation();

    const [hotelData, sethotelData] = React.useState("");
    const [similarHotels, setSimilarHotels] = React.useState([]);

    const [bools, setBools] = React.useState({ fetching: false, mobileScreen: false, reviewModal: false })

    React.useEffect(() => { hotelProcess() }, [location]);

    const hotelProcess = async () => {
        setBools((prev => ({ ...prev, fetching: true })))
        window.scrollTo(0, 0);
        const data = await fetchHotelDetails({ id }); sethotelData(data);
        const similarHotelFetch = await fetchSimilarHotel(data.address.location.coordinates); setSimilarHotels(similarHotelFetch);
        setBools((prev => ({ ...prev, fetching: false })))
    }

    let point = Number(hotelData.review_scores?.review_scores_rating) / 20;

    let ReviewText = () => {
        if (hotelData?.number_of_reviews == 0) { return <div>No reviews from guests.</div> }
        else { return <> <span>{hotelData.review_scores?.review_scores_rating}/100 ({hotelData?.number_of_reviews} reviews)</span></> }
    }

    let lengthOfAmenities = hotelData.amenities?.length

    return <>

        <Header />
        <PageWidth
            sendData={(i) => {
                {
                    (i < 650) ?
                        setBools((prev) => ({ ...prev, mobileScreen: true })) :
                        setBools((prev) => ({ ...prev, mobileScreen: false }))
                }
            }} />


        {(bools.fetching) ? <div className="preloaderHotelPage"><div class="spinner-grow text-danger" role="status"></div></div> : null}

        <div className="d-flex justify-content-center align-items-center w-100">
            <div className="d-flex flex-column mt-3  w-100" style={{ "maxWidth": "1200px" }} >
                <div className="d-flex flex-row w-100">
                    <div className={(!bools.mobileScreen) ? "d-flex me-1" : "d-flex"} style={(!bools.mobileScreen) ? { "width": "50%" } : { "width": "100%" }}>
                        <img src={hotelData.images?.picture_url} style={{ "width": "100%" }} />
                    </div>
                    <div className={(!bools.mobileScreen) ? "d-flex me-1 flex-column" : "d-none"} style={{ "width": "25%" }}>
                        <div className="pb-1"> <img src={hotelData.images?.picture_url} style={{ "width": "100%" }} /> </div>
                        <div><img src={hotelData.images?.picture_url} style={{ "width": "100%" }} /></div>
                    </div>
                    <div className={(!bools.mobileScreen) ? "d-flex flex-column" : "d-none"} style={{ "width": "25%" }}>
                        <div className="pb-1"><img src={hotelData.images?.picture_url} style={{ "width": "100%" }} /> </div>
                        <img src={hotelData.images?.picture_url} style={{ "width": "100%" }} />
                    </div>
                </div>

                <div className={(!bools.mobileScreen) ? "d-flex flex-row bg-white pb-2" : "d-flex flex-column bg-white pb-2"}>
                    <div className={(!bools.mobileScreen) ? "d-flex flex-column mt-2 px-2 w-50" : "d-flex flex-column mt-2 px-2 w-100"}>
                        <span className="textLargeBold">{hotelData?.name}</span>
                        <div className="mt-1"><Rating name="read-only" value={point} readOnly /></div>
                        <span className="textSmall mt-1">{hotelData?.summary}</span>
                        <span className="textSmallBold mt-2"><ReviewText /></span>
                        {(!hotelData?.number_of_reviews == 0) ? <div onClick={() => setBools((prev) => ({ ...prev, reviewModal: true }))} className="textSmall" role="button" style={{ "color": "blue" }}>See all {hotelData?.number_of_reviews} reviews</div> : null}

                        <SeeReviews
                            modalOpen={bools.reviewModal}
                            modalClose={() => setBools((prev) => ({ ...prev, reviewModal: false }))}
                            mobileScreen={bools.mobileScreen}
                            rating={hotelData.review_scores?.review_scores_rating}
                            reviewNumber={hotelData?.number_of_reviews}
                            scores={hotelData?.review_scores}
                        />

                        <table className="table table-borderless mt-2 mb-0 table-hover" style={{ "width": "250px" }}>
                            <tbody>
                                <tr>
                                    <td><i className="bi bi-geo-fill"></i></td>
                                    <td className="textSmall fw-bold">{hotelData.address?.street}</td>
                                </tr>
                                <tr>
                                    <td><i className="bi bi-building" style={{ "fontSize": "15px" }}></i></td>
                                    <td className="textSmall fw-bold">{hotelData?.property_type}</td>
                                </tr>
                                <tr>
                                    <td><i className="bi bi-house-heart"></i></td>
                                    <td className="textSmall fw-bold">{hotelData?.room_type}</td>
                                </tr>
                                <tr>
                                    <td><i className="bi bi-aspect-ratio"></i></td>
                                    <td className="textSmall fw-bold">{hotelData?.bed_type}</td>
                                </tr>
                                <tr>
                                    <td><i className="bi bi-gear"></i></td>
                                    <td className="textSmall fw-bold">Maximum Guest Allowed : {hotelData?.accommodates} </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className={(!bools.mobileScreen) ? "d-flex justify-content-center px-2 w-50 mt-3" : "d-flex justify-content-center mt-3 px-2"}>
                        {(hotelData.address?.location.coordinates) ? <GoogleMapAPI data={hotelData.address?.location.coordinates} />
                            : <div> Loading Google Maps. </div>}
                    </div>
                </div>

                <div className={(!bools.mobileScreen) ? "d-flex w-100 flex-row bg-white mt-3 p-2" : "d-flex w-100 flex-column bg-white mt-3 p-2"}>
                    <div className={(!bools.mobileScreen) ? "d-flex w-25 textLargeBold mb-3" : "d-flex textLargeBold mb-3"}>At a glance</div>
                    <div className={(!bools.mobileScreen) ? "d-flex w-75 px-2 flex-row justify-content-between" : "d-flex px-2 flex-row justify-content-between"} >
                        <div className="d-flex flex-column ">{hotelData.amenities?.slice(0, lengthOfAmenities / 3).map((i, index) => {
                            return <ul className="mt-0" style={{ "listStyle": "none" }}>
                                <li className="textSmall" key={index} style={{ "marginBottom": "-15px" }}><i class="bi bi-check2"></i>{i}</li>
                            </ul>
                        })} </div>
                        <div className="d-flex flex-column ">{hotelData.amenities?.slice(lengthOfAmenities / 3, (lengthOfAmenities / 3) * 2).map((i, index) => {
                            return <ul className="mt-0" style={{ "listStyle": "none" }}>
                                <li className="textSmall" key={index} style={{ "marginBottom": "-15px" }}><i class="bi bi-check2"></i>{i}</li>
                            </ul>
                        })} </div>
                        
                        <div className={(!bools.mobileScreen) ? "d-flex flex-column ": "d-none"}>{hotelData.amenities?.slice((lengthOfAmenities / 3) * 2, lengthOfAmenities).map((i, index) => {
                            return <ul className="mt-0" style={{ "listStyle": "none" }}>
                                <li className="textSmall" key={index} style={{ "marginBottom": "-15px" }}><i class="bi bi-check2"></i>{i}</li>
                            </ul>
                        })} </div>
                    </div>
                </div>

                <div className="d-flex mt-3 p-2 bg-white flex-column">
                    <div className="d-flex textLargeBold mb-3">Similar Hotels Around 25 kms</div>



                  





                    <div><SimilarHotels data={similarHotels} mobileScreen={bools.mobileScreen}/></div>


                </div>

            </div>
        </div>
    </>

}