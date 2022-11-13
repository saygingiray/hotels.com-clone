import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import { Link, Outlet } from "react-router-dom"




export default function SimilarHotels(props) {
    return (
        <>
            <div className="wrapper">
                <Splide
                    options={{
                        perPage: (!props.mobileScreen) ? "6" : "2",
                        height: '500px',
                        rewind: false,
                        gap: '10px',
                        perMove : 1,
                        padding: 10
                    }}
                    aria-labelledby="basic-example-heading"
                    onMoved={(splide, newIndex) => {
                        // eslint-disable-next-line
                        console.log('moved', newIndex);

                        // eslint-disable-next-line
                        console.log('length', splide.length);
                    }}
                >

                    {props.data.map((i, index) => {
                        return ( 
                            <SplideSlide key={index}>
                                <div className="card" style={{ "width": "180px", "height" : "400px" }}>
                                    <img src={i.images?.picture_url} className="card-img-top" alt={i?.name} style={{ "width": "100%", "height": "100px" }} />
                                    <div className="d-flex flex-column p-2 align-items-stretch justify-content-between h-100 ">
                                    <Link to={`/hotel/${i._id}`}> <h5 className="card-title textSmallBold" style={{"maxHeight" : "30px"}}>{i?.name}</h5></Link>

                                        <table className="table table-borderless mt-2 mb-2 " style={{ "width": "100%" }}>
                                            <tbody>
                                                <tr>
                                                    <td><i className="bi bi-geo-fill"></i></td>
                                                    <td className="textSmall ">{i.address?.market}</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="bi bi-building" style={{ "fontSize": "15px" }}></i></td>
                                                    <td className="textSmall ">{i?.property_type}</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="bi bi-house-heart"></i></td>
                                                    <td className="textSmall ">{i?.room_type}</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="bi bi-aspect-ratio"></i></td>
                                                    <td className="textSmall ">{i?.bed_type}</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="bi bi-gear"></i></td>
                                                    <td className="textSmall ">Maximum Guest : {i?.accommodates} </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {(i?.number_of_reviews == 0) ? <div className="textSmall">No reviews from guests.</div> :
                                            <span className="textSmall"><span className="fw-bold">{i.review_scores?.review_scores_rating}/100</span> ({i?.number_of_reviews} reviews)</span>}
                                        <div className="textLargeBold mt-2">$ {i.price?.$numberDecimal}</div>



                                    </div>
                                </div>
                            </SplideSlide>

                        )

                    })}




                </Splide>
            </div>
        </>)
}