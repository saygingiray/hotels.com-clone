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
                    {/* <div className="d-flex flex-column ms-auto w-25 text-end h-100 d-inline-block " >
                        <div className="textSmall mt-2"> <span className="placeholder col-12 "></span> </div>
                        <div className="text-end">  <span className="placeholder col-12 "></span>    </div>
                        <div className="d-flex flex-column  mt-auto">
                            <div className="textMediumBold fw-bold fs-4 text-end"><span className="placeholder col-12 "></span></div>
                            <div className="mt-n1 textSmall "><span className="placeholder col-12 "></span></div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>



    )
}



export function PlaceHolder(props) {

    const rows = [];
    for (let i = 1; i < 21; i++) {
        rows.push(<Div key={i}  />);
    }

if (props.turn == true) {
    return rows;
} 

}