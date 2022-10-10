import React from "react";


export function FilterBedTypes(props) {





    // const Mapping = (props) => {

    //     return 


    // }

    return (<>

        <div className="d-flex flex-row">

            {(!props.data == []) ? props.data.map((i, index) => {
                return <div key={index}  className="filter-box me-2"  >
                    <span className="textSmall fs-6 fw-normal me-2">{i}</span>
                    <i className="bi bi-x-octagon-fill" role="button" onClick={()=>{props.delete(index)}}></i>
                </div>

            }) : null}







        </div>




    </>)
}