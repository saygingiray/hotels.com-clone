import React from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function BedType(props) {

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };


    const [state, setState] = React.useState({
        'Airbed': false,
        'Couch': false,
        'Futon': false,
        'Pull-out Sofa': false,
        'Real Bed': false
    })
    const [seeMore, setSeeMore] = React.useState(true);

    React.useEffect(() => { props.sendData(state) }, [state]);


    return (<>

        <div className={(seeMore) ? "seeMore" : "seeMore-long"}>

            <div className="textMediumBold">Bed Types</div>
            <FormGroup>
                <FormControlLabel control={<Checkbox checked={state.Airbed} name="Airbed" onChange={handleChange} />} label="Airbed" />
                <FormControlLabel control={<Checkbox checked={state.Couch} name="Couch" onChange={handleChange} />} label="Couch" />
                <FormControlLabel control={<Checkbox checked={state.Futon} name="Futon" onChange={handleChange} />} label="Futon" />
                <FormControlLabel control={<Checkbox checked={state["Pull-out Sofa"]} name="Pull-out Sofa" onChange={handleChange} />} label="Pull-out Sofa" />
                <FormControlLabel control={<Checkbox checked={state["Real Bed"]} name="Real Bed" onChange={handleChange} />} label="Real Bed" />
            </FormGroup>
        </div>
        <div className="textSmall link-primary" style={{ "cursor": "pointer" }} onClickCapture={() => { setSeeMore(!seeMore) }}>{(seeMore) ? "See More" : "See Less"}</div>





    </>)


}