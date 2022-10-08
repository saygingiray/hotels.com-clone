import React from "react";
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';





export default function PriceRange(props) {

    const [sliderHelper, setsliderHelper] = React.useState([30, 250]);
    React.useEffect(() => { const timer = setTimeout(() => {  props.sendData(sliderHelper) }, 750); return () => clearTimeout(timer); }, [sliderHelper]);

    return (<>
        <div className="textMediumBold">Price per night</div>

        <div className="mt-1" style={{ width: "240px" }}>
            <Slider value={sliderHelper}
                onChange={(event, newValue) => { setsliderHelper(newValue) }}
                // onChangeCommitted={props.onchangecommittedX(sliderHelper)}
                min={5} step={15} max={1000} valueLabelDisplay="auto" />
        </div>

        <div className="d-flex mt-2 justify-content-between align-items-center flex-row" style={{ width: "250px  " }}>
            <div>
                <TextField id="outlined-number" name="priceFrom" label="From" type="number"
                    style={{ width: "100px" }}
                    value={sliderHelper[0]}
                    onChange={ (event) => {let tempArr = [Number(event.target.value), sliderHelper[1]]; setsliderHelper(tempArr)  }}

                />
            </div>
            <div>-</div>
            <div>
                <TextField
                    id="outlined-number" name="priceTo" label="To" type="number"
                    style={{ width: "100px" }}
                    value={sliderHelper[1]}
                    onChange={(event) => { let tempArr = [sliderHelper[0], Number(event.target.value)]; setsliderHelper(tempArr)}}
                />
            </div>
        </div>

    </>)
}