import React from "react";


export default function FilterShown(props) {

    return (<>      
            {(!props.data == []) ? props.data.map((i, index) => {
                return <div key={index}  className="filter-box me-2 mb-2"  >
                    <span className="textSmall fs-6 fw-normal me-2">{i}</span>
                    <i className="bi bi-x-octagon-fill" role="button" onClick={()=>{props.delete(index)}}></i>
                </div>

            }) : null}

        

   </>)
}