import React from "react";
import { useParams, useLocation } from "react-router-dom"
import { fetchHotelDetails } from "./fetchALL";
import Header from "./header";
import PageWidth from "./pageWidth";
import Rating from '@mui/material/Rating';
import Modal from '@mui/material/Modal';
import { ReviewScoresListing, SeeReviews } from "./hotelPageHelper";
import GoogleMapAPI from "./googlemap";


export default function HotelPage(props) {
    const { id } = useParams()
    const location = useLocation();

    const [hotelData, sethotelData] = React.useState("");
    const [bools, setBools] = React.useState({ fetching: false, mobileScreen: false, reviewModal: false })

    React.useEffect(() => { hotelProcess() }, [location]);

    const hotelProcess = async () => {
        setBools((prev => ({ ...prev, fetching: true })))
        const data = await fetchHotelDetails({ id }); sethotelData(data);

        setBools((prev => ({ ...prev, fetching: false })))

    }

    let point = Number(hotelData.review_scores?.review_scores_rating) / 20;

    let ReviewText = () => {
        if (hotelData?.number_of_reviews == 0) { return <div>No reviews from guests.</div> }
        else { return <> <span>{hotelData.review_scores?.review_scores_rating}/100 ({hotelData?.number_of_reviews} reviews)</span></> }
    }

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

        <div className="d-flex justify-content-center align-items-center w-100">
            <div className="d-flex flex-column mt-3 bg-white w-100" style={{ "maxWidth": "1200px" }} >
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

                <div className={(!bools.mobileScreen) ? "d-flex flex-row" : "d-flex flex-column"}>
                    <div className={(!bools.mobileScreen) ? "d-flex flex-column mt-2 px-1 w-50" : "d-flex flex-column mt-2 px-1 w-100"}>
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

                    </div>
                    <div className={(!bools.mobileScreen) ? "d-flex w-50 mt-3" : "d-flex mt-3 "}>

                    {/* <GoogleMapAPI/> */}


                    </div>
                </div>
            </div>
        </div>
    </>

}