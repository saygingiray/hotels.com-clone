import React from "react";
import Rating from '@mui/material/Rating';


export default function Results(props) {

    function randomNumber(x) {
        return Math.floor(Math.random() * 250)
    }


    const ImageSlider = (props) => {

        return (<>

            <div id={props.sn} className="carousel slide" data-bs-interval="false" data-bs-touch="false" style={{ "width": "250px" }}>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src={("https://picsum.photos/id/" + randomNumber() + "/250/200")}
                            className="d-block" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img
                            src={("https://picsum.photos/id/" + randomNumber() + "/250/200")}
                            className="d-block" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img
                            src={("https://picsum.photos/id/" + randomNumber() + "/250/200")}
                            className="d-block " alt="..." />
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


    return (<>

        <div className="d-flex flex-row mt-2 w-100 bg-white" style={{ "minHeight": "200px" }}>
            <div className="d-flex"><ImageSlider sn="amcik" /></div>
            <div className="d-flex flex-column mx-2 mt-2 mb-0 w-100">
                <div className="textSmallBold">Double Room en-suite (307)</div>
                <div className="textSmall">A standard double room with a queen size double bed and with private bathroom. There is a working table, chair and a shelf. A clean and comfortable room.</div>
                <div className="d-flex flex-row my-0">
                    <table className="table table-borderless mt-2 mb-0 table-hover" style={{ "width": "250px" }}>
                        <tbody>
                        <tr>
                            <td><i className="bi bi-geo-fill"></i></td>
                            <td className="textSmall fw-bold">Hong Kong, Kowloon, Hong Kong</td>
                        </tr>
                        <tr>
                            <td><i className="bi bi-building" style={{ "fontSize": "15px" }}></i></td>
                            <td className="textSmall fw-bold">Apartment</td>
                        </tr>
                        <tr>
                            <td><i className="bi bi-house-heart"></i></td>
                            <td className="textSmall fw-bold">Entire home/apt</td>
                        </tr>
                        <tr>
                            <td><i className="bi bi-aspect-ratio"></i></td>
                            <td className="textSmall fw-bold">Airbed</td>
                        </tr>
                        <tr>
                            <td><i class="bi bi-gear"></i></td>
                            <td className="textSmall fw-bold link-primary">Amenities</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="d-flex flex-column ms-auto text-end h-100 d-inline-block " >
                        <div className="textSmall mt-2">94/100 (122 reviews)  </div>
                        <div className="text-end">      <Rating name="read-only" value={2} readOnly /></div>
                        <div className="d-flex flex-column  mt-auto">
                            <div className="textMediumBold fw-bold fs-4 text-end">$ 369</div>
                            <div className="mt-n1 textSmall">$ 1264 total</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>






    </>)


}