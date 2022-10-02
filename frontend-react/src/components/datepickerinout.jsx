import React from "react";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



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