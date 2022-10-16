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
        <FormControlLabel value="90+ Rating Points" control={<Radio />} label="Wonderful 90+" />
        <FormControlLabel value="80+ Rating Points" control={<Radio />} label="Very Good 80+" />
        <FormControlLabel value="70+ Rating Points" control={<Radio />} label="Good 70+" />
      </RadioGroup>

</>)
}