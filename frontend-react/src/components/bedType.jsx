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

    const data = () => {
        let tempARR = []
        Object.keys(state).forEach(key => {
            if (state[key] == true) { tempARR.push(key) }
        });
        return tempARR
    }

    React.useEffect(() => { props.sendData(data()) }, [state]);
    React.useEffect(() => { changeChecked() }, [props]);

    const changeChecked = () => {
        // console.log(props.changeXXX)
        let tempOBJ = {
            'Airbed': false,
            'Couch': false,
            'Futon': false,
            'Pull-out Sofa': false,
            'Real Bed': false
        }
        { props.changedByXbutton.map((i) => { tempOBJ[i] = true }) }

        // console.log(tempOBJ)
        // console.log(state)
        let diff = Object.keys(state).reduce((diff, key) => {
            if (tempOBJ[key] === state[key]) return diff
            return {
                ...diff,
                [key]: state[key]
            }
        }, {})
        // console.log(Object.keys(diff))
        let changedKey = Object.keys(diff)[0]
        if (Object.keys(diff).length > 0) { setState(tempOBJ) }
    }


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