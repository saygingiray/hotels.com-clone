import React from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function RoomType(props) {
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };


    const [state, setState] = React.useState({
        'Entire home/apt': false,
        'Private room': false,
        'Shared room': false,
    })

    const data = () => {
        let tempARR = []
        Object.keys(state).forEach(key => {
          if  (state[key]==true) { tempARR.push(key)} 
        });
        return tempARR
    }


    React.useEffect(() => { props.sendData(data()) }, [state]);


    return (
        <>
            <div className="textMediumBold">Room Types</div>
            <FormGroup>
                <FormControlLabel control={<Checkbox checked={state["Entire home/apt"]} name="Entire home/apt" onChange={handleChange} />} label="Entire home/apt" />
                <FormControlLabel control={<Checkbox checked={state["Private room"]} name="Private room" onChange={handleChange} />} label="Private room" />
                <FormControlLabel control={<Checkbox checked={state["Shared room"]} name="Shared room" onChange={handleChange} />} label="Shared room" />
            
            </FormGroup>












        </>)
}