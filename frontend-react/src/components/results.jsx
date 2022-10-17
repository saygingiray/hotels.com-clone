import React from "react";
import Rating from '@mui/material/Rating';


export default function Results(props) {

    function randomNumber(x) {
        return Math.floor(Math.random() * 199)
    }


    const ImageSlider = (props) => {

        return (<>

            <div id={props.sn} className="carousel slide" data-bs-interval="false" data-bs-touch="false" style={{ "width": "250px" }}>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src={props.pic}
                            className="d-block" alt="..."
                            width="250px"
                            height="200px" />
                            
                    </div>
                    <div className="carousel-item">
                        <img
                            src={props.pic}
                            className="d-block" alt="..." 
                            width="250px"
                            height="200px"
                            />
                    </div>
                    <div className="carousel-item">
                        <img
                            src={props.pic}
                            className="d-block " alt="..."
                            width="250px"
                            height="200px"
                             />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target={"#" + props.sn} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={"#" + props.sn} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>



        </>)




    }




    return <>

        {props.data.map((i, index) => {
        let point = Number(i.review_scores.review_scores_rating) / 20 ;
            return <div key={index} className="d-flex flex-row mt-2 w-100 bg-white" style={{ "minHeight": "200px" }}>
                <div className="d-flex"><ImageSlider sn={"pic" + index} pic={i.images.picture_url} /></div>
                <div className="d-flex flex-column mx-2 mt-2 mb-0 w-100">
                    <div className="textSmallBold">{i.name}</div>
                    <div className="textSmall">{i.summary}</div>
                    <div className="d-flex flex-row my-0">
                        <table className="table table-borderless mt-2 mb-0 table-hover" style={{ "width": "250px" }}>
                            <tbody>
                                <tr>
                                    <td><i className="bi bi-geo-fill"></i></td>
                                    <td className="textSmall fw-bold">{i.address.street}</td>
                                </tr>
                                <tr>
                                    <td><i className="bi bi-building" style={{ "fontSize": "15px" }}></i></td>
                                    <td className="textSmall fw-bold">{i.property_type}</td>
                                </tr>
                                <tr>
                                    <td><i className="bi bi-house-heart"></i></td>
                                    <td className="textSmall fw-bold">{i.room_type}</td>
                                </tr>
                                <tr>
                                    <td><i className="bi bi-aspect-ratio"></i></td>
                                    <td className="textSmall fw-bold">{i.bed_type}</td>
                                </tr>
                                <tr>
                                    <td><i className="bi bi-gear"></i></td>
                                    <td className="textSmall fw-bold link-primary">Amenities</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="d-flex flex-column ms-auto text-end h-100 d-inline-block " >
                            <div className="textSmall mt-2">{i.review_scores.review_scores_rating}/100 ({i.number_of_reviews} reviews)  </div>
                            <div className="text-end">      <Rating name="read-only" value={point} readOnly /></div>
                            <div className="d-flex flex-column  mt-auto">
                                <div className="textMediumBold fw-bold fs-4 text-end">$ {i.price.$numberDecimal}</div>
                                <div className="mt-n1 textSmall">$ 1264 total</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        })}



    </>











}