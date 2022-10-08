import React from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// 'Air conditioning',
// '24-hour check-in',
// 'Beach view',
// 'Breakfast',
// 'Kitchen',
// Smoking allowed
// Cleaning before checkout
// Dishwasher

export default function Amenities(props) {

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };


    const [state, setState] = React.useState({
        'Air conditioning': false,
        '24-hour check-in': false,
        'Beach view': false,
        'Breakfast': false,
        'Kitchen': false,
        'Smoking allowed': false,
        'Cleaning before checkout': false,
        'Dishwasher': false
    })

    const [seeMore, setSeeMore] = React.useState(true);


    React.useEffect(() => { props.sendData(state) }, [state]);



    return (
        <>
            <div className={(seeMore) ? "seeMore" : "seeMore-long"}>

                <div className="textMediumBold">Popular Amenities</div>

                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={state["Air conditioning"]} name="Air conditioning" onChange={handleChange} />} label="Air conditioning" />
                    <FormControlLabel control={<Checkbox checked={state["24-hour check-in"]} name="24-hour check-in" onChange={handleChange} />} label="24-hour check-in" />
                    <FormControlLabel control={<Checkbox checked={state["Beach view"]} name="Beach view" onChange={handleChange} />} label="Beach view" />
                    <FormControlLabel control={<Checkbox checked={state["Breakfast"]} name="Breakfast" onChange={handleChange} />} label="Breakfast" />
                    <FormControlLabel control={<Checkbox checked={state.Kitchen} name="Kitchen" onChange={handleChange} />} label="Kitchen" />
                    <FormControlLabel control={<Checkbox checked={state["Smoking allowed"]} name="Smoking allowed" onChange={handleChange} />} label="Smoking allowed" />
                    <FormControlLabel control={<Checkbox checked={state["Cleaning before checkout"]} name="Cleaning before checkout" onChange={handleChange} />} label="Cleaning before checkout" />
                    <FormControlLabel control={<Checkbox checked={state.Dishwasher} name="Dishwasher" onChange={handleChange} />} label="Dishwasher" />
                </FormGroup>
            </div>
            <div className="textSmall link-primary" style={{ "cursor": "pointer" }} onClickCapture={() => { setSeeMore(!seeMore) }}>{(seeMore) ? "See More" : "See Less"}</div>
        </>
    )
}