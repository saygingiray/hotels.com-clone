import React from "react";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from "dayjs";




export default function DatePickerInAndOut(props) {
    return (<>
        <div className="mx-2 bg-white" style={{ "width": "150px", "maxHeight": "56px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                    label="Check-in Date"
                    disablePast={true}
                    closeOnSelect={true}
                    inputFormat="DD/MM/YYYY"
                    value={props.valueX || null}
                    onChange={props.onchangeX}
                    renderInput={(params) => <TextField {...params}
                        sx={{ input: { background: "white" } }}
                        variant="filled"
                    />} />
            </LocalizationProvider>
        </div>
        <div className="mx-2 bg-white" style={{ "width": "150px", "maxHeight": "56px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                    label="Check-out Date"
                    inputFormat="DD/MM/YYYY"
                    closeOnSelect={true}
                    value={props.valueY || null}
                    onChange={props.onchangeY}
                    minDate={props.valueX}
                    renderInput={(params2) => <TextField {...params2}
                        sx={{ input: { background: "white" } }}
                        variant="filled"
                    />} />
            </LocalizationProvider>
        </div>
    </>)
}