import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SortBy(props) {

    const handleChange = (event) => {
        props.sendData(event.target.value)
    };

    return (
        <select onChange={handleChange} className="form-select  fs-6 fw-normal" style={{"width": "270px"}} aria-label="Default select example">
            <option value="" >Sort By Recommended</option>
            <option value="PriceAsc">Price Ascending</option>
            <option value="PriceDes">Price Descending</option>
            <option value="GuestAsc">Guest Rating Ascending</option>
            <option value="GuestDes">Guest Rating Descending</option>
            <option value="PropClassAsc">Property Class Ascending</option>
            <option value="PropClassDes">Property Class Descending</option>

        </select>



    )

}
