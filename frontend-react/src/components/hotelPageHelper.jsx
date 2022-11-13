
import React from "react";
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import { fetchHotelReviews } from "./fetchALL";
import { useParams, useLocation } from "react-router-dom";
import moment from 'moment';


export function ReviewScoresListing(props) {
    let tempData = []
    let keyGen = 1
    for (const y in props.data) {
        let y_text = y?.split("_")[2];
        if (y_text === "rating") { break };
        tempData.push(
            <div key={keyGen}>
                <div className="d-flex flex-row mt-3" >
                    <div className="mt-1 textSmall">{y.split("_")[2]?.charAt(0).toUpperCase()}{y.split("_")[2]?.slice(1)}</div>
                    <div className="mt-1 ms-auto textSmall">{props.data[y]}/10</div>
                </div>
                <div className="progress" style={{ "height": "5px" }}>
                    <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{ "width": props.data[y] * 10 + "%", "height": "5px" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        )
        keyGen = keyGen + 1;
    }
    return tempData;
}


export function SeeReviews(props) {
    const { id } = useParams()
    const [hotelReview, setHotelReview] = React.useState({
        hotelReviews: "",
        qtyReviews: "",
        pageRequest: 0,
        isLastReview: false,
    });

    const [renderNow, setRenderNow] = React.useState(false)
    const [loading, setLoading] = React.useState({
        button: false,

    })

    React.useEffect(() => { setRenderNow(props.modalOpen) }, [props.modalOpen]);
    React.useEffect(() => {  { hotelReviewFetch(0) } }, [renderNow]);

    const hotelReviewFetch = async (x) => {
        let tempProps = {
            hotelNumber: id,
            pageNumber: x
        }

        const loadMore = async () => {
            if (data.qtyOfReviews.totaldocs < (x + 1) * 5) {
                setHotelReview((prev) => ({ ...prev, isLastReview: true }))
            }


        }
        const data = await fetchHotelReviews(tempProps);
        setHotelReview((prev) => {
            return { ...prev, hotelReviews: [...prev.hotelReviews, ...data.allReviews], qtyReviews: data.qtyOfReviews.totaldocs };
        });
        loadMore();


    }




    return <>

        <Modal
            open={props.modalOpen}
            onClose={props.modalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: 'scroll' }}
        >
            <div className={(!props.mobileScreen) ? "d-flex p-2 w-75 flex-row" : "d-flex p-2 pe-3 w-75 flex-column"} style={{
                "position": 'absolute',
                "top": (!props.mobileScreen) ? "10%" : "5%",
                "left": (!props.mobileScreen) ? "12%" : "12%",
                "right": (!props.mobileScreen) ? "12%" : "12%",
                "minHeight": "600px",
                "backgroundColor": "white"

            }}>
                <div className={(!props.mobileScreen) ? "d-flex flex-column w-25" : "d-flex flex-column w-100"}>
                    <div className="textMediumBold">{props.rating}/100 ({props.reviewNumber} reviews )</div>
                    <ReviewScoresListing
                        data={props.scores} />
                </div>
                <div className={(!props.mobileScreen) ? "d-flex flex-column w-75 px-4" : "d-flex flex-column mt-4 w-100"}>

                    {(hotelReview.hotelReviews === "") ? null : hotelReview.hotelReviews?.map((i, index) => {
                        return <div key={index}>
                            <div className="d-flex flex-row justify-content-between align-items-baseline">
                                <div className="textSmallBold">{i.reviews?.reviewer_name}</div>
                                <div className="textSmall">{moment(i.reviews?.date).utc().format('lll')}</div>
                            </div>
                            <div className="textSmall">{i.reviews?.comments}</div>
                            <hr></hr>
                        </div>
                    })}

                    <div>
                        {(hotelReview.isLastReview) ? <span>End of {hotelReview.qtyReviews} reviews.</span> :
                            <button onClick={async () => {
                                setLoading(prev => ({ ...prev, button: true }));
                                setHotelReview((prev) => { return { ...prev, pageRequest: hotelReview.pageRequest + 1 } })
                                await hotelReviewFetch((hotelReview.pageRequest + 1));
                                setLoading(prev => ({ ...prev, button: false }));

                            }} type="button" className={(!loading.button) ? "btn btn-outline-danger" : "btn btn-outline-secondary disabled"}>{(!loading.button) ? "Read More" : "Loading..."}</button>}</div>

                </div>


            </div>
        </Modal>

    </>

}