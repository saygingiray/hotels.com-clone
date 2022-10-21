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
        <select defaultValue={""} onChange={handleChange} className="form-select  fs-6 fw-normal" style={{"width": "270px"}} aria-label="Default select example">
            <option value="" >Sort By Recommended</option>
            <option value="price,1">Price Ascending</option>
            <option value="price,-1">Price Descending</option>
            <option value="review_scores.review_scores_rating,1">Guest Rating Ascending</option>
            <option value="review_scores.review_scores_rating,-1">Guest Rating Descending</option>
            <option value="number_of_reviews,1">Review Ascending</option>
            <option value="number_of_reviews,-1">Review Descending</option>

        </select>



    )

}
