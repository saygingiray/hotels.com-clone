import React from "react";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from "dayjs";




export default function DatePickerInAndOut(props) {
    return (<>
        <div className={(props.pageWidth > 650) ? "datePickerLARGE me-2 p-0 bg-white " : "p-0 bg-white"}
            style={(props.pageWidth < 650) ? { width: "45%" } : null}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                    label="Check-in Date"
                    disablePast={true}
                    closeOnSelect={true}
                    inputFormat="DD/MM/YYYY"
                    value={props.valueX || null}
                    onChange={props.onchangeX}
                    renderInput={(params) => <TextField {...params}
                        sx={{ input: { background: "white" , width : "100%" } }}
                        variant="filled"
                        fullWidth           
                    />} 
                    />
            </LocalizationProvider>
        </div>
        <div className={(props.pageWidth > 650) ? "datePickerLARGE p-0 bg-white " : "p-0  bg-white"}
            style={(props.pageWidth < 650) ? { width: "45%"  } : null}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                    label="Check-out Date"
                    inputFormat="DD/MM/YYYY"
                    closeOnSelect={true}
                    value={props.valueY || null}
                    onChange={props.onchangeY}
                    minDate={props.valueX}
                    renderInput={(params2) => <TextField {...params2}
                        sx={{ input: { background: "white", width : "100%"} }}
                        variant="filled"
                        fullWidth
                    />} />
            </LocalizationProvider>
        </div>
    </>)
}