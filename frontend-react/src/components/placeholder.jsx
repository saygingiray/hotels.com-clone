import React from "react";


const Div = (props) => {

    return (
        <div className="d-flex flex-row mt-3 w-100 bg-white" style={{ "minHeight": "200px" }}>

            <div className="d-flex placeholder-glow" style={{ "minWidth": "250px", "minHeight": "200px" }}>
                <span className="placeholder col-12 "></span>
            </div>
            <div className="d-flex flex-column mx-2 mt-2 mb-0 w-100 placeholder-glow">
                <div className="textSmallBold"><span className="placeholder col-4 "></span></div>
                <div className="textSmall"><span className="placeholder col-12 "></span></div>
                <div className="textSmall"><span className="placeholder col-12 "></span></div>
                <div className="d-flex flex-row my-0">
                    <table className="table table-borderless mt-2 mb-0 " style={{ "width": "150px" }}>
                        <tbody>
                            <tr>
                                <td><i className="bi bi-geo-fill"></i></td>
                                <td className="textSmall fw-bold"><span className="placeholder col-12 "></span></td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-building" style={{ "fontSize": "15px" }}></i></td>
                                <td className="textSmall fw-bold"><span className="placeholder col-12 "></span></td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-house-heart"></i></td>
                                <td className="textSmall fw-bold"><span className="placeholder col-12 "></span></td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-aspect-ratio"></i></td>
                                <td className="textSmall fw-bold"><span className="placeholder col-12 "></span></td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-gear"></i></td>
                                <td className="textSmall fw-bold w-75"> <span className="placeholder col-12 "></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>



    )
}

const DivMobile = (props) => {

    return (
        <div className="d-flex flex-column mt-4 w-100 placeholder-glow bg-white" >
            <div className="d-flex placeholder-glow" style={{ "minWidth": "200px", "minHeight": "300px" }}><span className="placeholder col-12 "></span></div>
            <div className="p-2">
                <div className="textSmallBold"><span className="placeholder col-4 "></span></div>
                <div className="textSmall"><span className="placeholder col-12 "></span></div>
                <div className="textSmall"><span className="placeholder col-12 "></span></div>
                <div className="d-flex flex-row placeholder-glow">
                    <table className="table table-borderless  mt-2 mb-0 placeholder " style={{ "width": "250px" }}>
                        <tbody>
                            <tr >
                                <td><i className="bi bi-geo-fill"></i></td>
                                <td className="textSmall placeholder fw-bold"><span className="placeholder-glow col-4 "></span></td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-building" style={{ "fontSize": "15px" }}></i></td>
                                <td className="textSmall placeholder-glow fw-bold"><span className="placeholder-glow col-4 "></span></td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-house-heart"></i></td>
                                <td className="textSmall fw-bold"><span className="placeholder-glow col-4 "></span></td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-aspect-ratio"></i></td>
                                <td className="textSmall fw-bold"><span className="placeholder col-4 "></span></td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-gear"></i></td>
                                <td className="textSmall fw-bold"><span className="placeholder col-4 "></span> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>



    )
}

export function PlaceHolder(props) {

    let rows = [];
    for (let i = 1; i < 21; i++) {
        rows.push(<Div key={i} />);
    }

    if (props.turn == true) {
        return rows;
    }

}

export function PlaceHolderMobile(props) {

    let rows2 = [];
    for (let i = 1; i < 21; i++) {
        rows2.push(<DivMobile key={i} />);
    }

    if (props.turn == true) {
        return rows2;
    }

}