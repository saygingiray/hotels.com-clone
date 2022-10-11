import React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function GuestRating(props) {

    const [value, setValue] = React.useState([]);
    React.useEffect(() => { props.sendData(value) }, [value]);



    return (<>
        <div className="textMediumBold">Guest rating</div>

        <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={(event) => {setValue([event.target.value])}}
        
      >
        <FormControlLabel value="" control={<Radio />} label="Any" />
        <FormControlLabel value="9+ Reviews" control={<Radio />} label="Wonderful 9+" />
        <FormControlLabel value="8+ Reviews" control={<Radio />} label="Very Good 8+" />
        <FormControlLabel value="7+ Reviews" control={<Radio />} label="Good 7+" />
      </RadioGroup>

</>)
}